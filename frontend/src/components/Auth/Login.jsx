import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../Layout/Header";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [err, setErr] = useState("");
    const [sessionExpired, setSessionExpired] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (location.state?.sessionExpired) {
            setSessionExpired(true);
            setTimeout(() => setSessionExpired(false), 5000);
        }
    }, [location.state]);

    const submitCall = async (data) => {
        setErr("");
        console.log(data)
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/users/login`, data, {
                withCredentials: true
            })
            if (response.status == 200) {
                navigate('/home');
            }
        } catch (error) {
            console.log(error)
            setErr("User does not exists or invalid password, please retry");
        }
    }
    return (
        <div>
            <Header isLogin={isLogin} setIsLogin={setIsLogin}/>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 p-20">
                <form className="bg-white p-15 rounded-xl shadow w-auto max-w-400" onSubmit={handleSubmit(submitCall)}>
                    <h2 className="text-center mb-6 text-indigo-900 text-2xl font-bold">Login</h2>
                    {sessionExpired && (
                        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg mb-3">
                         Session expired. Please log in again.
                        </div>
                    )}
                    {err && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-3">
                            ❌ {err}
                        </div>
                    )}
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-3 ">Email</label>
                        <input id="email" {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            },
                        })} type="text" className="p-6 border border-indigo rounded-xl text-xl transition h-10 focus:border-indigo-500 lg:w-lg md:w-md sm:w-sm" />
                        {
                            errors.email && <div className="text-red-500">{errors.email.message}</div>
                        }
                    </div>
                    <div className="mb-9">
                        <label htmlFor="password" className="block mb-3 ">Password</label>
                        <input id="password" {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })} type="text" className="p-6 border border-indigo rounded-xl text-xl transition h-10 focus:border-indigo-500 lg:w-lg md:w-md sm:w-sm" />
                        {
                            errors.password && <div className="text-red-500">{errors.password.message}</div>
                        }
                    </div>
                    <button type="submit" className="w-full p-4 bg-indigo-700 text-white border-none rounded-xl text-lg bold cursor-pointer transition hover:scale-[1.05] hover:bg-indigo-500 font-bold">Login</button>
                    <p className="align-center mt-4 text-indigo-600 ">Already have an account? <Link to="/register" className="text-indigo-800 underline-none hover:underline">Register</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login;