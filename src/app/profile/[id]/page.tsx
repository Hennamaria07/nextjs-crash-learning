import Navbar from '@/components/Navbar'
import React from 'react'

const Params = ({params}: any) => {
  return (
    <div>
      <Navbar />
      <h1>params----{params.id}</h1>
    </div>
  )
}

export default Params
