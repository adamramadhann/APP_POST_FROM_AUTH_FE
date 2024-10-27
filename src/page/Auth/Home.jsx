import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='w-screen h-[100dvh] bg-slate-200 flex flex-col   justify-center items-center relativeß '>
        <h1 className='font-bold text-3xl py-10 text-gray-600 z-30 ' > Welcomt to My app </h1>
        <img src="public/undraw_welcoming_re_x0qo 1.png" alt="" className='mr-2' />
        <div className='flex flex-col gap-5 mt-5 z-30 '>
            <Link to={`/register`}><button className='w-[300px]  py-3 rounded-xl bg-[#700BEF] font-bold text-white ' >Register</button></Link>
            <Link to={`/login`}><button className='w-[300px] py-3 rounded-xl bg-[#D6B6FF] font-bold text-[#700BEF] ' >Login</button></Link>
        </div>
        <img src="public/Bundar.png" alt="" className='absolute top-0 left-0'/>
        <img src="public/Ellipse 3.png" alt="" className='absolute bottom-0 left-0'/>
    </div>
  )
}

export default Home