import axios from "axios";
import React, { useMemo } from "react"
import { useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "./Layout/Header";
import { Link } from "react-router-dom";
import Footer from "./Layout/Footer";
import { validateTodo } from "../utils/validation";

const UpdateTodo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, name, status, description, dueTime, updatedAt } = location.state;
    const [todoName, setTodoName] = useState(name);
    const [todoStatus, setTodoStatus] = useState(status);
    const [todoDescription, setTodoDescription] = useState(description);
    const [todoDueTime, setTodoDueTime] = useState(dueTime);
    const [todoUpdatedAt, setTodoUpdatedAt] = useState(updatedAt);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTodoUpdatedAt(Date.now());
        const validationErrors = validateTodo({
            name: todoName,
            status: todoStatus,
            description: todoDescription,
            dueTime: todoDueTime
        })
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {

            const res = await axios.put(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/todos/${id}`, {
                name: todoName,
                description: todoDescription,
                status: todoStatus,
                dueTime: todoDueTime,
                updatedAt: Date.now()
            })
            navigate("/home");
        } catch (error) {
            console.log(error)
            setErrors({ submit: 'Failed to update todo. Please try again.' });
        }
    }

    const today = useMemo(() => {
        const d = new Date();
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }, []);

    return (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-96">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Update the todo</h1>
                {errors.submit && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        ❌ {errors.submit}
                    </div>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="todo-name" className="block text-sm font-medium text-gray-700 mb-2">Name: </label>
                        <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" type="text" name="name" id="todo-name" value={todoName} onChange={(e) => setTodoName(e.target.value)} />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                ⚠️ {errors.name}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="todo-status" className="block text-sm font-medium text-gray-700 mb-2">Status: </label>
                        <select name="status" id="todo-status" value={todoStatus} onChange={(e) => setTodoStatus(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="todo-description" className="block text-sm font-medium text-gray-700 mb-2">Description: </label>
                        <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" name="description" id="todo-description" value={todoDescription} onChange={(e) => setTodoDescription(e.target.value)}></textarea>

                    </div>
                    <div>
                        <label htmlFor="todo-dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                            DueDate:
                        </label>
                        <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" type="date" name="date" id="todo-dueDate" value={todoDueTime} onChange={(e) => setTodoDueTime(e.target.value)} min={today} />
                        {errors.dueTime && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                ⚠️ {errors.dueTime}
                            </p>
                        )}
                    </div>
                    <div className="flex space-x-3">
                        <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg cursor-pointer">Edit</button>
                        <Link to="/home">
                            <button className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg cursor-pointer" type="button">Cancel</button>
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    )
}
export default UpdateTodo