import { Routes, Route, useLocation } from "react-router-dom"
import Navbar from "../src/components/Navbar"
import Home from "../src/components/Home"
import Footer from "../src/components/Footer"
import About from "../src/pages/About"
import Contact from "../src/pages/Contact"
import Blogs from "../src/pages/Blogs"
import Creators from "../src/pages/Creators"
import Dashboard from "../src/pages/Dashboard"
import Register from "../src/pages/Register"
import Login from "../src/pages/Login"
import { useAuth } from "./Context/AuthProvider"
import { Toaster } from 'react-hot-toast';
import UpdateBlog from "./dashboard/UpdateBlog"
import Details from "./pages/Details"


function App() {
  const location = useLocation()
  const hideNavbarAndFooter = ["/dashboard", "/login", "/register"].includes(location.pathname);
  const { blogs } = useAuth()
  console.log(blogs)

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      <Toaster
        position="top-center" // You can change the position here
        reverseOrder={false} // Optional, adjust toast order
      />
      {/* Defining routes in here */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/creators" element={<Creators />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/blog/update/:id" element={<UpdateBlog/>}></Route>
        <Route path="/blog/:id" element={<Details/>}></Route>


        {/* ---------------------------------------------------- */}
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>

        {/*----------------------------------------------------- */}
        <Route path="/*" element={<h1>Path not found!</h1>}></Route>
      </Routes>

      {!hideNavbarAndFooter && <Footer />}
    </>
  )
}

export default App
