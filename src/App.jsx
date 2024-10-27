import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Auth/Home'
import Login from './page/Auth/Login'
import Register from './page/Auth/Register'
import TestApiJson from './TestApiJson'
import getTokenStorage from './GetTokenStorage'

const App = () => {

  const [isLogin, setIsLogin] = useState(false)

  const token = getTokenStorage()

  useEffect(() => {
    if(token) {
      setIsLogin(true)
    }
  }, [])

  console.info(token)

  if(!isLogin) {
    return (
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login OnLogin={() => setIsLogin(true)} />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/tes' element={<TestApiJson/>} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route index element={<h1>Login Berhasil</h1>} >
      </Route>
    </Routes>
  )
}

export default App