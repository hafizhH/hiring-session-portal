"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(0)

  const [interviewData, setInterviewData] = useState<any>(null)
  const [userInfoData, setUserInfoData] = useState<any>(null)

  useEffect(() => {
    getAuthToken()

    fetchData()
  }, [])

  const getAuthToken = () => {
    if (localStorage.getItem('token'))
      return localStorage?.getItem('token') ?? ''
    else
      window.location.href = '/registration'
  }

  const fetchData = () => {
    const token = getAuthToken()

    fetch('/api/interviews?' + new URLSearchParams({ token: token ?? '' }), {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res: any) => res.json())
    .then((res: any) => {
      setInterviewData(res.data)
    })
    .catch(e => {
      console.error(e)
    })

    fetch('/api/userInfo?' + new URLSearchParams({ token: token ?? '' }), {
      method: 'GET'
    })
    .then((res: any) => res.json())
    .then((res: any) => {
      setUserInfoData(res.data)
    })
    .catch(e => {
      console.error(e)
    })
  }
  
  return (
    <div className="w-full min-h-screen bg-white flex flex-col space-y-8">
      <div className="pt-8 w-full bg-blue-500 rounded-b-3xl overflow-hidden shadow-xl">
        <div className="w-full px-80 py-12 flex flex-row items-center space-x-8">
          <img className="w-32 h-32 bg-gray-200 rounded-full"/>
          <div className="flex flex-col space-y-3">
            <div className="text-4xl font-bold text-white tracking-tight">{ userInfoData?.full_name ?? '' }</div>
            <div className="flex flex-col space-y-1">
              <div className="text-lg font-medium text-white">{ userInfoData?.email ?? '' }</div>
              <div className="text-lg font-medium text-white">{ userInfoData?.phone_number ?? '' }</div>
            </div>
          </div>
        </div>
        <div className="px-80 bg-gray-50 flex flex-row space-x-5">
          <div onClick={() => setSelectedTab(0)} className={`transition-colors duration-300 select-none cursor-pointer px-3 py-3 border-b-4 text-lg font-semibold tracking-tight ${(selectedTab == 0) ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'}`}>Wawancara</div>
          <div onClick={() => setSelectedTab(1)} className={`transition-colors duration-300 select-none cursor-pointer px-3 py-3 border-b-4 text-lg font-semibold tracking-tight ${(selectedTab == 1) ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'}`}>Pengumuman</div>
        </div>
      </div>
      <div className="w-full px-80 py-8">
        { (selectedTab == 0) ? interviewData?.map((item: any, index: number) => {
          return (
            <div key={index} className="px-8 py-6 rounded-3xl border border-gray-300 flex flex-col space-y-8">
              <div className="text-3xl font-semibold">Informasi Wawancara</div>
              <div className="flex flex-row">
                <div className="w-1/2 flex flex-col space-y-10">
                  <div className="flex flex-col space-y-1">
                    <div className="text-xl font-semibold text-blue-500">Posisi yang Dilamar</div>
                    <div className="text-lg font-semibold text-gray-700">{ item.position ?? '' }</div>
                    <div>{ item.company_name ?? '' }</div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="text-xl font-semibold text-blue-500">Interviewer</div>
                    <div className="text-lg font-semibold text-gray-700">{ item.interviewer_name ?? '' }</div>
                    <div>{ item.interviewer_position ?? '' }</div>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col space-y-10">
                  <div className="flex flex-col space-y-1">
                    <div className="text-xl font-semibold text-blue-500">Tanggal & Waktu</div>
                    <div>{ item.date ? new Date(parseInt(item.date)).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '' }</div>
                    <div>{ item.date ? new Date(parseInt(item.date)).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '' } WIB - Selesai</div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="text-xl font-semibold text-blue-500">Lokasi</div>
                    <div>{ item.location ?? '' }</div>
                  </div>
                </div>
              </div>
            </div>
          )}) ?? ''
          :
          interviewData?.map((item: any, index: number) => {
            return (
              <div key={index} className="px-8 py-6 rounded-3xl border border-gray-300 flex flex-col space-y-8">
                <div className="text-3xl font-semibold">Hasil Seleksi</div>
                <div className="flex flex-col space-y-3">
                  { (item.result == 1) ?
                    <>
                      <div className="text-lg font-bold text-green-500 tracking-tight">LOLOS KE TAHAP BERIKUTNYA</div>
                      <div className="text-lg text-gray-700 font-medium">Selamat! Anda telah berhasil lolos ke tahap selanjutnya dalam proses seleksi. Tim rekruter akan segera menghubungi Anda untuk menjadwalkan seleksi selanjutnya.</div>
                    </>
                    :
                    <>
                      <div className="text-lg font-bold text-red-400 tracking-tight">BELUM DITERIMA</div>
                      <div className="text-lg text-gray-700 font-medium">Terima kasih atas minat Anda untuk bergabung. Setelah melalui proses seleksi yang ketat, kami memutuskan untuk melanjutkan dengan kandidat lain yang lebih sesuai dengan kebutuhan saat ini. Kami berharap Anda sukses dalam pencarian pekerjaan Anda.</div>
                    </>
                  }
                </div>
              </div>
          )}) ?? ''
        }
      </div>
    </div>
  );
}
