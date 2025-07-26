// src/api/employee.js
import axios from './axiosInstance';

export const getAllEmployees = async (skip = 0, limit = 100) => {
    const access_token = localStorage.getItem('token');

    try {
        const response = await axios.get(`/api/v1/personal_details/?skip=${skip}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        return response.data;
    } catch (err) {
        throw err.response || { message: 'Failed to retrieve employees' };
    }
};

export const getEmployeeById = async (employeeId) => {
    const access_token = localStorage.getItem('token');

    try {
        const response = await axios.get(`/api/v1/personal_details/employee/byid/${employeeId}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        return response.data;
    } catch (err) {
        throw err.response || { message: 'Failed to retrieve employee details' };
    }
};

export const updateEmployeeStatus = async (employeeId, newStatus) => {
    const access_token = localStorage.getItem('token');

    try {
        const response = await axios.patch(`/auth/employees/${employeeId}/status?new_status=${newStatus}`, {}, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'accept': 'application/json',
            },
        });

        return response.data;
    } catch (err) {
        throw err.response || { message: 'Failed to update employee status' };
    }
};