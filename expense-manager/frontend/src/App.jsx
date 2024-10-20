import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Navbar from "./components/Navbar/Navbar"
import { UserProvider } from "./context/userAuth"
import AddPage from "./pages/AddPage/AddPage"


function App() {

  return (
    <>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <HomePage />
          }></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/all" element={<h1>All</h1>}></Route>
          <Route path="/income" element={<h1>income</h1>}></Route>
          <Route path="/expense" element={<h1>expense</h1>}></Route>
          <Route path="/add" element={<AddPage/>}></Route>
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
