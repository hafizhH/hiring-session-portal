import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Assaultsh0t',
    database: 'hiring_session_portal'
})

const dbConnect = async() => {
  return await pool.getConnection()
}

export { dbConnect }