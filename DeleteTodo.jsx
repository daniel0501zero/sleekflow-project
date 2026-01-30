import React, { useState } from 'react'
import axios from 'axios'


const DeleteTodo = ({ id, user, onClose }) => {
    const [loading, setLoading] = useState(false);
    const handleDelete = async () => {
        setLoading(true);
        console.log("Deleting todo with id:", id);
        console.log("Current user email:", user.email);
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/todos/${id}/${user.email}`)

            setTimeout(() => {
                onClose();
            }, 1500);
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
            onClose();
        }

    };
    return (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-96">
                <h1 className='text-center text-xl font-bold py-3'>Warning!</h1>
                <hr className='mb-5' />
                <div className='space-y-4 flex flex-row gap-5 my-2'>
                    <p className='block text-md m-auto font-medium text-gray-700 mb-2'>Are you sure to delete this todo?</p>
                </div>
                <div className='flex space-x-3'>
                    <button disabled={loading} onClick={handleDelete} className='flex-1 bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'>
                        {loading ? 'Deleting...' : 'Delete'}
                    </button>
                    <button onClick={onClose} className='flex-1 bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg cursor-pointer'>Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default DeleteTodo