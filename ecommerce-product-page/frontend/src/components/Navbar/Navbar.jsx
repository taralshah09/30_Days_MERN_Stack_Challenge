import React from 'react'
import "./Navbar.css"
import { Link, useLocation, useParams } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const {id} = useParams();
  const pathnameParts = location.pathname.split('/');
  const keyword = pathnameParts[1]; // This will be "products"
  return (
    <nav>
      <Link to="/" className='link'>
        <h2>EcomMasters</h2>
      </Link>
      {
        keyword === "product"?
        <a href="/" className='back-to-home'>Back to home page</a>        
        :
        <a href="#products-feed" className='link'>Products</a>        
      }
    </nav>
  )
}

export default Navbar
