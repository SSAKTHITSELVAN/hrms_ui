// // src/store/reducers/authReducer.js
// import { createSlice } from '@reduxjs/toolkit';

// const token = localStorage.getItem('token') || null;

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     token,
//     isAuthenticated: !!token,
//     loading: false,
//     error: null,
//     hasPersonalDetails: localStorage.getItem('has_personal_details') === 'true',
//     roleData: localStorage.getItem('role_data')
//       ? JSON.parse(localStorage.getItem('role_data'))
//       : null,
//   },
//   reducers: {
//     loginStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     loginSuccess: (state, action) => {
//       state.loading = false;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//       state.hasPersonalDetails = action.payload.hasPersonalDetails;
//       state.roleData = action.payload.roleData || state.roleData;
//       state.error = null;
//     },
//     loginFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.isAuthenticated = false;
//       state.loading = false;
//       state.error = null;
//       state.hasPersonalDetails = false;
//       state.roleData = null;
//     },
//     rehydrateAuth: (state) => {
//       const token = localStorage.getItem('token');
//       const roleData = localStorage.getItem('role_data');
//       const hasPersonalDetails = localStorage.getItem('has_personal_details') === 'true';
//       state.token = token;
//       state.isAuthenticated = !!token;
//       state.roleData = roleData ? JSON.parse(roleData) : null;
//       state.hasPersonalDetails = hasPersonalDetails;
//     },
//   },
// });

// export const { loginStart, loginSuccess, loginFailure, logout, rehydrateAuth } =
//   authSlice.actions;
// export default authSlice.reducer;





// src/store/reducers/authReducer.js
import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token') || null;
const roleData = localStorage.getItem('role_data')
  ? JSON.parse(localStorage.getItem('role_data'))
  : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token,
    isAuthenticated: !!token,
    loading: false,
    error: null,
    hasPersonalDetails: localStorage.getItem('has_personal_details') === 'true',
    roleData, // store role here too
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const payload = action.payload;

      state.loading = false;
      state.token = payload.token;
      state.isAuthenticated = true;
      state.hasPersonalDetails = payload.hasPersonalDetails || false;

      // full role object (all can_* fields + metadata)
      const roleObject = { ...payload };

      // store in state + localStorage
      state.roleData = roleObject;
      localStorage.setItem('token', payload.token);
      localStorage.setItem('role_data', JSON.stringify(roleObject));
      localStorage.setItem('has_personal_details', state.hasPersonalDetails);

      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.hasPersonalDetails = false;
      state.roleData = null;
      localStorage.removeItem('token');
      localStorage.removeItem('role_data');
      localStorage.removeItem('has_personal_details');
    },
    rehydrateAuth: (state) => {
      const token = localStorage.getItem('token');
      const roleData = localStorage.getItem('role_data');
      const hasPersonalDetails = localStorage.getItem('has_personal_details') === 'true';

      state.token = token;
      state.isAuthenticated = !!token;
      state.roleData = roleData ? JSON.parse(roleData) : null;
      state.hasPersonalDetails = hasPersonalDetails;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, rehydrateAuth } =
  authSlice.actions;
export default authSlice.reducer;
