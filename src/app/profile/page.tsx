"use client"
import Navbar from '@/components/Navbar'
import { UserType } from '@/utils/modelTypes';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const ProfilePage = () => {
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    ;(
      (async () => {
        axios.get('/api/users/user', {withCredentials: true})
        .then((res) => {
          console.log(res.data.data)
          setUser(res.data.data)
        })
        .catch((error) => console.log(error.response.data.error))
      })
    )()
  }, [])
  return (
    <>
      <Navbar />
      <section className='py-24'>
        <h1 className='text-center text-6xl py-5'>welcome {user?.username}</h1>
        <div className='text-center'><Link href={`/profile/${user?._id}`} className='text-xl'>click here to visit your profile</Link></div>
      </section>
    </>
  )
}

export default ProfilePage
