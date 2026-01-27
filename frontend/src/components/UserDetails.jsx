import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Layout/Header";
import Footer from './Layout/Footer'
import { useState } from "react";
import { useEffect } from "react";

const UserDetails = () => {
    const [user, setUser] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    useEffect(() => { fetchUser() }, [])
    const fetchUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/users/getUserDetails`, { withCredentials: true })
            setUser(response.data)
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }
    const handleLogout  = async() => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/users/logout`, {}, {withCredentials: true});
            navigate('/login');
        } catch (error) {
            console.log("Logout failed: ", error);
            alert('Logout failed. Please try again.')
        }
    }
    return (
        <div>
            <Header isLogin={isLogin} setIsLogin={setIsLogin} user={user}/>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 p-20">
                <div className="bg-white p-15 rounded-xl shadow w-auto max-w-700 flex flex-col mb-12 gap-4 w-lg">
                    <h2 className="text-center mb-5 text-indigo-900 text-2xl font-bold">User Details</h2>
                    {user && (
                        <>
                            <p className="flex flex-row gap-6 text-lg font-bold"><strong>Name: </strong>{user.name}</p>
                            <p className="flex flex-row gap-6 text-lg font-bold"><strong>Email: </strong>{user.email}</p>
                            <p className="flex flex-row gap-5 mb-4 text-lg font-bold"><strong>Phone: </strong>{user.mobile}</p>
                        </>
                    )}
                    <button type="button" onClick={handleLogout} className="w-full p-4 bg-blue-700 text-white border-none rounded-xl text-lg bold cursor-pointer transition hover:scale-[1.05] hover:bg-blue-500 font-bold">
                        Logout
                    </button>
                    <Link to="/home">
                        <button className="w-full p-4 bg-indigo-700 text-white border-none rounded-xl text-lg bold cursor-pointer transition hover:scale-[1.05] hover:bg-indigo-500 font-bold">
                            Back to home page
                        </button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default UserDetails;