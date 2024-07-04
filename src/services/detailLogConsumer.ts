import { differenceInSeconds } from 'date-fns'
import { closeConnection, getConnection } from '../utils/database'
import { logManager } from '../utils/logManager'
import type { RowDataPacket } from 'mysql2/promise'
import type { General } from '../types/generalLog'

type Detail = RowDataPacket & {
  processid: number
  start: string
  finish: string
  classification: 'counterfeit' | 'genuine'
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
    const generalLogs: General[] = results.map((detail) => ({
      rawData: JSON.stringify(detail),
      processid: detail.processid,
      description: `Classification of process id ${detail.processid} is ${detail.classification}`,
      duration: differenceInSeconds(detail.finish, detail.start),
      start: detail.start,
      finish: detail.finish,
    }))
    const query = `
      INSERT INTO general_log (processid, rawData, description, duration, start, finish)
      VALUES (?, ?, ?, ?, ?, ?)
    `
    for (const item of generalLogs) {
      await connection.execute(query, [
        item.processid,
        item.rawData,
        item.description,
        item.duration,
        item.start,
        item.finish,
      ])
    }
  } catch (error) {
    if (error instanceof Error)
      logManager.error(`Gagal membaca data: ${error.message}`)
  } finally {
    closeConnection()
  }
}
