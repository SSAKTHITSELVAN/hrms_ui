// // src/services/addressService.js
// import { getMyAddress, checkAddressExists, createAddress, updateAddressByType } from '../api/address';

// export const handleGetMyAddress = async () => {
//     try {
//         const response = await getMyAddress();
//         // Return the data directly, following the same pattern as personalDetailsService
//         return response.data?.data || response.data;
//     } catch (err) {
//         console.error('Error fetching address details:', err);
//         throw err.response?.data || { message: 'Failed to retrieve address details' };
//     }
// };

// export const handleSaveAddress = async (addressType, addressData) => {
//     try {
//         // First, check if the address exists
//         const checkResponse = await checkAddressExists(addressType);
//         const addressExists = checkResponse.data;

//         if (addressExists) {
//             // Address exists, update it
//             const response = await updateAddressByType(addressType, addressData);
//             return response.data;
//         } else {
//             // Address doesn't exist, create it
//             // Add employee_id to the request if it's not already present
//             const createData = {
//                 employee_id: addressData.employee_id || "string", // You may need to get this from user context
//                 address_type: addressType,
//                 address_line1: addressData.address_line1,
//                 address_line2: addressData.address_line2,
//                 city: addressData.city,
//                 state: addressData.state,
//                 postal_code: addressData.postal_code,
//                 country: addressData.country,
//                 is_current: addressData.is_current
//             };
            
//             const response = await createAddress(createData);
//             return response.data;
//         }
//     } catch (err) {
//         console.error(`Error saving ${addressType} address:`, err);
//         throw err.response?.data || { message: `Failed to save ${addressType} address` };
//     }
// };

// // Legacy function for backward compatibility - now uses the new logic
// export const updateAddress = async (addressType, addressData) => {
//     return handleSaveAddress(addressType, addressData);
// };

// // Helper function to organize address data by type
// export const organizeAddressByType = (addressArray) => {
//     const organized = {
//         permanent: null,
//         current: null,
//         work: null
//     };

//     if (Array.isArray(addressArray)) {
//         addressArray.forEach(address => {
//             if (address.address_type && organized.hasOwnProperty(address.address_type)) {
//                 organized[address.address_type] = address;
//             }
//         });
//     }

//     return organized;
// };


// src/services/addressService.js
import { getMyAddress, checkAddressExists, createAddress, updateAddressByType } from '../api/address';

export const handleGetMyAddress = async () => {
    try {
        const response = await getMyAddress();
        // Return the data directly, following the same pattern as personalDetailsService
        return response.data?.data || response.data;
    } catch (err) {
        console.error('Error fetching address details:', err);
        throw err.response?.data || { message: 'Failed to retrieve address details' };
    }
};

export const handleSaveAddress = async (addressType, addressData) => {
    try {
        console.log('Starting handleSaveAddress for type:', addressType);
        console.log('Input addressData:', addressData);
        
        // First, check if the address exists
        const checkResponse = await checkAddressExists(addressType);
        const addressExists = checkResponse.data;
        
        console.log('Address exists check result:', addressExists);

        if (addressExists) {
            // Address exists, update it
            // Prepare update data by excluding employee_id since it's not needed for updates
            const updateData = {
                address_type: addressType,
                address_line1: addressData.address_line1 || "",
                address_line2: addressData.address_line2 || "",
                city: addressData.city || "",
                state: addressData.state || "",
                postal_code: addressData.postal_code || "",
                country: addressData.country || "",
                is_current: Boolean(addressData.is_current)
            };
            
            console.log('About to UPDATE address with data:', updateData);
            console.log('Making PUT request to address type:', addressType);
            
            const response = await updateAddressByType(addressType, updateData);
            console.log('Update response received:', response);
            return response.data || response;
        } else {
            // Address doesn't exist, create it
            const createData = {
                employee_id: addressData.employee_id || "string",
                address_type: addressType,
                address_line1: addressData.address_line1 || "",
                address_line2: addressData.address_line2 || "",
                city: addressData.city || "",
                state: addressData.state || "",
                postal_code: addressData.postal_code || "",
                country: addressData.country || "",
                is_current: Boolean(addressData.is_current)
            };
            
            console.log('About to CREATE address with data:', createData);
            const response = await createAddress(createData);
            console.log('Create response received:', response);
            return response.data || response;
        }
    } catch (err) {
        console.error(`Error saving ${addressType} address:`, err);
        console.error('Full error object:', err);
        
        // Better error handling to see the actual API response
        if (err.response) {
            console.error('API Error Status:', err.response.status);
            console.error('API Error Data:', err.response.data);
            console.error('API Error Headers:', err.response.headers);
            throw err.response.data;
        }
        
        throw err.response?.data || { message: `Failed to save ${addressType} address: ${err.message}` };
    }
};

// Legacy function for backward compatibility - now uses the new logic
export const updateAddress = async (addressType, addressData) => {
    return handleSaveAddress(addressType, addressData);
};

// Helper function to organize address data by type
export const organizeAddressByType = (addressArray) => {
    const organized = {
        permanent: null,
        current: null,
        work: null
    };

    if (Array.isArray(addressArray)) {
        addressArray.forEach(address => {
            if (address.address_type && organized.hasOwnProperty(address.address_type)) {
                organized[address.address_type] = address;
            }
        });
    }

    return organized;
};