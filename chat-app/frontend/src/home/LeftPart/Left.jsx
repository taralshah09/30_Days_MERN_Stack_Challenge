import React from 'react'
import Search from './Search'
import Users from './Users'
import "./Left.css"
import Logout from './Logout'
const Left = () => {
  return (
    <div className='w-[25%]  text-white bg-black h-screen overflow-y-hidden'>
      <Search/>
      <Users/>
      <Logout/>
    </div>
  )
}

export default Left
