import React from "react"
import { useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { formatDate } from "../utils/dateUtils";

const ViewTodo = () => {
    const location = useLocation();
    const { id, name, status, description, dueTime, createdAt, updatedAt } = location.state;
    const [todoId, setTodoId] = useState(id);
    return (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-96">
                    <h1 className="text-center text-xl font-bold py-3">View details of <span className="underline">{name}</span></h1>
                    <div className="space-y-4 flex flex-row gap-5 my-2">
                        <section className="block text-sm font-medium text-gray-700 mb-2">
                            <p>Name: </p>
                            <p>ID: </p>
                            <p>Status: </p>
                            <p>Description: </p>
                            <p>DueDate: </p>
                            <p>Created At: </p>
                            <p>Updated At: </p>
                        </section>
                        <section className="block text-sm font-medium text-gray-700 mb-2">
                            <p>{name}</p>
                            <p>{id}</p>
                            <p>{status}</p>
                            <p>{description}</p>
                            <p>{formatDate(dueTime)}</p>
                            <p>{formatDate(createdAt)}</p>
                            <p>{formatDate(updatedAt)}</p>
                        </section>
                    </div>
                    <div className="flex space-x-3">
                        <Link to="/home" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                            <button type="button">Exit</button>
                        </Link>
                    </div>
                </div>
        </div>
    )

}
export default ViewTodo