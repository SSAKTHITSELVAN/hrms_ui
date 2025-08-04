// src/store/reducers/profileReducer.js
import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    personalDetails: null,
    addressDetails: null,
    education: null,
    family: null,
    leave: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchProfileStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.personalDetails = action.payload.personalDetails;
      state.addressDetails = action.payload.addressDetails;
      state.education = action.payload.education; // Assuming API provides this
      state.family = action.payload.family;     // Assuming API provides this
      state.leave = action.payload.leave;       // Assuming API provides this
      state.error = null;
    },
    fetchProfileFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateProfileField: (state, action) => {
      const { cardName, field, value } = action.payload;
      if (state[cardName]) {
        state[cardName][field] = value;
      }
    },
    updatePersonalDetails: (state, action) => {
        state.personalDetails = { ...state.personalDetails, ...action.payload };
    },
    updateAddressDetails: (state, action) => {
        state.addressDetails = { ...state.addressDetails, ...action.payload };
    },
    updateEducationDetails: (state, action) => {
        state.education = { ...state.education, ...action.payload };
    },
    updateFamilyDetails: (state, action) => {
        state.family = { ...state.family, ...action.payload };
    },
    // Add more specific update actions if needed, e.g., updateLeaveDetails
  },
});

export const {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileField,
  updatePersonalDetails,
  updateAddressDetails,
  updateEducationDetails,
  updateFamilyDetails,
} = profileSlice.actions;

export default profileSlice.reducer;