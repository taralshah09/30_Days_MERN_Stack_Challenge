import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigateTo = useNavigate();

  // State hooks for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [education, setEducation] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');

  // Handle file upload and preview
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log(response.data); // Log the response data if needed
      alert("User registered successfully!");
  
      // Reset form inputs
      setName("");
      setEmail("");
      setEducation("");
      setPhone("");
      setPassword("");
      setPhoto(""); 
      setPhotoPreview("");

      navigateTo("/login")
  
  
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };
  



  return (
    <div className="min-h-screen w-[100%] flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md shadow-md bg-white p-5 rounded-md">
        <form onSubmit={handleRegister}>
          <h2 className="text-3xl text-center font-bold">
            Blog<span className="text-blue-500">App</span>
          </h2>
          <h1 className="text-xl font-semibold mb-6">Register</h1>

          {/* Role Selection */}
          <div className="my-2">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Name Input */}
          <div className="my-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
              placeholder="Your name"
            />
          </div>

          {/* Email Input */}
          <div className="my-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
              placeholder="Your email"
            />
          </div>

          {/* Phone Input */}
          <div className="my-2">
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
              placeholder="Phone number"
            />
          </div>

          {/* Password Input */}
          <div className="my-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
              placeholder="Password"
            />
          </div>

          {/* Education Selection */}
          <div className="my-2">
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option value="">Select Your Education</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="BBA">BBA</option>
            </select>
          </div>

          {/* Photo Upload */}
          <div className="flex items-center mb-4">
            <div className="photo w-20 h-20 mr-4">
              <img
                src={photoPreview || 'https://via.placeholder.com/150'}
                alt="photo"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Login Redirect */}
          <p className="text-center mb-4">
            Already registered?{' '}
            <Link to="/login" className="text-blue-600">
              Login Now
            </Link>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
