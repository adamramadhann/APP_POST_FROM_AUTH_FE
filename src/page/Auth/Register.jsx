import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault()

    let name = e.target.name.value
    let email = e.target.email.value
    let password = e.target.password.value

    const data = {name, email, password}
    handleRegister(data)

    console.info(data)
  }


  const handleRegister = async (data) => {
    try {
    const apiRegister = await axios.post("http://localhost:7777/api/user/register", data)
    console.info(apiRegister)
      return apiRegister
    } catch (error) {
      console.error(error)
    }
  }
  

  return (
    <div className='w-screen h-[100dvh] bg-slate-200 flex flex-col justify-center items-center relative'>
      <div className='w-[330px] flex flex-col items-center pb-2 h-auto border-2 shadow-lg rounded-lg'>
        <h1 className='font-bold text-3xl pt-3 pb-3 text-gray-600'>Register</h1>
        <img src="/login 1.png" alt="Login illustration" className='mr-2' />
        <form className='flex flex-col mb-3 w-[300px] text-gray-500' onSubmit={handleSubmit}>
          <label className='flex flex-col mt-5' htmlFor="name">
            Name: 
            <input type="text" id='name' placeholder='name' className='border py-2 outline-none rounded-md px-2' />
          </label>
          <label className='flex flex-col my-3' htmlFor="email">
            Email: 
            <input type="email" id='email' placeholder='email' className='border outline-none py-1 rounded-md px-2' />
          </label>
          <label htmlFor="password" className='flex flex-col mb-3'>
            Password: 
            <input type="password" id='password' placeholder='password' className='border py-1 rounded-md px-2' />
          </label>
          <button type='submit' className='py-2 bg-blue-500 my-3 rounded-sm text-xl text-white font-serif'>Submit</button>
          <p className='text-xs text-end -mt-2 my-2'>Already have an account? <Link className='text-blue-500' to="/login">Login</Link></p>
        </form>
      </div>
      <img src="/Bundar.png" alt="Background decoration" className='absolute top-0 left-0'/>
    </div>
  )
}

export default Register