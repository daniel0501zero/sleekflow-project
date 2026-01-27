import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate, getDueStatus } from '../utils/dateUtils';
import ShareTodo from './ShareTodo';
import { AppContext } from '../hooks/useApp';


const Todo = ({ id, name, status, description, dueTime, createdAt, updatedAt, users }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AppContext);
  console.log(users);
  const navigate = useNavigate();

  const dueStatus = getDueStatus(dueTime);

  const getStatusColor = () => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Not Started': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getdueTimeColor = () => {
    switch (dueStatus) {
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'today': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'tomorrow': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'this-week': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/todos/${id}`, {
        data: { email: user?.email }
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || 'Failed to delete');
    }
    finally {
      setIsDeleting(false);
    }
  };

  const toggleStatus = async () => {
    const nextStatus = {
      'Not Started': 'In Progress',
      'In Progress': 'Completed',
      'Completed': 'Not Started'
    }[status];

    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/todos/${id}`, {
        status: nextStatus
      });
      console.log("toggle status")
      window.location.reload();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-all ${dueStatus === 'overdue' ? 'border-l-4 border-l-red-500' : ''
      }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-3">

            <h3 className={`text-lg font-semibold ${status === 'Completed' ? 'line-through text-gray-500' : 'text-gray-800'
              }`}>
              {name}
            </h3>
          </div>

          {showDetails && description && (
            <p className="text-gray-600 mb-4 pl-9">{description}</p>
          )}

          <div className="flex flex-wrap gap-2 pl-9">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor()}`}>
              {status === 'In Progress' ? '🚧 ' : ''}
              {status}
            </span>

            {dueTime && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getdueTimeColor()}`}>
                📅 {formatDate(dueTime)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
            title={showDetails ? 'Hide details' : 'Show details'}
          >
            {showDetails ? '👆' : '👇'}
          </button>

          <Link
            to={`/update/${id}`}
            state={{ id, name, status, description, dueTime, updatedAt }}
            className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
            title="Edit"
          >
            ✏️
          </Link>

          <button title='share' onClick={() => setShowShareModal(true)} className='p-2 text-purple-500 hover:text-purple-700 hover:bg-purple-50 rounded-lg cursor-pointer'>
            👥
          </button>

          {
            showShareModal && (
              <ShareTodo id={id} onClose={() => setShowShareModal(false)} onSuccess={() => window.location.reload()} />
            )
          }

          <button
            onClick={() => setIsDeleting(true)}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg disabled:opacity-50 cursor-pointer"
            title="Delete"
          >
            🗑️
          </button>
          {isDeleting && (
            <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-96">
                <h1 className='text-center text-xl font-bold py-3'>Warning!</h1>
                <hr className='mb-5' />
                <div className='space-y-4 flex flex-row gap-5 my-2'>
                  <p className='block text-md m-auto font-medium text-gray-700 mb-2'>Are you sure to delete this todo?</p>
                </div>
                <div className='flex space-x-3'>
                  <button onClick={handleDelete} className='flex-1 bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'>Delete</button>
                  <button onClick={() => {
                    setIsDeleting(false);
                    setError('');
                  }} className='flex-1 bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg cursor-pointer'>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 pl-9">
        <div className="flex space-x-3">
          <button
            onClick={toggleStatus}
            className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100"
          >
            {status === 'Completed' ? '↩️ Undo' : '✅ Complete'}
          </button>

          <Link
            to={`/view/${id}`}
            state={{ id, name, status, description, dueTime, createdAt, updatedAt, users }}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            👁️ View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Todo;