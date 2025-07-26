// // src/api/address.js
// import axios from './axiosInstance';

// export const getMyAddress = async () => {
//     const access_token = localStorage.getItem('token');

//     try {
//         const response = await axios.get('/api/v1/address/employee/my', {
//             headers: {
//                 Authorization: `Bearer ${access_token}`,
//             },
//         });

//         return response.data; // Return the full response data object

//     } catch (err) {
//         throw err.response || { message: 'Failed to retrieve address details' };
//     }
// };

// export const checkAddressExists = async (addressType) => {
//     const access_token = localStorage.getItem('token');

//     try {
//         const response = await axios.get(`/api/v1/address/my/check/${addressType}`, {
//             headers: {
//                 Authorization: `Bearer ${access_token}`,
//             },
//         });

//         return response.data;

//     } catch (err) {
//         throw err.response || { message: `Failed to check ${addressType} address existence` };
//     }
// };

// export const createAddress = async (addressData) => {
//     const access_token = localStorage.getItem('token');

//     try {
//         const response = await axios.post('/api/v1/address', addressData, {
//             headers: {
//                 Authorization: `Bearer ${access_token}`,
//             },
//         });

//         return response.data;

//     } catch (err) {
//         throw err.response || { message: 'Failed to create address' };
//     }
// };

// export const updateAddressByType = async (addressType, addressData) => {
//     const access_token = localStorage.getItem('token');

//     try {
//         const response = await axios.put(`/api/v1/address/my/type/${addressType}`, addressData, {
//             headers: {
//                 Authorization: `Bearer ${access_token}`,
//             },
//         });

//         return response.data;

//     } catch (err) {
//         throw err.response || { message: `Failed to update ${addressType} address` };
//     }
// };

// src/api/address.js
import axios from './axiosInstance';

export const getMyAddress = async () => {
    const access_token = localStorage.getItem('token');

    try {
        const response = await axios.get('/api/v1/address/employee/my', {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data; // Return the full response data object

    } catch (err) {
        console.error('getMyAddress error:', err);
        throw err.response || { message: 'Failed to retrieve address details' };
    }
};

export const checkAddressExists = async (addressType) => {
    const access_token = localStorage.getItem('token');

    try {
        console.log('Checking if address exists for type:', addressType);
        const response = await axios.get(`/api/v1/address/my/check/${addressType}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Address exists check response:', response.data);
        return response.data;

    } catch (err) {
        console.error('checkAddressExists error:', err);
        throw err.response || { message: `Failed to check ${addressType} address existence` };
    }
};

export const createAddress = async (addressData) => {
    const access_token = localStorage.getItem('token');

    try {
        console.log('Making POST request to create address:', addressData);
        const response = await axios.post('/api/v1/address', addressData, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Create address response:', response);
        return response.data;

    } catch (err) {
        console.error('createAddress error:', err);
        throw err.response || { message: 'Failed to create address' };
    }
};

export const updateAddressByType = async (addressType, addressData) => {
    const access_token = localStorage.getItem('token');

    try {
        console.log('Making PUT request to update address type:', addressType);
        console.log('PUT request URL:', `/api/v1/address/my/type/${addressType}`);
        console.log('PUT request data:', addressData);
        console.log('PUT request headers:', {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        });

        const response = await axios.put(`/api/v1/address/my/type/${addressType}`, addressData, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('PUT response received:', response);
        return response.data;

    } catch (err) {
        console.error('updateAddressByType error:', err);
        console.error('Error response:', err.response);
        console.error('Error status:', err.response?.status);
        console.error('Error data:', err.response?.data);
        throw err.response || { message: `Failed to update ${addressType} address` };
    }
};