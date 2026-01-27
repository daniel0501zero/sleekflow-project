import React from "react"
import { useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { formatDate, formatUpdatedAt } from "../utils/dateUtils";

const ViewTodo = () => {
    const location = useLocation();
    const { id, name, status, description, dueTime, createdAt, updatedAt, users } = location.state;
    return (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-96">
                    <h1 className="text-center text-xl font-bold py-3">View details of <span className="underline">{name}</span></h1>
                    <div className="space-y-4 flex flex-row gap-15 my-2">
                        <section className="text-sm font-medium text-gray-700 mb-2 w-auto flex flex-col gap-2">
                            <p>Name: <span className="flex">{name}</span></p>
                            <p >ID: <span className="flex">{id}</span></p>
                            <p>Status: <span className="flex">{status}</span></p>
                            <p >Description: <span className="flex">{description ? description : "No description provided"}</span></p>
                            <p >DueDate: <span className="flex">{formatDate(dueTime)}</span></p>
                            <p>Created At: <span className="flex">{formatUpdatedAt(createdAt)}</span></p>
                            <p >Updated At: <span className="flex">{updatedAt ? formatUpdatedAt(updatedAt): "Not recent update"}</span></p>
                            <p >Shared Users: <span className="flex">{users && users.length > 0 ? users.join(', ') : 'No users shared'}</span></p>
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