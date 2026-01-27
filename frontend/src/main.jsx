import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import UpdateTodo from './components/UpdateTodo.jsx';
import ViewTodo from './components/ViewTodo.jsx';
import './styles/index.css';
import Register from './components/Auth/Register.jsx';
import Login from './components/Auth/Login.jsx';
import UserDetails from './components/UserDetails.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> },
  { path: '/home', element: <App /> },
  { path: '/userDetails', element: <UserDetails /> },
  { path: '/update/:id', element: <UpdateTodo /> },
  { path: '/view/:id', element: <ViewTodo /> }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);