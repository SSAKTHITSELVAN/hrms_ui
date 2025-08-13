// // // // // src/store/thunks/authThunk.js
// // // // import { loginStart, loginSuccess, loginFailure } from '../reducers/authReducer';
// // // // import { setRoleData } from '../reducers/rolesSlice';
// // // // import axios from '../../api/axiosInstance';

// // // // export const loginUser = (credentials) => async (dispatch) => {
// // // //   try {
// // // //     dispatch(loginStart());

// // // //     // 1️⃣ Login
// // // //     const loginResponse = await axios.post('/api/v1/login', credentials);
// // // //     const { access_token } = loginResponse.data.data;

// // // //     // 2️⃣ Fetch role data
// // // //     const roleResponse = await axios.get('/api/v1/roles/my', {
// // // //       headers: { Authorization: `Bearer ${access_token}` },
// // // //     });

// // // //     // ✅ Flatten to only permissions
// // // //     const roleData = roleResponse.data.data;

// // // //     // 3️⃣ Check personal details
// // // //     const checkResponse = await axios.get('/api/v1/personal_details/employee/check', {
// // // //       headers: { Authorization: `Bearer ${access_token}` },
// // // //     });
// // // //     const hasPersonalDetails = checkResponse.data.data;

// // // //     // 4️⃣ Update Redux and LocalStorage
// // // //     dispatch(
// // // //       loginSuccess({
// // // //         token: access_token,
// // // //         hasPersonalDetails,
// // // //         roleData, // ✅ flattened
// // // //       })
// // // //     );
// // // //     dispatch(setRoleData(roleData)); // ✅ menus now work

// // // //     return { success: true, hasPersonalDetails };
// // // //   } catch (error) {
// // // //     const message = error.response?.data?.message || error.message || 'Login failed';
// // // //     dispatch(loginFailure(message));
// // // //     return { success: false, message };
// // // //   }
// // // // };


// // // // import { loginStart, loginSuccess, loginFailure } from '../reducers/authReducer';
// // // // import { setRoleData, clearRoleData } from '../reducers/rolesSlice';
// // // // import axios from '../../api/axiosInstance';

// // // // export const loginUser = (credentials) => async (dispatch) => {
// // // //   try {
// // // //     dispatch(loginStart());

// // // //     // 1️⃣ Login
// // // //     const loginResponse = await axios.post('/api/v1/login', credentials);
// // // //     const { access_token } = loginResponse.data.data;

// // // //     // 2️⃣ Fetch role data
// // // //     const roleResponse = await axios.get('/api/v1/roles/my', {
// // // //       headers: { Authorization: `Bearer ${access_token}` },
// // // //     });
// // // //     const roleData = roleResponse.data.data;

// // // //     // 3️⃣ Check personal details
// // // //     const checkResponse = await axios.get('/api/v1/personal_details/employee/check', {
// // // //       headers: { Authorization: `Bearer ${access_token}` },
// // // //     });
// // // //     const hasPersonalDetails = checkResponse.data.data;

// // // //     // 4️⃣ Update Redux stores and localStorage
// // // //     dispatch(
// // // //       loginSuccess({
// // // //         token: access_token,
// // // //         hasPersonalDetails,
// // // //       })
// // // //     );
// // // //     dispatch(setRoleData(roleData));

// // // //     return { success: true, hasPersonalDetails };
// // // //   } catch (error) {
// // // //     const message = error.response?.data?.message || error.message || 'Login failed';
// // // //     dispatch(loginFailure(message));
// // // //     dispatch(clearRoleData());
// // // //     return { success: false, message };
// // // //   }
// // // // };

// // // import { createAsyncThunk } from '@reduxjs/toolkit';
// // // import { loginStart, loginSuccess, loginFailure } from '../reducers/authReducer';
// // // import { setRoleData, clearRoleData } from '../reducers/rolesSlice';
// // // import axios from '../../api/axiosInstance';

// // // export const loginUser = createAsyncThunk(
// // //   'auth/loginUser',
// // //   async (credentials, { dispatch, rejectWithValue }) => {
// // //     try {
// // //       const loginResponse = await axios.post('/api/v1/login', credentials);
// // //       const { access_token } = loginResponse.data.data;

