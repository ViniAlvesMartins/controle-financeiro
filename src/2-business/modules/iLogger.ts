import { Token } from 'typedi'

export const LoggerToken = new Token<ILogger>()
export default interface ILogger {
  error (log: any): void
  info (log: any): void
}




