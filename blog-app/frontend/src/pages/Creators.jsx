import React, { useEffect, useState } from 'react'
import axios from "axios"

const Creators = () => {

  const [creators, setCreators] = useState([])

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/users/admins")
        console.log(data.admins)
        setCreators(data.admins)
      } catch (error) {
        console.log("Error in fetching admins : " + error.message)
      }
    }
    fetchAdmins()
  }, [])
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <div className='w-full bg-white flex gap-4 px-8 justify-center flex-col md:flex-row'>
        {
          creators.map((creator, index) =>
            <div key={index} className="flex flex-col items-center gap-2 bg-white border border-gray-300 shadow-md rounded-lg w-64 p-4">
              <img src={creator.photo.url} alt={creator.name} className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 shadow-sm" />
              <p className="text-xl font-semibold text-gray-800">{creator.name}</p>
              <p className="text-sm text-gray-600">{creator.email}</p>
              <p className="text-sm text-gray-600">{creator.phone}</p>
              <p className="text-sm text-gray-600">{creator.education}</p>
            </div>
          )
        }
      </div>

    </div>
  )
}

export default Creators
