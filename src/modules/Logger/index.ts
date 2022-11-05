/*eslint-disable no-console*/
import moment from 'moment'
import clc from 'cli-color'

enum ELogType {
  WARN = 'WARN',
  ERROR = 'ERROR',
  INFO = 'INFO',
}

enum ELogger {
  REQUEST = 'Remote api',
  API = 'Node Api',
}

abstract class Logger {
  private static log(type: ELogType, name: string, ...args: any) {
    const color = {
      [ELogType.WARN]: clc.yellow,
      [ELogType.ERROR]: clc.red,
      [ELogType.INFO]: clc.blue,
    }[type]

    return console.log(`[${moment().format('YY-MM-DD hh:mm:ss:SS')}] ${color(type)} [${name}]`, ...args)
  }

  protected static logInfo(name: string, ...args: any) {
    return this.log(ELogType.INFO, clc.green(name), ...args)
  }

  protected static logWarn(name: string, ...args: any) {
    return this.log(ELogType.WARN, clc.green(name), ...args)
  }

  protected static logError(name: string, ...args: any) {
    return this.log(ELogType.ERROR, clc.green(name), ...args)
  }
}

export class ReqApiLogger extends Logger {
  static info(title: string, ...args: any) {
    return this.logInfo(ELogger.REQUEST, `${title}:`, ...args)
  }

  static warn(...args: any) {
    return this.logWarn(ELogger.REQUEST, ...args)
  }

  static error(...args: any) {
    return this.logError(ELogger.REQUEST, ...args)
  }
}

export class NodeApiLogger extends Logger {
  static info(...args: any) {
    return this.logInfo(ELogger.API, ...args)
  }

  static warn(...args: any) {
    return this.logWarn(ELogger.API, ...args)
  }

  static error(...args: any) {
    return this.logError(ELogger.API, ...args)
  }
}
