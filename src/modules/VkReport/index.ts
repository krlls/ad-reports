import moment, { Moment } from 'moment'
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet'

import { IVKReport, VKPostReport } from '../../types/TVkReport'
import { VkImport } from '../../types/TVkImport'
import { VkImporter } from '../VkImporter'
import { createVkReport, vkReportsToRows } from '../../utils/mappers/vkMappers'
import { GOOGLE_PRIVATE_KEY, GOOGLE_SERVICE_ACCOUNT_EMAIL } from '../../config'
import { VkReportLogger } from '../Logger'

export class VkReport implements IVKReport {
  private importer: VkImporter
  private groupId: string
  private doc: GoogleSpreadsheet
  private sheet: GoogleSpreadsheetWorksheet | undefined
  private title: string

  private headerIndex = 2

  get contentStart() {
    return this.headerIndex + 1
  }

  constructor(config: { groupId: string, sheetId: string, importer: VkImport }) {
    const { sheetId, importer, groupId } = config

    this.title = moment(undefined, undefined, 'ru').format('YYYY MMMM')
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

  private async setSheet() {
    let sheet = this.doc.sheetsByTitle[this.title]

    if (!sheet) {
      sheet = await this.doc.addSheet({ title: this.title })
    }

    VkReportLogger.info('Set sheet', sheet.a1SheetName)
    this.sheet = sheet
  }

  private async setHeader() {
    if (!this.sheet) {
      return
    }

    await this.sheet.clear()
    await this.sheet.loadCells()

    await this.sheet.setHeaderRow(
      ['Пост (id)', 'Дата публикации', 'Охват (общий)', 'Лайки', 'Репосты', 'Переходы по ссылке', 'Комментарии'],
      2,
    )

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await this.sheet.mergeCells({
      startRowIndex: 0,
      endRowIndex: 1,
      startColumnIndex: 0,
      endColumnIndex: 7,
    })

    const label = await this.sheet.getCell(0, 0)

    label.horizontalAlignment = 'CENTER'
    label.verticalAlignment = 'MIDDLE'
    label.value = this.title

    await label.save()
  }

  async setReport(reports: VKPostReport[]) {
    VkReportLogger.info('setReports', reports.length)
    if (!this.sheet || !reports.length) {
      return
    }

    await this.sheet.insertDimension('ROWS', {
      startIndex: this.contentStart,
      endIndex: reports.length + this.contentStart,
    })
    await this.sheet.addRows(vkReportsToRows(reports))
    const total = reports.reduce(
      (acc, val) => {
        return {
          reachTotal: acc.reachTotal + val.reachTotal,
          likes: acc.likes + val.likes,
          reposts: acc.reposts + val.reposts,
          links: acc.links + val.links,
          comments: acc.comments + val.comments,
        }
      },
      { reachTotal: 0, likes: 0, reposts: 0, links: 0, comments: 0 },
    )

    await this.sheet.addRow(['Итог:', '', total.reachTotal, total.likes, total.reposts, total.links, total.comments])
  }

  // async getLatestPost() {
  //   if (!this.sheet) {
  //     return
  //   }
  //
  //   await this.sheet.loadCells()
  //
  //   const latest = await this.sheet.getCell(this.contentStart - 1, 1)
  //
  //   if (!latest.formattedValue) {
  //     return
  //   }
  //
  //   VkReportLogger.info('getLatestPost', latest.formattedValue)
  //
  //   return moment(latest.formattedValue, REPORT_TIME_FORMAT)
  // }

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

    const reports = await this.getReport(moment().startOf('month'))

    await this.setHeader()
    await this.setReport(reports)

    return true
  }
}
