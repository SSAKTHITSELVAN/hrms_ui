// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: "http://127.0.0.1:8000", // Set in .env
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default axiosInstance



import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // move to .env later
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Attach Authorization header automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Optional: Auto logout if unauthorized
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid → clear session
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
