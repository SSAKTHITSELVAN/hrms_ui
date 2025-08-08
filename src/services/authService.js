// // src/services/authService.js
// import { login } from '../api/auth';
// import axios from '../api/axiosInstance';

// export const loginUser = async (credentials) => {
//   try {
//     const response = await login(credentials);
//     const { access_token } = response.data.data;

//     // ✅ Clear the localStorage
//     localStorage.clear();

//     // ✅ Save to localStorage
//     localStorage.setItem('token', access_token);

//     // Step 3: Fetch role name from backend using role_id
//     const roleResponse = await axios.get(`/api/v1/roles/my`, {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     });
    
//     // ✅ Store the complete role response object
//     const roleData = roleResponse.data;
//     localStorage.setItem('role_data', JSON.stringify(roleData));

//     // Step 4: Check if user has personal details
//     const checkResponse = await axios.get('/api/v1/personal_details/employee/check', {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     });

//     // Store the check result - if false, user needs to fill personal details
//     const hasPersonalDetails = checkResponse.data.data;
//     localStorage.setItem('has_personal_details', hasPersonalDetails.toString());

//     return response.data;
//   } catch (err) {
//     throw err.response?.data || { message: 'Login failed' };
//   }
// };



// // src/services/authService.js
// import { login as loginApi } from '../api/auth';
// import axios from '../api/axiosInstance';
// import { loginStart, loginSuccess, loginFailure, logout } from '../store/reducers/authReducer';

// export const loginUser = async (dispatch, credentials) => {
//   dispatch(loginStart());
//   try {
//     // Step 1: Login
//     const response = await loginApi(credentials);
//     const { access_token } = response.data.data;

//     // Step 2: Store token & clean old keys
//     localStorage.setItem('token', access_token);

//     // Step 3: Fetch role data
//     const roleResponse = await axios.get(`/api/v1/roles/my`);
//     const roleData = roleResponse.data;
//     localStorage.setItem('role_data', JSON.stringify(roleData));

//     // Step 4: Check if personal details exist
//     const checkResponse = await axios.get('/api/v1/personal_details/employee/check');
//     const hasPersonalDetails = checkResponse.data.data;
//     localStorage.setItem('has_personal_details', hasPersonalDetails.toString());

//     // Step 5: Update Redux
//     dispatch(loginSuccess({ token: access_token, hasPersonalDetails }));

//     return { hasPersonalDetails };
//   } catch (err) {
//     const errorMsg = err.response?.data?.message || 'Login failed';
//     dispatch(loginFailure(errorMsg));
//     throw new Error(errorMsg);
//   }
// };

// export const logoutUser = (dispatch) => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('role_data');
//   localStorage.removeItem('has_personal_details');
//   dispatch(logout());
// };



// // src/services/authService.js
// import { login as loginApi } from '../api/auth';
// import axios from '../api/axiosInstance';
// import { loginStart, loginSuccess, loginFailure, logout } from '../store/reducers/authReducer';
// import { setRoleData } from '../store/reducers/rolesSlice';

// export const loginUser = async (dispatch, credentials) => {
//   dispatch(loginStart());
//   try {
//     // Step 1: Login
//     const response = await loginApi(credentials);
//     const { access_token } = response.data.data;

//     // Step 2: Store token
//     localStorage.setItem('token', access_token);

//     // Step 3: Fetch role data
//     const roleResponse = await axios.get(`/api/v1/roles/my`);
//     const roleData = roleResponse.data;
//     localStorage.setItem('role_data', JSON.stringify(roleData));

//     // Step 4: Check if personal details exist
//     const checkResponse = await axios.get('/api/v1/personal_details/employee/check');
//     const hasPersonalDetails = checkResponse.data.data;
//     localStorage.setItem('has_personal_details', hasPersonalDetails.toString());

//     // ✅ Step 5: Update Redux (auth + rolesSlice)
//     dispatch(
//       loginSuccess({
//         token: access_token,
//         hasPersonalDetails,
//         roleData, // ✅ store in auth slice
//       })
//     );
//     dispatch(setRoleData(roleData)); // ✅ store in roles slice for menu

//     return { success: true, hasPersonalDetails, ...roleData };
//   } catch (err) {
//     const errorMsg = err.response?.data?.message || 'Login failed';
//     dispatch(loginFailure(errorMsg));
//     throw new Error(errorMsg);
//   }
// };

// export const logoutUser = (dispatch) => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('role_data');
//   localStorage.removeItem('has_personal_details');
//   dispatch(logout());
// };




// src/services/authService.js
import axios from '../api/axiosInstance';

export const loginUserApi = async (credentials) => {
  // Step 1: Login
  const response = await axios.post('/api/v1/login', credentials);
  const { access_token } = response.data.data;

  // Step 2: Fetch role data
  const roleResponse = await axios.get('/api/v1/roles/my', {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  // Step 3: Check if personal details exist
  const checkResponse = await axios.get('/api/v1/personal_details/employee/check', {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return {
    token: access_token,
    roleData: roleResponse.data,          // full role object with can_* keys
    hasPersonalDetails: checkResponse.data.data,
  };
};
