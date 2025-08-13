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



// // // src/store/reducers/rolesSlice.js
// // import { createSlice } from '@reduxjs/toolkit';

// // const rolesSlice = createSlice({
// //   name: 'roles',
// //   initialState: {
// //     role: JSON.parse(localStorage.getItem('role_data')) || null,
// //   },
// //   reducers: {
// //     setRoleData: (state, action) => {
// //       state.role = action.payload;
// //       localStorage.setItem('role_data', JSON.stringify(action.payload)); // persist
// //     },
// //     clearRoleData: (state) => {
// //       state.role = null;
// //       localStorage.removeItem('role_data');
// //     },
// //     rehydrateRoles: (state) => {
// //       const roleData = localStorage.getItem('role_data');
// //       state.role = roleData ? JSON.parse(roleData) : null;
// //     },
// //   },
// // });

// // export const { setRoleData, clearRoleData, rehydrateRoles } = rolesSlice.actions;
// // export default rolesSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';

// function safeParse(key) {
//   try {
//     const raw = localStorage.getItem(key);
//     if (!raw || raw === 'undefined') return null;
//     return JSON.parse(raw);
//   } catch (e) {
//     console.warn(`Failed to parse ${key}:`, e);
//     return null;
//   }
// }

// const rolesSlice = createSlice({
//   name: 'roles',
//   initialState: {
//     role: safeParse('role_data'),
//   },
//   reducers: {
//     setRoleData: (state, action) => {
//       state.role = action.payload;
//       try {
//         localStorage.setItem('role_data', JSON.stringify(action.payload));
//       } catch (e) {
//         console.error('Failed to persist role_data:', e);
//       }
//     },
//     clearRoleData: (state) => {
//       state.role = null;
//       localStorage.removeItem('role_data');
//     },
//   },
// });

// export const { setRoleData, clearRoleData } = rolesSlice.actions;
// export default rolesSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';

// const rolesSlice = createSlice({
//   name: 'roles',
//   initialState: {
//     rolesList: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setRolesList: (state, action) => {
//       state.rolesList = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     setRolesLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setRolesError: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//   },
// });

// export const { setRolesList, setRolesLoading, setRolesError } = rolesSlice.actions;
// export default rolesSlice.reducer;