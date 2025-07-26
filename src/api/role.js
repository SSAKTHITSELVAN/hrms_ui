// src/api/role.js
import axios from './axiosInstance';

export const getAllRoles = async (skip = 0, limit = 100, active_only = false) => {
    const access_token = localStorage.getItem('token');

    try {
        const response = await axios.get(`/api/v1/roles/?skip=${skip}&limit=${limit}&active_only=${active_only}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        return response.data;
    } catch (err) {
        throw err.response || { message: 'Failed to retrieve roles' };
    }
};

export const getRoleById = async (roleId) => {
    const access_token = localStorage.getItem('token');

    try {
        const response = await axios.get(`/api/v1/roles/${roleId}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        return response.data;
    } catch (err) {
        throw err.response || { message: 'Failed to retrieve role details' };
    }
};

export const createRole = async (roleData) => {
    const access_token = localStorage.getItem('token');

    try {
        const response = await axios.post('/api/v1/roles', roleData, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (err) {
        throw err.response || { message: 'Failed to create role' };
    }
};

export const updateRole = async (roleId, roleData) => {
    const access_token = localStorage.getItem('token');

    try {
        const response = await axios.put(`/api/v1/roles/${roleId}`, roleData, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (err) {
        throw err.response || { message: 'Failed to update role' };
    }
};

export const updateRoleStatus = async (roleId, isActive) => {
    const access_token = localStorage.getItem('token');

    try {
        const response = await axios.patch(`/api/v1/roles/${roleId}/status`, 
            { is_active: isActive }, 
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (err) {
        throw err.response || { message: 'Failed to update role status' };
    }
};

export const deleteRole = async (roleId) => {
    const access_token = localStorage.getItem('token');

    try {
        const response = await axios.delete(`/api/v1/roles/${roleId}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        return response.data;
    } catch (err) {
        throw err.response || { message: 'Failed to delete role' };
    }
};