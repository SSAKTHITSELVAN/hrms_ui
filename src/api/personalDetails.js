// src/api/personalDetails.js
import axios from './axiosInstance';

export const getMyPersonalDetails = async () => {
    const access_token = localStorage.getItem('token');

    try {
        const response = await axios.get('/api/v1/personal_details/employee/my', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        return response.data; // Return the full response data object

    } catch (err) {
        throw err.response || { message: 'Failed to retrieve personal details' };
    }
};