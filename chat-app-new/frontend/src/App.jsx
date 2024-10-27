
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import { useAuth } from './context/AuthProvider'
import Left from './home/LeftPart/Left'
import Right from './home/RightPart/Right'
import { Routes, Route } from "react-router-dom"
function App() {
  const [authUser, setAuthUser] = useAuth()
  console.log(authUser)

  return (
    <>
      {/* <div className='flex min-h-screen'>
      <Left/>
      <Right/>
    </div> */}

      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>

    </>
  )
}

export default App
