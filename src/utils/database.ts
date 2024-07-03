import mysql, { Connection } from 'mysql2/promise'

let connection: Connection | undefined

export const getConnection = async (): Promise<Connection> => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    })
    console.log('New database connection established.')
  } else {
    console.log('Using existing database connection.')
  }
  return connection
}

export const closeConnection = async (): Promise<void> => {
  if (connection) {
    await connection.end()
    connection = undefined
    console.log('Database connection closed.')
  }
}
