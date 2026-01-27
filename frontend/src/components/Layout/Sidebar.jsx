import React from 'react';

const Sidebar = ({ filters, onFilterChange, stats }) => {
  const statusOptions = [
    { value: '', label: 'All Status', icon: '📋' },
    { value: 'Not Started', label: 'Not Started', icon: '⏳' },
    { value: 'In Progress', label: 'In Progress', icon: '🚧' },
    { value: 'Completed', label: 'Completed', icon: '✅' },
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Statistics</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-blue-500">Total</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-green-500">Done</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
            <div className="text-sm text-yellow-500">Active</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">🔍 Filters</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <div className="space-y-2">
              {statusOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => onFilterChange({ ...filters, status: option.value })}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                    filters.status === option.value
                      ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Show Tasks Due
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={filters.dueFilter || 'all'}
              onChange={(e) => onFilterChange({ ...filters, dueFilter: e.target.value })}
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">Within 7 Days</option>
              <option value="month">Within a month</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <button
            onClick={() => onFilterChange({
              status: '',
              sortBy: 'dueDate',
              order: 'asc',
              dueFilter: 'all'
            })}
            className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">💡 Tips</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start">
            <span className="mr-2">✅</span>
            Click on a task to view details
          </li>
          <li className="flex items-start">
            <span className="mr-2">✏️</span>
            Edit tasks directly from the list
          </li>
          <li className="flex items-start">
            <span className="mr-2">📅</span>
            Set due dates to stay organized
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔔</span>
            Tasks due today are highlighted
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;