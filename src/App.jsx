import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './page/Auth/Home'
import Login from './page/Auth/Login'
import Register from './page/Auth/Register'
import TestApiJson from './TestApiJson'
import getTokenStorage from './GetTokenStorage'
import ScrenMyPost from './page/Layout/ScrenMyPost'
import DetailsCard from './page/DetailCard/DetailsCard'

const App = () => {

  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()

  const token = getTokenStorage()

  
  useEffect(() => {
    if(token ) {
      setIsLogin(true)
      navigate('/layout')
    }
  }, [token, navigate])


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
      <Route path='/layout' element={<ScrenMyPost/>} />
      <Route path='/detail/:id' element={<DetailsCard/>} />
    </Routes>
  )
}

export default App