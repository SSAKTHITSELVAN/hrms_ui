// src/api/department.js
import axios from './axiosInstance';

export const getAllDepartments = async (skip = 0, limit = 100) => {
    const access_token = localStorage.getItem('token');

    try {
        const response = await axios.get(`/api/v1/departments/?skip=${skip}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        return response.data;
    } catch (err) {
        throw err.response || { message: 'Failed to retrieve departments' };
    }
};

export const getDepartmentById = async (departmentId) => {
    const access_token = localStorage.getItem('token');

    try {
        const response = await axios.get(`/api/v1/departments/${departmentId}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        return response.data;
    } catch (err) {
        throw err.response || { message: 'Failed to retrieve department details' };
    }
};

export const createDepartment = async (departmentData) => {
    const access_token = localStorage.getItem('token');

    try {
        const response = await axios.post('/api/v1/departments/', departmentData, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (err) {
        throw err.response || { message: 'Failed to create department' };
    }
};

export const updateDepartment = async (departmentId, departmentData) => {
    const access_token = localStorage.getItem('token');

    try {
        const response = await axios.put(`/api/v1/departments/${departmentId}`, departmentData, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (err) {
        throw err.response || { message: 'Failed to update department' };
    }
};

export const deleteDepartment = async (departmentId) => {
    const access_token = localStorage.getItem('token');

    try {
        const response = await axios.delete(`/api/v1/departments/${departmentId}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        return response.data;
    } catch (err) {
        throw err.response || { message: 'Failed to delete department' };
    }
};

export const getDepartmentsByCompany = async (companyId, skip = 0, limit = 100) => {
    const access_token = localStorage.getItem('token');

    try {
        const response = await axios.get(`/api/v1/departments/company/${companyId}?skip=${skip}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        return response.data;
    } catch (err) {
        throw err.response || { message: 'Failed to retrieve company departments' };
    }
};

export const searchDepartments = async (searchQuery, skip = 0, limit = 100) => {
    const access_token = localStorage.getItem('token');

    try {
        const response = await axios.get(`/api/v1/departments/search/?q=${encodeURIComponent(searchQuery)}&skip=${skip}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        return response.data;
    } catch (err) {
        throw err.response || { message: 'Failed to search departments' };
    }
};