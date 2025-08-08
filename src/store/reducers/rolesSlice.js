// src/store/reducers/rolesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    role: JSON.parse(localStorage.getItem('role_data')) || null,
  },
  reducers: {
    setRoleData: (state, action) => {
      state.role = action.payload;
      localStorage.setItem('role_data', JSON.stringify(action.payload)); // persist
    },
    clearRoleData: (state) => {
      state.role = null;
      localStorage.removeItem('role_data');
    },
  },
});


export const { setRoleData, clearRoleData } = rolesSlice.actions;
export default rolesSlice.reducer;
