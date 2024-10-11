import mysql from 'mysql2'
import crypto from 'crypto'

import { dbConnect } from "@/app/lib/db"

export async function GET(req: Request) {
  try {
    const conn = await dbConnect()
    const result: any = await conn.query(`SELECT * FROM vacancies;`)
    conn.release()

    return Response.json({ message: 'Success', data: result[0] }, { status: 200 })
  } catch (e: any) {
    return Response.json({ message: e.message }, { status: 500 })
  }
}