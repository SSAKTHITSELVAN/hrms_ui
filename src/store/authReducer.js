// src/store/reducers/authReducer.js
import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const hasPersonalDetails = localStorage.getItem('has_personal_details');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!token, // Convert string to boolean
    hasPersonalDetails: hasPersonalDetails ? (hasPersonalDetails === 'true') : null, // Convert string to boolean or null
    userToken: token,
    error: null,
    isLoading: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.userToken = action.payload.token;
      state.hasPersonalDetails = action.payload.hasPersonalDetails;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.userToken = null;
      state.error = action.payload;
      state.hasPersonalDetails = null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userToken = null;
      state.hasPersonalDetails = null;
      state.error = null;
    },
    setHasPersonalDetails: (state, action) => {
      state.hasPersonalDetails = action.payload;
      localStorage.setItem('has_personal_details', action.payload); // Keep localStorage in sync
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setHasPersonalDetails } = authSlice.actions;

export default authSlice.reducer;