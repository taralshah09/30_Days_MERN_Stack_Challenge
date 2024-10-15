import React, { useState } from 'react'
import axios from 'axios'

const CreateBlog = () => {

  const [category, setCategory] = useState("")
  const [title, setTitle] = useState("")
  const [blogImage, setBlogImage] = useState(null)  // Store the file object here
  const [blogImagePreview, setBlogImagePreview] = useState(null)  // Store the preview URL here
  const [about, setAbout] = useState("")

  // Handle image file selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setBlogImage(file);  // Set the actual file object
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogImagePreview(reader.result);  // Set the image preview URL
      };
      reader.readAsDataURL(file);  // Convert the file to a base64 URL for preview
    }
  };

  // Submit the form
  const createBlog = async (e) => {
    e.preventDefault();

    // Check if an image has been selected
    if (!blogImage) {
      alert("Please upload a blog image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);  // Append the actual file to FormData

    try {
      const response = await axios.post(
        "http://localhost:3000/api/blogs/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data); // Log the response data if needed
      alert("Blog created successfully!");

      // Reset form inputs after successful submission
      setTitle("")
      setCategory("")
      setAbout("")
      setBlogImage(null)
      setBlogImagePreview(null)  // Reset image preview

    } catch (error) {
      console.log("Failed to create the blog:", error);
      alert(error.response?.data?.message || error.message || "An error occurred while creating the blog");
    }
  }

  return (
    <div className='h-[100%] w-full flex items-start justify-center pt-7 bg-slate-100'>
      <div className='bg-white w-[60%] p-5 border shadow-sm rounded-md'>
        <h1 className="text-3xl font-bold">Create Blog</h1>
        <div className='w-full mt-4'>
          <label htmlFor="category" className='text-lg font-semibold mb-2'>Category</label>
          {/* 
            <select
                name="role"
                id="role"     
                className="w-full p-2 mb-4 border rounded-md"
                defaultValue=""
                value={role}
                onChange={(e)=>setRole(e.target.value)}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
          */}
          <select name="category" id="category" className='w-full border px-2 py-1 shadow-sm rounded-sm' defaultValue="" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="" disabled>
              Select Role
            </option>
            <option value="Tech">Tech</option>
            <option value="Sports">Sports</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Political">Political</option>
            <option value="Books">Books</option>
          </select>
        </div>
        <div className='w-full mt-4 flex-col gap-2'>
          <label htmlFor="title" className='text-lg font-semibold mb-2'>Title</label>
          <input type="text" id="title" placeholder='Enter title' className='w-full border px-2 py-1 shadow-sm rounded-sm' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className='w-full mt-4 flex-col gap-2'>
          <label htmlFor="blogImage" className='text-lg font-semibold mb-2'>Blog Image</label>

          {/* Image preview */}
          {blogImagePreview && <img src={blogImagePreview} alt="blogImage_preview" className='w-32 h-32 mb-2' />}

          {/* File input */}
          <input
            type="file"
            id="blogImage"
            className='w-full border px-2 py-1 shadow-sm rounded-sm'
            onChange={handleImageChange}
          />
        </div>
        <div className='w-full mt-4 flex-col gap-2'>
          <label htmlFor="about" className='text-lg font-semibold mb-2'>About</label>
          <textarea name="about" id="about" className='w-full border px-2 py-1 shadow-sm rounded-sm resize-none h-40' value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
        </div>

        <button className='w-full bg-blue-500 text-white font-semibold p-2 rounded-md mt-4' onClick={(e) => createBlog(e)}>Create blog</button>

      </div>
    </div>
  )
}

export default CreateBlog
