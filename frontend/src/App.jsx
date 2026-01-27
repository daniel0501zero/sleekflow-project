import React, { useState, useEffect } from 'react';
import axios from "axios";
import { AppContext } from './hooks/useApp.js';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm'; // New enhanced form
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Sidebar from './components/Layout/Sidebar';
import { redirect, useNavigate } from 'react-router-dom';
import { setupAxiosInterceptors } from './utils/axiosInterceptor';
import './styles/index.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    status: '',
    sortBy: 'dueTime',
    order: 'asc',
    dueFilter: '',
  });
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);

  // Fetch todos
  useEffect(() => {
    // Setup axios interceptor for session expiration
    setupAxiosInterceptors(navigate);

    const getData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/todos`)
        setTodos(res.data.allTodos);
        console.log(res.data)
        setError(null);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setError('Failed to load todos. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/users/getUserDetails`, { withCredentials: true })
        setUser(response.data)
      } catch (error) {
        console.log(error)
        // Session expired or unauthorized
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate('/login', { state: { sessionExpired: true } });
        }
      }
    }
    getData();
    fetchUser();
  }, []);

  // Filter and sort todos
  const filteredTodos =

    todos.filter(todo => {
      if (user?.email && (!todo.users || !todo.users.includes(user.email))) {
        return false;
      }
      if (filters.dueFilter && filters.dueFilter !== "all") {
        const startToday = new Date();
        startToday.setHours(0, 0, 0, 0);
        const dueDate = todo.dueTime ? new Date(todo.dueTime) : null;
        switch (filters.dueFilter){          
          case "today": {
            const endToday = new Date(startToday);
            endToday.setHours(23, 59, 59, 999);
            if (!dueDate || dueDate < startToday || dueDate > endToday) {
              return false;
            }
            break;
          }
          case "week": {
            const endWeek = new Date(startToday);
            endWeek.setDate(endWeek.getDate() + 7);
            if (!dueDate || dueDate < startToday || dueDate > endWeek) {
              return false;
            }
            break;
          }
          case "month": {
            const endMonth = new Date(startToday);
            endMonth.setDate(endMonth.getDate() + 30);
            if (!dueDate || dueDate < startToday || dueDate > endMonth) {
              return false;
            }
            break;
          }
          case "overdue": {
            if (!dueDate || dueDate >= startToday || todo.status === 'Completed') {
              return false;
            }
            break;
          }
          default:
            return true;
        }
      }
      if (filters.status && todo.status !== filters.status) return false;
      return true;
    }).sort((a, b) => {
      const order = filters.order === 'asc' ? 1 : -1;
      if (filters.sortBy === 'dueTime') {
        const dateA = a.dueTime ? new Date(a.dueTime) : new Date('9999-12-31');
        const dateB = b.dueTime ? new Date(b.dueTime) : new Date('9999-12-31');
        return (dateA - dateB) * order;
      }
      if (filters.sortBy === 'name') {
        return a.name.localeCompare(b.name) * order;
      }
      if (filters.sortBy === 'status') {
        return a.status.localeCompare(b.status) * order;
      }
      if (filters.sortBy === 'createdAt') {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date('9999-12-31');
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date('9999-12-31');
        return (dateA - dateB) * order;
      }
      return 0;
    });


  const handleCreateTodo = async (formData) => {
    console.log(formData)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/todos`,
        formData
      );

      const newTodo = response.data.todo || response.data;
      console.log(newTodo)
      setTodos(prev => [...prev, newTodo]);
      setTimeout(() => window.location.reload(), 1500);
      setError(null);
      return { success: true, message: 'Todo created successfully!' };
    } catch (error) {
      console.error('Error creating todo:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create todo'
      };
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/todos/${id}`);
      setTodos(prev => prev.filter(todo => todo._id !== id));
      window.location.reload()
      return { success: true, message: 'Todo deleted successfully!' };
    } catch (error) {
      console.error('Error deleting todo:', error);
      return { success: false, message: 'Failed to delete todo' };
    }
  };

  const getStats = () => {
    return {
      total: filteredTodos.length,
      completed: filteredTodos.filter(t => t.status === 'Completed').length,
      inProgress: filteredTodos.filter(t => t.status === 'In Progress').length,
      notStarted: filteredTodos.filter(t => t.status === 'Not Started').length,
    };
  };

  return (
    <AppContext.Provider value={{ todos, setTodos, handleDeleteTodo, user }}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <Header isLogin={isLogin} setIsLogin={setIsLogin} user={user}/>

        <main className="container mx-auto px-4 py-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  ✨ Create New Todo
                </h2>
                <TodoForm onSubmit={handleCreateTodo} user={user}/>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <Sidebar
                  filters={filters}
                  onFilterChange={setFilters}
                  stats={getStats()}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                       Your Tasks
                    </h2>
                    <p className="text-gray-600">
                      {filteredTodos.length} task{filteredTodos.length !== 1 ? 's' : ''}
                      {filters.status && ` (${filters.status})`}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="dueTime">Due Date</option>
                      <option value="name">Name</option>
                      <option value="status">Status</option>
                      <option value="createdAt">Created</option>
                    </select>
                    <button
                      onClick={() => setFilters({ ...filters, order: filters.order === 'asc' ? 'desc' : 'asc' })}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      {filters.order === 'asc' ? '↑' : '↓'}
                    </button>
                  </div>
                </div>

                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                  </div>
                ) : filteredTodos.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">📭</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No tasks found
                    </h3>
                    <p className="text-gray-500">
                      {filters.status ? `No ${filters.status.toLowerCase()} tasks.` : 'Create your first todo to get started!'}
                    </p>
                  </div>
                ) : (
                  <TodoList todos={filteredTodos} />
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AppContext.Provider>
  );
};

export default App;