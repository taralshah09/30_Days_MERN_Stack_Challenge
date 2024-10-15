import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import Sidebar from '../dashboard/Sidebar';
import MyProfile from "../dashboard/MyProfile"
import CreateBlog from "../dashboard/CreateBlog"
import UpdateBlog from "../dashboard/UpdateBlog"
import MyBlogs from "../dashboard/MyBlogs"


const Dashboard = () => {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");

  console.log(profile);
  console.log(isAuthenticated);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar component={component} setComponent={setComponent} />

      {/* Main content area */}
      <div className={`flex-1  transition-all duration-300 ${component !== "My Blogs" ? 'ml-64' : ''} md:ml-64`}>
      {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : (
          <MyBlogs />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
