"use client";
import React from 'react'
import { useRouter } from 'next/navigation'

export default function BlankPage() {
  const router = useRouter()
  const goToLogin = () => {
    router.push('/login')
  }
  return (
    <div>
      <h1>Please Login to watch content</h1>
      <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={goToLogin}>Login</button>
    </div>
  )
}
