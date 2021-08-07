import ILogger, { LoggerToken } from '@business/modules/iLogger'
import { Service } from 'typedi/decorators/Service'


@Service(LoggerToken)
export default class ConsoleLogger implements ILogger {

  public log (log: any, level = 'info'): void {
    switch (level) {
      case 'error':
        console.error(`${level}: ${log}`)
        break
      case 'info':
        console.info(`${level}: ${log}`)
        break
      default:
        console.log(`${level}: ${log}`)
        break
    }
  }

  public error (log: any): void {
    this.log(log, 'error')
  }

  public info (log: any): void {
    this.log(log, 'info')
  }
}
