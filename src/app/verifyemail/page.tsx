"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const VerifyEmailPage = () => {
  const navigate = useRouter();
  const [token, setToken] = useState<string | null >(null);
  const verifyEmail = () => {
    axios.post('/api/users/verifyemail', {token})
      .then((res) => navigate.push('/login'))
      .catch((err) => toast.error(err.response.data.error))
  }
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, [])
  return (
    <section className='py-20'>
      <Toaster 
      position='top-center'
      />
    <h1 className='text-6xl text-center pb-5'>Verify your email by clicking the button</h1>
    <div className='flex justify-center'><button onClick={verifyEmail} className='p-5 bg-green-600'>Verify</button></div>
    </section>
  )
}

export default VerifyEmailPage
