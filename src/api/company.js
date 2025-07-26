import axios from './axiosInstance';

export const createCompany = (data) => {
    // Token NOT needed here
    return axios.post('/api/v1/companies', data);
};

export const MyCompanyData = async () => {
    const access_token = localStorage.getItem('token');

    try {
        const response = await axios.get('/api/v1/companies/my', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        return response.data; // Return the full response data object

    } catch (err) {
        throw err.response || { message: 'Failed to retrieve company data' };
    }
};

