// // src/services/personalDetailsService.js
// import axios from '../api/axiosInstance';
// import { getMyPersonalDetails } from '../api/personalDetails';

// export const createPersonalDetails = async (personalData) => {
//   try {
//     const access_token = localStorage.getItem('token');
    
//     const response = await axios.post('/api/v1/personal_details', personalData, {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     });

//     // Update local storage to indicate user now has personal details
//     localStorage.setItem('has_personal_details', 'true');

//     return response.data;
//   } catch (err) {
//     throw err.response?.data || { message: 'Failed to create personal details' };
//   }
// };

// export const handleGetMyPersonalDetails = async () => {
//     try {
//         const response = await getMyPersonalDetails();
//         return response.data; // return the personal details data
//     } catch (err) {
//         throw err.response?.data || { message: 'Failed to retrieve personal details' };
//     }
// };

// export const updatePersonalDetails = async (personalData) => {
//     try {
//         const access_token = localStorage.getItem('token');
        
//         const response = await axios.put('/api/v1/personal_details/employee/my', personalData, {
//             headers: {
//                 Authorization: `Bearer ${access_token}`,
//             },
//         });

//         return response.data;
//     } catch (err) {
//         throw err.response?.data || { message: 'Failed to update personal details' };
//     }
// };


// src/services/personalDetailsService.js


import axios from '../api/axiosInstance';
import { getMyPersonalDetails } from '../api/personalDetails';

export const createPersonalDetails = async (personalData) => {
  try {
    const access_token = localStorage.getItem('token');
    
    const response = await axios.post('/api/v1/personal_details', personalData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Update local storage to indicate user now has personal details
    localStorage.setItem('has_personal_details', 'true');

    return response.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to create personal details' };
  }
};

export const handleGetMyPersonalDetails = async () => {
    try {
        const response = await getMyPersonalDetails();
        // Following the same pattern as your LaptopDashboardLayout
        // Return the data directly, not wrapped in response object
        return response.data?.data || response.data;
    } catch (err) {
        console.error('Error fetching personal details:', err);
        throw err.response?.data || { message: 'Failed to retrieve personal details' };
    }
};

export const updatePersonalDetails = async (personalData) => {
    try {
        const access_token = localStorage.getItem('token');
        
        const response = await axios.put('/api/v1/personal_details/employee/my', personalData, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        return response.data;
    } catch (err) {
        console.error('Error updating personal details:', err);
        throw err.response?.data || { message: 'Failed to update personal details' };
    }
};