import { createCompany, MyCompanyData } from '../api/company';

export const handleCreateCompany = async (data) => {
    try {
    const response = await createCompany(data);
    return response.data;
    } catch (err) {
    throw err.response?.data || { message: 'Company creation failed' };
    }
};


export const handleGetCompanyData = async () => {
    try {
        const response = await MyCompanyData();

        return response.data; // return the full response
        // Or: return response.data.data; // if you want only the company details
    } catch (err) {
        throw err.response?.data || { message: 'Failed to retrieve company data' };
    }
};
