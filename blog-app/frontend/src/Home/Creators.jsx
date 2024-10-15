import React, { useEffect, useState } from 'react'
import axios from "axios"


const Creators = () => {
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data } = await axios.get("http://localhost:3000/api/users/admins", { withCredentials: true })
      console.log(data.admins)
      setAdmins(data.admins)
    }
    fetchAdmins()
  }, [])
  return (
    <div className="container mx-auto px-6">
      <h1 className="text-2xl mb-6 font-semibold">Creators</h1>

      <div className="flex gap-4 flex-wrap justify-start">
        {
          admins.map((admin,index) => (
            <div key={index} className="flex flex-col items-center gap-4 bg-white border border-gray-300 shadow-md rounded-lg w-64 h-auto p-4">
              <img src={admin.photo.url} alt={admin.name} className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 shadow-sm" />
              <p className="text-xl font-semibold text-gray-800">{admin.name}</p>
              <p className="text-sm text-gray-600">{admin.email}</p>
            </div>
          ))
        }
      </div>
    </div>

  )
}

export default Creators
