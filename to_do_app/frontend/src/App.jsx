
import {Routes,Route} from "react-router-dom"
import axios from "axios"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"


function App() {

  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/*" element={<h1>Forbidden Page</h1>}></Route>
      </Routes>
    </>
  )
}

export default App
