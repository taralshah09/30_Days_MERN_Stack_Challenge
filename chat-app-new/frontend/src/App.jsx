
import { useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import { useAuth } from './context/AuthProvider'
import Left from './home/LeftPart/Left'
import Right from './home/RightPart/Right'
import { Routes, Route, Navigate } from "react-router-dom"
import Loading from './components/Loading'
function App() {
  const [authUser, setAuthUser] = useAuth()
  console.log(authUser)


  return (
    <>
      <Routes>
        <Route path="/" element={
          authUser ? <div className='flex min-h-screen'>
            <Left />
            <Right />
          </div> : <Navigate to="/login" />
        }></Route>
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />}></Route>
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />}></Route>
      </Routes>
      {/* <Loading/> */}
    </>
  )
}

export default App
