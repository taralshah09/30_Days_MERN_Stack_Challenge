import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Navbar from "./components/Navbar/Navbar"
import { UserProvider } from "./context/userAuth"
import AddPage from "./pages/AddPage/AddPage"
import AllPage from "./pages/AllPage/AllPage"
import IncomcePage from "./pages/IncomePage/IncomcePage"
import ExpensePage from "./pages/ExpensePage/ExpensePage"


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
          <Route path="/all" element={<AllPage />}></Route>
          <Route path="/income" element={<IncomcePage />}></Route>
          <Route path="/expense" element={<ExpensePage />}></Route>
          <Route path="/add" element={<AddPage />}></Route>
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
