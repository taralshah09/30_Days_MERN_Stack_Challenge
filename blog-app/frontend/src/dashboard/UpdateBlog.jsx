import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBlog = () => {

  const navigate = useNavigate()
  
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [blogImage, setBlogImage] = useState(null); // Store the image file
  const [blogImagePreview, setBlogImagePreview] = useState(''); // Store the preview URL
  const [about, setAbout] = useState('');

  // Fetch blog details on component mount
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/blogs/single-blog/${id}`,
          { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
        );
        console.log(data);

        // Set state with fetched data
        setBlog(data);
        setCategory(data.category);
        setTitle(data.title);
        setAbout(data.about);
        setBlogImagePreview(data.blogImage?.url || ''); // Set preview from fetched data
      } catch (error) {
        console.error('Error fetching blog:', error.message);
      }
    };

    fetchDetails();
  }, [id]);

  // Handle image change and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogImagePreview(reader.result); // Set preview for new image
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit the updated blog
  const updateBlog = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('about', about);
    if (blogImage) formData.append('blogImage', blogImage); // Append only if a new image is selected

    try {
      const response = await axios.put(
        `http://localhost:3000/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      console.log('Blog updated:', response.data);
      alert('Blog updated successfully!');
      navigate("/dashboard")
    } catch (error) {
      console.error('Failed to update the blog:', error);
      alert(error.response?.data?.message || 'Error updating blog');
    }
  };

  return (
    <div className="h-[100%] w-full flex items-start justify-center pt-7 bg-slate-100">
      <div className="bg-white w-[60%] p-5 border shadow-sm rounded-md">
        <h1 className="text-3xl font-bold">Update Blog</h1>

        <div className="w-full mt-4">
          <label htmlFor="category" className="text-lg font-semibold mb-2">Category</label>
          <select
            id="category"
            className="w-full border px-2 py-1 shadow-sm rounded-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>Select Category</option>
            <option value="Tech">Tech</option>
            <option value="Sports">Sports</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Political">Political</option>
            <option value="Books">Books</option>
          </select>
        </div>

        <div className="w-full mt-4">
          <label htmlFor="title" className="text-lg font-semibold mb-2">Title</label>
          <input
            type="text"
            id="title"
            className="w-full border px-2 py-1 shadow-sm rounded-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="w-full mt-4">
          <label htmlFor="blogImage" className="text-lg font-semibold mb-2">Blog Image</label>
          {blogImagePreview && (
            <img src={blogImagePreview} alt="blog_preview" className="w-32 h-32 mb-2" />
          )}
          <input
            type="file"
            id="blogImage"
            className="w-full border px-2 py-1 shadow-sm rounded-sm"
            onChange={handleImageChange}
          />
        </div>

        <div className="w-full mt-4">
          <label htmlFor="about" className="text-lg font-semibold mb-2">About</label>
          <textarea
            id="about"
            className="w-full border px-2 py-1 shadow-sm rounded-sm resize-none h-40"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white font-semibold p-2 rounded-md mt-4"
          onClick={updateBlog}
        >
          Update Blog
        </button>
      </div>
    </div>
  );
};

export default UpdateBlog;
