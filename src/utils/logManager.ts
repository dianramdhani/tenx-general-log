import path from 'path'
import { createLogger, format, transports } from 'winston'

const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
)
const infoLogger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.File({
      filename: path.join(__dirname, '../../logs/info.log'),
      level: 'info',
    }),
    new transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error',
    }),
    new transports.Console(), // Tambahkan ini untuk log ke console
  ],
})
const errorLogger = createLogger({
  level: 'error',
  format: logFormat,
  transports: [
    new transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error',
    }),
    new transports.Console(), // Tambahkan ini untuk log ke console
  ],
})

export const logManager = {
  info: (message: string) => infoLogger.info(message),
  error: (message: string) => errorLogger.error(message),
}
