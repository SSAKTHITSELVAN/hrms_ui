// src/services/authService.js
import { login } from '../api/auth';
import axios from '../api/axiosInstance';

export const loginUser = async (credentials) => {
  try {
    const response = await login(credentials);
    const { access_token } = response.data.data;

    // ✅ Clear the localStorage
    localStorage.clear();

    // ✅ Save to localStorage
    localStorage.setItem('token', access_token);

    // Step 3: Fetch role name from backend using role_id
    const roleResponse = await axios.get(`/api/v1/roles/my`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    
    // ✅ Store the complete role response object
    const roleData = roleResponse.data;
    localStorage.setItem('role_data', JSON.stringify(roleData));

    // Step 4: Check if user has personal details
    const checkResponse = await axios.get('/api/v1/personal_details/employee/check', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Store the check result - if false, user needs to fill personal details
    const hasPersonalDetails = checkResponse.data.data;
    localStorage.setItem('has_personal_details', hasPersonalDetails.toString());

    return response.data;
  } catch (err) {
    throw err.response?.data || { message: 'Login failed' };
  }
};