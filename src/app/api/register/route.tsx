import mysql from 'mysql2'
import crypto from 'crypto'

import { dbConnect } from "@/app/lib/db"

export async function POST(req: Request) {
  try {
    const data: any = await req.json()
    const token = crypto.randomUUID()

    if (!data)
      return Response.json({ data }, { status: 400 })

    const conn = await dbConnect()
    await conn.query(`INSERT INTO accounts SET full_name=${mysql.escape(data.fullName)}, email=${mysql.escape(data.email)}, phone_number=${mysql.escape(data.phoneNumber)}, password=${mysql.escape(data.password)}, token=${mysql.escape(token)};`)
    await conn.query(`INSERT INTO interviews SET user_id=LAST_INSERT_ID(), vacancy_id=${mysql.escape(data.vacancyId)}, date=${mysql.escape(new Date(2024,10,21,10,0,0,0).getTime())}, location='Fakultas MIPA UGM', result=MOD((SELECT MAX(id) FROM accounts),2);`)
    conn.release()

    return Response.json({ message: 'Success', data: { token } }, { status: 200 })
  } catch (e: any) {
    return Response.json({ message: e.message }, { status: 500 })
  }
}