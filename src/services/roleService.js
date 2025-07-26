// src/services/roleService.js
import { getAllRoles, getRoleById, createRole, updateRole, updateRoleStatus, deleteRole } from '../api/role';

export const handleGetAllRoles = async (skip = 0, limit = 100, active_only = false) => {
    try {
        const response = await getAllRoles(skip, limit, active_only);
        return response.data?.items || response.data || [];
    } catch (err) {
        console.error('Error fetching roles:', err);
        throw err.response?.data || { message: 'Failed to retrieve roles' };
    }
};

export const handleGetRoleById = async (roleId) => {
    try {
        const response = await getRoleById(roleId);
        return response.data?.data || response.data;
    } catch (err) {
        console.error('Error fetching role details:', err);
        throw err.response?.data || { message: 'Failed to retrieve role details' };
    }
};

export const handleCreateRole = async (roleData) => {
    try {
        const response = await createRole(roleData);
        return response.data || response;
    } catch (err) {
        console.error('Error creating role:', err);
        throw err.response?.data || { message: 'Failed to create role' };
    }
};

export const handleUpdateRole = async (roleId, roleData) => {
    try {
        const response = await updateRole(roleId, roleData);
        return response.data || response;
    } catch (err) {
        console.error('Error updating role:', err);
        throw err.response?.data || { message: 'Failed to update role' };
    }
};

export const handleUpdateRoleStatus = async (roleId, isActive) => {
    try {
        const response = await updateRoleStatus(roleId, isActive);
        return response.data || response;
    } catch (err) {
        console.error('Error updating role status:', err);
        throw err.response?.data || { message: 'Failed to update role status' };
    }
};

export const handleDeleteRole = async (roleId) => {
    try {
        const response = await deleteRole(roleId);
        return response.data || response;
    } catch (err) {
        console.error('Error deleting role:', err);
        throw err.response?.data || { message: 'Failed to delete role' };
    }
};