// // //       const roleResponse = await axios.get('/api/v1/roles/my', {
// // //         headers: { Authorization: `Bearer ${access_token}` },
// // //       });
// // //       const roleData = roleResponse.data.data;

// // //       const checkResponse = await axios.get('/api/v1/personal_details/employee/check', {
// // //         headers: { Authorization: `Bearer ${access_token}` },
// // //       });
// // //       const hasPersonalDetails = checkResponse.data.data;

// // //       dispatch(loginSuccess({
// // //         token: access_token,
// // //         hasPersonalDetails,
// // //         roleData,
// // //       }));

// // //       dispatch(setRoleData(roleData));

// // //       return { token: access_token, hasPersonalDetails, roleData };
// // //     } catch (error) {
// // //       const message = error.response?.data?.message || error.message || 'Login failed';
// // //       dispatch(loginFailure(message));
// // //       dispatch(clearRoleData());
// // //       return rejectWithValue(message);
// // //     }
// // //   }
// // // );

// // import { createAsyncThunk } from '@reduxjs/toolkit';
// // import { loginSuccess, loginFailure } from '../reducers/authReducer';
// // import axios from '../../api/axiosInstance';

// // export const loginUser = createAsyncThunk(
// //   'auth/loginUser',
// //   async (credentials, { dispatch, rejectWithValue }) => {
// //     try {
// //       const loginResponse = await axios.post('/api/v1/login', credentials);
// //       const { access_token } = loginResponse.data.data;

// //       const roleResponse = await axios.get('/api/v1/roles/my', {
// //         headers: { Authorization: `Bearer ${access_token}` },
// //       });
// //       const roleData = roleResponse.data.data;

// //       const checkResponse = await axios.get('/api/v1/personal_details/employee/check', {
// //         headers: { Authorization: `Bearer ${access_token}` },
// //       });
// //       const hasPersonalDetails = checkResponse.data.data;

// //       // Dispatch loginSuccess with all user-specific data
// //       dispatch(loginSuccess({
// //         token: access_token,
// //         hasPersonalDetails,
// //         roleData,
// //       }));

// //       // No longer dispatch setRoleData to rolesSlice here.
// //       // The authReducer is the single source of truth for the logged-in user's data.
      
// //       return { token: access_token, hasPersonalDetails, roleData };
// //     } catch (error) {
// //       const message = error.response?.data?.message || error.message || 'Login failed';
// //       dispatch(loginFailure(message));
// //       return rejectWithValue(message);
// //     }
// //   }
// // );


// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { loginSuccess, loginFailure } from '../reducers/authReducer';
// import axios from '../../api/axiosInstance';

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (credentials, { dispatch, rejectWithValue }) => {
//     try {
//       const loginResponse = await axios.post('/api/v1/login', credentials);
//       const { access_token } = loginResponse.data.data;

//       const roleResponse = await axios.get('/api/v1/roles/my', {
//         headers: { Authorization: `Bearer ${access_token}` },
//       });
//       const roleData = roleResponse.data?.data ?? null;

//       const checkResponse = await axios.get('/api/v1/personal_details/employee/check', {
//         headers: { Authorization: `Bearer ${access_token}` },
//       });
//       const hasPersonalDetails = checkResponse.data.data;

//       dispatch(loginSuccess({
//         token: access_token,
//         hasPersonalDetails,
//         roleData,
//       }));
      
//       return { token: access_token, hasPersonalDetails, roleData };
//     } catch (error) {
//       const message = error.response?.data?.message || error.message || 'Login failed';
//       dispatch(loginFailure(message));
//       return rejectWithValue(message);
//     }
//   }
// );


import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginSuccess, loginFailure } from '../reducers/authReducer';
import { loginUserApi } from '../../services/authService'; // Use the corrected service file

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      // Call the cleaned-up service function to handle API logic
      const payload = await loginUserApi(credentials);

      dispatch(loginSuccess(payload));
      
      return payload;
    } catch (error) {
      const message = error.response?.data?.detail || error.message || 'Login failed';
      dispatch(loginFailure(message));
      return rejectWithValue(message);
    }
  }
);