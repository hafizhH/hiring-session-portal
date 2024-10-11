"use client"

import { useEffect, useState } from "react"

export default function Registration() {
  const [vacancyData, setVacancyData] = useState<any>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    fetch('/api/vacancies', {
      method: 'GET'
    })
    .then((res: any) => res.json())
    .then((res: any) => {
      console.log(res.data)
      setVacancyData(res.data)
    })
    .catch(e => {
      console.error(e)
    })
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    fetch('/api/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phoneNumber: formData.get('phoneNumber'),
        password: formData.get('password'),
        vacancyId: formData.get('vacancyId')
      })
    })
    .then((res: any) => res.json())
    .then((res: any) => {
      localStorage.setItem('token', res.data.token)
      window.location.href = '/'
    })
    .catch(e => {
      console.error(e)
    })
  }

  return (
    <div className="w-full h-screen bg-blue-500 flex flex-row">
      <div className="w-1/2 h-full flex flex-col justify-center items-center">
        <img src='/graphic.png' className="w-full" />
      </div>
      <div className="w-1/2 h-full bg-white rounded-l-[2rem] flex flex-col justify-center items-center">
        <div className="flex flex-col space-y-8 justify-center items-start">
          <div className="flex flex-col space-y-3.5 items-center">
            <div className="text-4xl font-bold tracking-tight">Registrasi Peserta</div>
            <div className="text-md font-medium text-gray-600">Mohon isi data diri anda pada formulir berikut</div>
          </div>
          <form onSubmit={(event) => handleSubmit(event)} className="w-full flex flex-col space-y-3.5 items-start">
            <div className="w-full flex flex-col space-y-1.5">
              <label className="text-md">Nama Lengkap</label>
              <input type="text" name="fullName" className="w-full px-4 py-1.5 text-lg rounded-lg border border-gray-300" required={true} />
            </div>
            <div className="w-full flex flex-col space-y-1.5">
              <label className="text-md">Email</label>
              <input type="text" name="email" className="w-full px-4 py-1.5 text-lg rounded-lg border border-gray-300" required={true} />
            </div>
            <div className="w-full flex flex-col space-y-1.5">
              <label className="text-md">Nomor HP</label>
              <input type="text" name="phoneNumber" className="w-full px-4 py-1.5 text-lg rounded-lg border border-gray-300" required={true} />
            </div>
            <div className="w-full flex flex-col space-y-1.5">
              <label className="text-md">Kata Sandi</label>
              <input type="password" name="password" className="w-full px-4 py-1.5 text-lg rounded-lg border border-gray-300" required={true} />
            </div>
            <div className="w-full flex flex-col space-y-1.5">
              <label className="text-md">Loker yang Diminati</label>
              <select name="vacancyId" className="w-full px-4 py-1.5 text-md rounded-lg border border-gray-300" required={true}>
                { vacancyData ? vacancyData.map((item: any, index: number) => {
                    return (
                      <option key={index} value={item.id}>{ item.position } ({ item.company_name })</option>
                    )
                  }) : ''
                }
              </select>
            </div>
            <button type="submit" className="!mt-8 w-full px-6 py-3 bg-blue-500 rounded-xl text-lg font-semibold text-white">Daftar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
