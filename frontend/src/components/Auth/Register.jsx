import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Layout/Header";

const Register = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [err, setErr] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const submitCall = async (data) => {
        console.log(data)
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/users/register`, data)
            if (response.status == 201) {
                setSuccessMessage("User registered successfully! Now redirect to the login page...")
                setTimeout(() => navigate('/login'), 2500);
            }
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data.message)
            setErr(error.response.data.message || "Registration failed, please retry");
        }
    }
    return (
        <div>
            <Header isLogin={isLogin} setIsLogin={setIsLogin} />
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 p-20">
                <form className="bg-white p-15 rounded-xl shadow w-auto max-w-400" onSubmit={handleSubmit(submitCall)}>
                    <h2 className="text-center mb-9 text-indigo-900 text-2xl font-bold">Create an account</h2>
                    {successMessage && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-3">
                            ✅ {successMessage}
                        </div>
                    )}
                    {err && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-3">
                            ❌ {err}
                        </div>
                    )}
                    <div className="mb-9">
                        <label htmlFor="name" className="block mb-3 ">Name</label>
                        <input id="name" type="text" className="p-6 border border-indigo rounded-xl text-xl transition h-10 focus:border-indigo-500 lg:w-lg md:w-md sm:w-sm"
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 3,
                                    message: "Name must be at least 3 characters"
                                }
                            })}
                        />
                        {
                            errors.name && <div className="text-red-500">{errors.name.message}</div>
                        }
                    </div>
                    <div className="mb-9">
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
                        <label htmlFor="mobile" className="block mb-3 ">Mobile Number</label>
                        <input id="mobile" {...register("mobile", {
                            required: "Mobile number is required",
                            pattern: {
                                value: /^[0-9]{8}$/,
                                message: "Mobile number must be 8 digits",
                            },
                        })} type="text" className="p-6 border border-indigo rounded-xl text-xl transition h-10 focus:border-indigo-500 lg:w-lg md:w-md sm:w-sm" />
                        {
                            errors.phone && <div className="text-red-500">{errors.phone.message}</div>
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
                    <button type="submit" className="w-full p-4 bg-indigo-700 text-white border-none rounded-xl text-lg bold cursor-pointer transition hover:scale-[1.05] hover:bg-indigo-500 font-bold">Register</button>
                    <p className="align-center mt-4 text-indigo-600 ">Already have an account? <Link to="/login" className="text-indigo-800 underline-none hover:underline">Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register;
