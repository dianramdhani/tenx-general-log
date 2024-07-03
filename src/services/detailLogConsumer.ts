import { closeConnection, getConnection } from '../utils/database'
import { type RowDataPacket } from 'mysql2/promise'
import { logManager } from '../utils/logManager'

type Detail = RowDataPacket & {
  processid: string
  start: string
  finish: string
  classification: string
}

export default async function detailLogConsumer() {
  const connection = await getConnection()

  try {
    const [results] = await connection.query<Detail[]>(
      `
        SELECT 
            t1.processid, 
            t1.start, 
            t2.finish,
            t2.classification
        FROM 
            (SELECT processid, start 
            FROM detail_log 
            WHERE module = 'A') t1
        JOIN 
            (SELECT processid, finish, classification 
            FROM detail_log 
            WHERE module = 'H') t2
        ON t1.processid = t2.processid;
        `
    )
    logManager.info(`Data yang dihasilkan: ${JSON.stringify(results)}`)
  } catch (error) {
    if (error instanceof Error)
      logManager.error(`Gagal membaca data: ${error.message}`)
  } finally {
    closeConnection()
  }
}
