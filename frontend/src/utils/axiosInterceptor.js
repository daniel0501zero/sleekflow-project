import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const setupAxiosInterceptors = (navigate) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        navigate('/login', { state: { sessionExpired: true } });
      }
      return Promise.reject(error);
    }
  );
};
