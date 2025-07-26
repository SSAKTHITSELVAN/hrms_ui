// src/api/auth.js
import axios from './axiosInstance';

export const login = (data) => axios.post('/api/v1/login', data);
