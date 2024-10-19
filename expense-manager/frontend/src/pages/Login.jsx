import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google'; // Adjust in production
  };

  return (
    <div className='h-screen w-full bg-gray-50 flex items-center justify-center'>
      <div className="w-full sm:w-[400px] p-8 bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col items-center justify-center space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">Create an Account</h2>
        <h3 className='text-3xl text-center text-green-600 font-bold mt-4'>Expense Manager</h3>

        <div className="space-y-4 w-full">
          {/* Add any additional form fields here if needed */}
          <button className='w-full bg-black text-white py-3 px-5 rounded-full text-lg font-semibold transition duration-200 ease-in-out transform hover:bg-gray-800 focus:outline-none' onClick={handleLogin}>
            Login with Google
          </button>
          {/* You can add another button or a link to a login page */}
          <p className="text-center text-sm text-gray-600" >
            Don't have an account? <Link to="/signup"><span className='text-md font-bold text-green-500 hover:underline'>Create One</span></Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
