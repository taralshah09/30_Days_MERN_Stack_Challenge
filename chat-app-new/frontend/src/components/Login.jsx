import React from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';


const Login = () => {
    const [authUser, setAuthUser] = useAuth()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password,
        }

        try {
            const response = await axios.post("http://localhost:3000/users/login", userInfo, { withCredentials: true });
            localStorage.setItem("ChatApp", JSON.stringify(response.data));
            setAuthUser(response.data);
            navigate("/");
        } catch (error) {
            alert(error.message)
        }

    }
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="w-[90%] md:w-[40%] lg:w-[30%] p-8 border rounded-lg shadow-lg flex flex-col items-center gap-5">
                <h1 className="text-4xl text-center font-bold mb-2">Chat<span className="text-green-500">App</span></h1>
                <p className="text-gray-500 text-center mb-6">Login to your account to start chatting with your friends!</p>


                <form onSubmit={handleSubmit((data) => onSubmit(data))} className='w-full'>
                    <div className="space-y-4 w-full">


                        {/* Email */}
                        <label className="flex items-center border rounded-lg p-2 focus-within:border-green-500 bg-gray-950">
                            <input type="email" name="email" className="w-full outline-none p-1 text-sm bg-gray-950" placeholder="Email"  {...register('email', { required: true })} />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70 mr-2">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                        </label>
                        {errors.email && <p className='text-red-500'>Email is required.</p>}

                        {/* Password */}
                        <label className="flex items-center border rounded-lg p-2 focus-within:border-green-500 bg-gray-950">
                            <input type="password" name="password" className="w-full outline-none p-1 text-sm bg-gray-950" placeholder="Password"  {...register('password', { required: true })} />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70 mr-2">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>
                        {errors.password && <p className='text-red-500'>Password is required.</p>}

                    </div>

                    <button className="w-full py-2 mt-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition">
                        Login
                    </button>
                </form>

                <p className="text-sm text-gray-500 mt-4">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-green-500 font-semibold hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
