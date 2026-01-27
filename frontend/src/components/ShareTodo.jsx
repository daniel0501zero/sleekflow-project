import React from "react"
import axios from "axios"
import { useState } from "react"

const ShareTodo = ({ id, onClose, onSuccess }) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleShare = async (e) => {
        e.preventDefault();
        setError('')
        setSuccess('')
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/todos/${id}/share`, { email })

            setSuccess(response.data.message);
            console.log(success)
            setEmail("");

            if (onSuccess) {
                onSuccess(response.data.todo);
            }

            setTimeout(() => {
                setSuccess('');
                onClose();
            }, 2000)
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to share todo')
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-96">

                <h2 className="text-2xl font-bold mb-4 text-gray-800">Share Todo</h2>

                {success && (
                    <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                        ✅ {success}
                    </div>
                )}

                {error && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        ❌ {error}
                    </div>
                )}

                <form onSubmit={handleShare} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter email to share with
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="user@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            disabled={loading}
                        />
                    </div>

                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Sharing...' : 'Share'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default ShareTodo