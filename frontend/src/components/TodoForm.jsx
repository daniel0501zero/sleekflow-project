import React, { useState } from 'react';
import { validateTodo } from '../utils/validation';
import { formatDateForInput } from '../utils/dateUtils';

const TodoForm = ({ onSubmit, initialData = {}, user }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    status: initialData.status || 'Not Started',
    dueTime: initialData.dueTime ? formatDateForInput(initialData.dueTime) : '',
    description: initialData.description || ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage('');
    e.currentTarget.reset();

    // Validate form
    const validationErrors = validateTodo(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitting(false);
      return;
    }

    try {
      // Prepare data
      const submitData = {
        ...formData,
        dueTime: formData.dueTime || null,
        users: user?.email ? [user.email] : []
      };

      const result = await onSubmit(submitData);
      
      if (result.success) {
        setSuccessMessage(result.message);
        // Reset form if not editing
        if (!initialData.name) {
          setFormData({
            name: '',
            status: 'Not Started',
            dueTime: '',
            description: ''
          });
        }
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrors({ submit: result.message });
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          ✅ {successMessage}
        </div>
      )}

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          ❌ {errors.submit}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Task Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="What needs to be done?"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            ⚠️ {errors.name}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="Not Started">⏳ Not Started</option>
            <option value="In Progress">🚧 In Progress</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Due Date
          </label>
          <input
            type="date"
            name="dueTime"
            value={formData.dueTime}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.dueTime ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dueTime && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              ⚠️ {errors.dueTime}
            </p>
          )}
          {formData.dueTime && !errors.dueTime && (
            <p className="mt-1 text-sm text-gray-500">
              📅 {new Date(formData.dueTime).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Add more details about this task..."
        />
        <p className="mt-1 text-sm text-gray-500">
          {formData.description.length}/500 characters
        </p>
      </div>

      <div>
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
            submitting 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 transform hover:-translate-y-0.5'
          } text-white shadow-lg`}
        >
          {submitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </span>
          ) : (
            '➕ Add Todo'
          )}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;