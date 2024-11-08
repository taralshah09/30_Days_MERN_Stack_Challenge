import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { useAuth } from './context/AuthProvider'
import Home from './pages/Home'
import ConversationHome from './pages/ConversationHome'
import Conversation from './pages/Conversation'


function App() {
  const [authUser, setAuthUser] = useAuth()
  return (
    <>



      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/conversation-home' element={authUser ? <ConversationHome /> : <Navigate to="/login" />} />
        <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/conversation/:id" element={authUser ? <Conversation /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} /> {/* Fallback route */}
      </Routes>
    </>
  )
}

export default App
