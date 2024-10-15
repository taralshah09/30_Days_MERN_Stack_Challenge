import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import axios from 'axios'

const Details = () => {
    const { id } = useParams()
    const [creatorName, setCreatorName] = useState("")
    const { blogs } = useAuth();
    const mainBlog = blogs.find((blog) => blog._id === id); // Use `find` to directly get the object

    useEffect(() => {
        const fetchAdminName = async (blogId) => {
            try {
                const { data } = await axios.get("http://localhost:3000/api/users/admins", { withCredentials: true });
                const creatorOfThisBlog = data?.admins.find((admin) => admin._id === mainBlog.createdBy);

                if (creatorOfThisBlog) {
                    setCreatorName(creatorOfThisBlog.name);
                } else {
                    setCreatorName("Unknown"); // Fallback in case admin isn't found
                }
            } catch (error) {
                console.error("Error fetching admin:", error);
                setCreatorName("Unknown"); // Handle error state
            }
        };

        if (id) fetchAdminName(id);
    }, [id]); // Include `id` in the dependency array

    if (!mainBlog) return <div>Loading...</div>; // Conditional rendering to avoid errors

    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <div className='w-[50%] h-auto p-5 border shadow-lg m-10'>
                <img src={mainBlog.blogImage?.url} alt={mainBlog.title || 'Blog Image'} />
                <div className='mt-4 flex-col gap-1'>
                    <span className='text-blue-500 font-bold'>Title</span>
                    <p className="text-xl font-normal">{mainBlog.title}</p>
                </div>
                <div className='mt-4 flex-col gap-1'>
                    <span className='text-blue-500 font-bold'>About</span>
                    <p className="text-xl font-normal">{mainBlog.about}</p>
                </div>
                <div className='mt-4 flex-col gap-1'>
                    <span className='text-blue-500 font-bold'>Category</span>
                    <p className="text-xl font-normal">{mainBlog.category}</p>
                </div>
                <div className='mt-4 flex-col gap-1'>
                    <span className='text-blue-500 font-bold'>Created by</span>
                    <p className="text-xl font-normal">{creatorName}</p>
                </div>
            </div>
        </div>
    );
};

export default Details;
