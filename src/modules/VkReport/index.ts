import moment, { Moment } from 'moment'
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet'

import { IVKReport } from '../../types/TVkReport'
import { VkImport } from '../../types/TVkImport'
import { VkImporter } from '../VkImporter'
import { createVkReport, vkReportsToRows } from '../../utils/mappers/vkMappers'
import { GOOGLE_PRIVATE_KEY, GOOGLE_SERVICE_ACCOUNT_EMAIL, REPORT_TIME_FORMAT } from '../../config'
import { VkReportLogger } from '../Logger'

export class VkReport implements IVKReport {
  private importer: VkImporter
  private groupId: string
  private doc: GoogleSpreadsheet
  private sheet: GoogleSpreadsheetWorksheet | undefined

  constructor(config: { groupId: string, sheetId: string, importer: VkImport }) {
    const { sheetId, importer, groupId } = config

    this.doc = new GoogleSpreadsheet(sheetId)
    this.importer = importer
    this.groupId = groupId
  }

  private async getReport(from?: Moment) {
    const posts = await this.importer.posts(this.groupId)

    const filterPosts = from ? posts.filter((p) => moment(p.date).isAfter(from, 'minutes')) : posts

    if (!filterPosts.length) {
      return []
    }

    const postsMap = new Map()
    filterPosts.forEach((p) => postsMap.set(p.id + '', p))

    const stats = await this.importer.postsStats(
      this.groupId,
      filterPosts.map((p) => p.id),
    )

    if (!stats.length) {
      return []
    }

    return createVkReport(postsMap, stats).sort((a, b) => moment(b.date).unix() - moment(a.date).unix())
  }

  private async docConnect(): Promise<boolean> {
    VkReportLogger.info('Start login')
    await this.doc.useServiceAccountAuth({
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY,
    })

    await this.doc.loadInfo()
    this.setSheet()

    const title = this.doc.title
    VkReportLogger.info('Success connect, title:', title)

    return !!title
  }

  private setSheet() {
    const sheet = this.doc.sheetsByIndex[0]

    VkReportLogger.info('Set sheet', sheet.a1SheetName)
    this.sheet = sheet
  }

  private async setHeader() {
    if (!this.sheet) {
      return
    }

    await this.sheet.loadCells()
    const header = await this.sheet.getCell(0, 0)

    if (header.value) {
      return VkReportLogger.info('Header not empty', header.value)
    }

    await this.sheet.setHeaderRow([
      'Пост (id)',
      'Дата публикации',
      'Охват (общий)',
      'Лайки',
      'Репосты',
      'Переходы по ссылке',
    ])
  }

  async setReport(reports: Array<(string | number)[]>) {
    if (!this.sheet) {
      return
    }

    VkReportLogger.info('setReports', reports.length)

    await this.sheet.addRows(reports)
  }

  async getLatestPost() {
    if (!this.sheet) {
      return
    }

    await this.sheet.loadCells()

    const latest = await this.sheet.getCellByA1('B2')

    if (!latest.formattedValue) {
      return
    }

    VkReportLogger.info('getLatestPost', latest.formattedValue)

    return moment(latest.formattedValue, REPORT_TIME_FORMAT)
  }

  async generatePostReport(): Promise<boolean> {
    let connected = false
    try {
      connected = await this.docConnect()
    } catch (e: any) {
      VkReportLogger.error(e?.message)
      return false
    }

    if (!connected) {
      return false
    }

    const latestPostTime = await this.getLatestPost()
    const reports = await this.getReport(latestPostTime)

    await this.setHeader()
    await this.setReport(vkReportsToRows(reports))

    return true
  }
}
