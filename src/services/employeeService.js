// src/services/employeeService.js
import { getAllEmployees, getEmployeeById, updateEmployeeStatus } from '../api/employee';

export const handleGetAllEmployees = async (skip = 0, limit = 100) => {
    try {
        const response = await getAllEmployees(skip, limit);
        return response.data?.items || response.data || [];
    } catch (err) {
        console.error('Error fetching employees:', err);
        throw err.response?.data || { message: 'Failed to retrieve employees' };
    }
};

export const handleGetEmployeeById = async (employeeId) => {
    try {
        const response = await getEmployeeById(employeeId);
        return response.data?.data || response.data;
    } catch (err) {
        console.error('Error fetching employee details:', err);
        throw err.response?.data || { message: 'Failed to retrieve employee details' };
    }
};

export const handleUpdateEmployeeStatus = async (employeeId, newStatus) => {
    try {
        const response = await updateEmployeeStatus(employeeId, newStatus);
        return response.data || response;
    } catch (err) {
        console.error('Error updating employee status:', err);
        throw err.response?.data || { message: 'Failed to update employee status' };
    }
};