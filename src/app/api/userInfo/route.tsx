import mysql from 'mysql2'
import crypto from 'crypto'

import { dbConnect } from "@/app/lib/db"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token)
      return Response.json({ message: 'No token provided' }, { status: 400 })

    const conn = await dbConnect()
    const result: any = await conn.query(`SELECT * FROM accounts WHERE token=${mysql.escape(token)};`)
    conn.release()

    return Response.json({ message: 'Success', data: result[0][0] }, { status: 200 })
  } catch (e: any) {
    return Response.json({ message: e.message }, { status: 500 })
  }
}