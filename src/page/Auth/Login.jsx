
import React from 'react'
import { Link } from 'react-router-dom'
import adm from '../../axiosApiAuth'

const Login = ({ OnLogin }) => {

  const handleLogin = async (e) => {
    try {
      const response = await adm.post("http://localhost:7777/api/user/login", e)
      console.info(response)
      sessionStorage.setItem("token", response.data.token)
      OnLogin()
      return response.data
    } catch (error) {
      console.error(error)
    }
  }


  const handleSubmit = (e ) => {
    e.preventDefault()
      let email = e.target.email.value
      let password = e.target.password.value

      const data = { email, password}
      handleLogin(data)

      console.info(data)
  }

  return (
    <div className='w-screen h-[100dvh] bg-slate-200 flex flex-col   justify-center items-center relativeß '>
    <div className='w-[330px] flex flex-col items-center  h-auto border-2  shadow-lg rounded-lg ' >
        <h1 className='font-bold text-3xl pb-10 text-gray-600 ' >Login</h1>
        <img src="public/standing-5.png" alt="" className='mr-2' />
        <form className='flex flex-col gap-3 mt-3 mb-3 text-gray-500 w-[300px] ' onSubmit={handleSubmit} >
              <label className='flex flex-col my-3 ' htmlFor="email">Email: 
                  <input type="email" id='email' placeholder='email' className='border outline-none py-2 rounded-md px-2  '  />
              </label>
              <label htmlFor="password" className='flex flex-col mb-3 ' >Password: 
                  <input type="password" id='password' placeholder='password' className='border py-2 rounded-md px-2  '  />
              </label>
            <button type='submit' className='py-2 bg-blue-500 my-3 rounded-sm text-xl text-white font-serif ' >submit</button>
            <p className='text-xs text-end -mt-4 my-2 ' >Don't have Acound ? / <Link   className='text-blue-500' to={`/register`} > Register</Link> Page </p>
        </form>
    </div>
    <img src="public/Bundar.png" alt="" className='absolute top-0 left-0'/>
    <img src="public/Ellipse 3    .png" alt="" className='absolute bottom-0 left-0'/>
</div>
  )
}

export default Login