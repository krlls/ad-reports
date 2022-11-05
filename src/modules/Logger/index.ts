/*eslint-disable no-console*/
enum ELogType {
  WARN = 'WARN',
  ERROR = 'ERROR',
  INFO = 'INFO',
}

enum ELogger {
  REQUEST = 'App api',
}

abstract class Logger {
  private static log(type: ELogType, name: string, ...args: any) {
    const log = {
      [ELogType.WARN]: console.warn,
      [ELogType.ERROR]: console.error,
      [ELogType.INFO]: console.info,
    }[type]

    return log(`${type} [${name}]`, ...args)
  }

  protected static logInfo(name: string, ...args: any) {
    return this.log(ELogType.INFO, name, ...args)
  }

  protected static logWarn(name: string, ...args: any) {
    return this.log(ELogType.WARN, name, ...args)
  }

  protected static logError(name: string, ...args: any) {
    return this.log(ELogType.ERROR, name, ...args)
  }
}

export class ApiLogger extends Logger {
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
