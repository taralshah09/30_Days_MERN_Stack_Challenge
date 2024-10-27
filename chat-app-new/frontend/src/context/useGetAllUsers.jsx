import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import axios from "axios"

const useGetAllUsers = () => {

    const [allUsers, setAllUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const getUsers = async () => {
            setLoading(true);
            try {
                const token = Cookies.get("jwt");
                const response = await axios.get("http://localhost:3000/users", {
                    withCredentials: true, headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
                    ,)

                setAllUsers(response.data.users);
            } catch (error) {
                console.log("Error in fetching all users : ", error)
            }
        }
        getUsers();
    }, [])
    return [allUsers, loading]
}

export default useGetAllUsers
