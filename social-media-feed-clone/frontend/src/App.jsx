import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import SignInPage from './pages/SignInPage/SignInPage'


function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/signup' element={<SignInPage />}></Route>
      </Routes>
    </>
  )
}

export default App
