// // // // // // // src/store/reducers/authReducer.js
// // // // // // import { createSlice } from '@reduxjs/toolkit';

// // // // // // const token = localStorage.getItem('token') || null;

// // // // // // const authSlice = createSlice({
// // // // // //   name: 'auth',
// // // // // //   initialState: {
// // // // // //     token,
// // // // // //     isAuthenticated: !!token,
// // // // // //     loading: false,
// // // // // //     error: null,
// // // // // //     hasPersonalDetails: localStorage.getItem('has_personal_details') === 'true',
// // // // // //     roleData: localStorage.getItem('role_data')
// // // // // //       ? JSON.parse(localStorage.getItem('role_data'))
// // // // // //       : null,
// // // // // //   },
// // // // // //   reducers: {
// // // // // //     loginStart: (state) => {
// // // // // //       state.loading = true;
// // // // // //       state.error = null;
// // // // // //     },
// // // // // //     loginSuccess: (state, action) => {
// // // // // //       state.loading = false;
// // // // // //       state.token = action.payload.token;
// // // // // //       state.isAuthenticated = true;
// // // // // //       state.hasPersonalDetails = action.payload.hasPersonalDetails;
// // // // // //       state.roleData = action.payload.roleData || state.roleData;
// // // // // //       state.error = null;
// // // // // //     },
// // // // // //     loginFailure: (state, action) => {
// // // // // //       state.loading = false;
// // // // // //       state.error = action.payload;
// // // // // //     },
// // // // // //     logout: (state) => {
// // // // // //       state.token = null;
// // // // // //       state.isAuthenticated = false;
// // // // // //       state.loading = false;
// // // // // //       state.error = null;
// // // // // //       state.hasPersonalDetails = false;
// // // // // //       state.roleData = null;
// // // // // //     },
// // // // // //     rehydrateAuth: (state) => {
// // // // // //       const token = localStorage.getItem('token');
// // // // // //       const roleData = localStorage.getItem('role_data');
// // // // // //       const hasPersonalDetails = localStorage.getItem('has_personal_details') === 'true';
// // // // // //       state.token = token;
// // // // // //       state.isAuthenticated = !!token;
// // // // // //       state.roleData = roleData ? JSON.parse(roleData) : null;
// // // // // //       state.hasPersonalDetails = hasPersonalDetails;
// // // // // //     },
// // // // // //   },
// // // // // // });

// // // // // // export const { loginStart, loginSuccess, loginFailure, logout, rehydrateAuth } =
// // // // // //   authSlice.actions;
// // // // // // export default authSlice.reducer;





// // // // // // src/store/reducers/authReducer.js
// // // // // import { createSlice } from '@reduxjs/toolkit';

// // // // // const token = localStorage.getItem('token') || null;
// // // // // const roleData = localStorage.getItem('role_data')
// // // // //   ? JSON.parse(localStorage.getItem('role_data'))
// // // // //   : null;

// // // // // const authSlice = createSlice({
// // // // //   name: 'auth',
// // // // //   initialState: {
// // // // //     token,
// // // // //     isAuthenticated: !!token,
// // // // //     loading: false,
// // // // //     error: null,
// // // // //     hasPersonalDetails: localStorage.getItem('has_personal_details') === 'true',
// // // // //     roleData, // store role here too
// // // // //   },
// // // // //   reducers: {
// // // // //     loginStart: (state) => {
// // // // //       state.loading = true;
// // // // //       state.error = null;
// // // // //     },
// // // // //     loginSuccess: (state, action) => {
// // // // //       const payload = action.payload;

// // // // //       state.loading = false;
// // // // //       state.token = payload.token;
// // // // //       state.isAuthenticated = true;
// // // // //       state.hasPersonalDetails = payload.hasPersonalDetails || false;

// // // // //       // full role object (all can_* fields + metadata)
// // // // //       const roleObject = { ...payload };

// // // // //       // store in state + localStorage
// // // // //       state.roleData = roleObject;
// // // // //       localStorage.setItem('token', payload.token);
// // // // //       localStorage.setItem('role_data', JSON.stringify(roleObject));
// // // // //       localStorage.setItem('has_personal_details', state.hasPersonalDetails);

// // // // //       state.error = null;
// // // // //     },
// // // // //     loginFailure: (state, action) => {
// // // // //       state.loading = false;
// // // // //       state.error = action.payload;
// // // // //     },
// // // // //     logout: (state) => {
// // // // //       state.token = null;
// // // // //       state.isAuthenticated = false;
// // // // //       state.loading = false;
// // // // //       state.error = null;
// // // // //       state.hasPersonalDetails = false;
// // // // //       state.roleData = null;
// // // // //       localStorage.removeItem('token');
// // // // //       localStorage.removeItem('role_data');
// // // // //       localStorage.removeItem('has_personal_details');
// // // // //     },
// // // // //     rehydrateAuth: (state) => {
// // // // //       const token = localStorage.getItem('token');
// // // // //       const roleData = localStorage.getItem('role_data');
// // // // //       const hasPersonalDetails = localStorage.getItem('has_personal_details') === 'true';

// // // // //       state.token = token;
// // // // //       state.isAuthenticated = !!token;
// // // // //       state.roleData = roleData ? JSON.parse(roleData) : null;
// // // // //       state.hasPersonalDetails = hasPersonalDetails;
// // // // //     },
// // // // //   },
// // // // // });

// // // // // export const { loginStart, loginSuccess, loginFailure, logout, rehydrateAuth } =
// // // // //   authSlice.actions;
// // // // // export default authSlice.reducer;




// // // // // // src/store/reducers/authReducer.js
// // // // // import { createSlice } from '@reduxjs/toolkit';

// // // // // const token = localStorage.getItem('token') || null;
// // // // // const roleData = localStorage.getItem('role_data')
// // // // //   ? JSON.parse(localStorage.getItem('role_data'))
// // // // //   : null;

// // // // // const authSlice = createSlice({
// // // // //   name: 'auth',
// // // // //   initialState: {
// // // // //     token,
// // // // //     isAuthenticated: !!token,
// // // // //     loading: false,
// // // // //     error: null,
// // // // //     hasPersonalDetails: localStorage.getItem('has_personal_details') === 'true',
// // // // //     roleData,
// // // // //   },
// // // // //   reducers: {
// // // // //     loginStart: (state) => {
// // // // //       state.loading = true;
// // // // //       state.error = null;
// // // // //     },
// // // // //     loginSuccess: (state, action) => {
// // // // //       const { token, hasPersonalDetails, roleData } = action.payload;

// // // // //       state.loading = false;
// // // // //       state.token = token;
// // // // //       state.isAuthenticated = true;
// // // // //       state.hasPersonalDetails = hasPersonalDetails || false;

// // // // //       // Correctly extract and store roleData from the payload
// // // // //       state.roleData = roleData;
      
// // // // //       // Persist to localStorage
// // // // //       localStorage.setItem('token', token);
// // // // //       localStorage.setItem('role_data', JSON.stringify(roleData));
// // // // //       localStorage.setItem('has_personal_details', state.hasPersonalDetails);

// // // // //       state.error = null;
// // // // //     },
// // // // //     loginFailure: (state, action) => {
// // // // //       state.loading = false;
// // // // //       state.error = action.payload;
// // // // //     },
// // // // //     logout: (state) => {
// // // // //       state.token = null;
// // // // //       state.isAuthenticated = false;
// // // // //       state.loading = false;
// // // // //       state.error = null;
// // // // //       state.hasPersonalDetails = false;
// // // // //       state.roleData = null;
// // // // //       localStorage.removeItem('token');
// // // // //       localStorage.removeItem('role_data');
// // // // //       localStorage.removeItem('has_personal_details');
// // // // //     },
// // // // //     rehydrateAuth: (state) => {
// // // // //       const token = localStorage.getItem('token');
// // // // //       const roleData = localStorage.getItem('role_data');
// // // // //       const hasPersonalDetails = localStorage.getItem('has_personal_details') === 'true';

// // // // //       state.token = token;
// // // // //       state.isAuthenticated = !!token;
// // // // //       state.roleData = roleData ? JSON.parse(roleData) : null;
// // // // //       state.hasPersonalDetails = hasPersonalDetails;
// // // // //     },
// // // // //   },
// // // // // });

// // // // // export const { loginStart, loginSuccess, loginFailure, logout, rehydrateAuth } =
// // // // //   authSlice.actions;
// // // // // export default authSlice.reducer;

// // // // import { createSlice } from '@reduxjs/toolkit';

// // // // function safeParse(key) {
// // // //   try {
// // // //     const raw = localStorage.getItem(key);
// // // //     if (!raw || raw === 'undefined') return null;
// // // //     return JSON.parse(raw);
// // // //   } catch (e) {
// // // //     console.warn(`Failed to parse ${key}:`, e);
// // // //     return null;
// // // //   }
// // // // }

// // // // const token = localStorage.getItem('token') || null;
// // // // const roleData = safeParse('role_data');
// // // // const hasPersonalDetails = localStorage.getItem('has_personal_details') === 'true';

// // // // const authSlice = createSlice({
// // // //   name: 'auth',
// // // //   initialState: {
// // // //     token,
// // // //     isAuthenticated: !!token,
// // // //     loading: false,
// // // //     error: null,
// // // //     hasPersonalDetails,
// // // //     roleData,
// // // //   },
// // // //   reducers: {
// // // //     loginStart: (state) => {
// // // //       state.loading = true;
// // // //       state.error = null;
// // // //     },
// // // //     loginSuccess: (state, action) => {
// // // //       const { token, hasPersonalDetails, roleData } = action.payload;

// // // //       state.loading = false;
// // // //       state.token = token;
// // // //       state.isAuthenticated = true;
// // // //       state.hasPersonalDetails = hasPersonalDetails || false;
// // // //       state.roleData = roleData || null;

// // // //       localStorage.setItem('token', token);
// // // //       localStorage.setItem('has_personal_details', state.hasPersonalDetails.toString());
// // // //       try {
// // // //         localStorage.setItem('role_data', JSON.stringify(roleData));
// // // //       } catch (e) {
// // // //         console.error('Failed to persist role_data:', e);
// // // //       }
// // // //       state.error = null;
// // // //     },
// // // //     loginFailure: (state, action) => {
// // // //       state.loading = false;
// // // //       state.error = action.payload;
// // // //       state.token = null;
// // // //       state.isAuthenticated = false;
// // // //       state.hasPersonalDetails = false;
// // // //       state.roleData = null;
// // // //       localStorage.removeItem('token');
// // // //       localStorage.removeItem('role_data');
// // // //       localStorage.removeItem('has_personal_details');
// // // //     },
// // // //     logout: (state) => {
// // // //       state.token = null;
// // // //       state.isAuthenticated = false;
// // // //       state.loading = false;
// // // //       state.error = null;
// // // //       state.hasPersonalDetails = false;
// // // //       state.roleData = null;
// // // //       localStorage.removeItem('token');
// // // //       localStorage.removeItem('role_data');
// // // //       localStorage.removeItem('has_personal_details');
// // // //     },
// // // //     // ✅ NEW ACTION: Set hasPersonalDetails to true after form submission
// // // //     setHasPersonalDetails: (state) => {
// // // //       state.hasPersonalDetails = true;
// // // //       localStorage.setItem('has_personal_details', 'true');
// // // //     },
// // // //   },
// // // // });

// // // // export const { loginStart, loginSuccess, loginFailure, logout, setHasPersonalDetails } =
// // // //   authSlice.actions;
// // // // export default authSlice.reducer;


// // // import { createSlice } from '@reduxjs/toolkit';

// // // function safeParse(key) {
// // //   try {
// // //     const raw = localStorage.getItem(key);
// // //     if (!raw || raw === 'undefined') return null;
// // //     return JSON.parse(raw);
// // //   } catch (e) {
// // //     console.warn(`Failed to parse ${key}:`, e);
// // //     return null;
// // //   }
// // // }

// // // const token = localStorage.getItem('token') || null;
// // // const roleData = safeParse('role_data');
// // // const hasPersonalDetails = localStorage.getItem('has_personal_details') === 'true';

// // // const authSlice = createSlice({
// // //   name: 'auth',
// // //   initialState: {
// // //     token,
// // //     isAuthenticated: !!token,
// // //     loading: false,
// // //     error: null,
// // //     hasPersonalDetails,
// // //     roleData,
// // //   },
// // //   reducers: {
// // //     loginStart: (state) => {
// // //       state.loading = true;
// // //       state.error = null;
// // //     },
// // //     loginSuccess: (state, action) => {
// // //       const { token, hasPersonalDetails, roleData } = action.payload;

// // //       state.loading = false;
// // //       state.token = token;
// // //       state.isAuthenticated = true;
// // //       state.hasPersonalDetails = hasPersonalDetails || false;
// // //       state.roleData = roleData || null;

// // //       localStorage.setItem('token', token);
// // //       localStorage.setItem('has_personal_details', state.hasPersonalDetails.toString());
// // //       try {
// // //         localStorage.setItem('role_data', JSON.stringify(roleData));
// // //       } catch (e) {
// // //         console.error('Failed to persist role_data:', e);
// // //       }
// // //       state.error = null;
// // //     },
// // //     loginFailure: (state, action) => {
// // //       state.loading = false;
// // //       state.error = action.payload;
// // //       state.token = null;
// // //       state.isAuthenticated = false;
// // //       state.hasPersonalDetails = false;
// // //       state.roleData = null;
// // //       localStorage.removeItem('token');
// // //       localStorage.removeItem('role_data');
// // //       localStorage.removeItem('has_personal_details');
// // //     },
// // //     logout: (state) => {
// // //       state.token = null;
// // //       state.isAuthenticated = false;
// // //       state.loading = false;
// // //       state.error = null;
// // //       state.hasPersonalDetails = false;
// // //       state.roleData = null;
// // //       localStorage.removeItem('token');
// // //       localStorage.removeItem('role_data');
// // //       localStorage.removeItem('has_personal_details');
// // //     },
// // //     setHasPersonalDetails: (state) => {
// // //       state.hasPersonalDetails = true;
// // //       localStorage.setItem('has_personal_details', 'true');
// // //     },
// // //   },
// // // });

// // // export const { loginStart, loginSuccess, loginFailure, logout, setHasPersonalDetails } =
// // //   authSlice.actions;
// // // export default authSlice.reducer;


// // import { createSlice } from '@reduxjs/toolkit';

// // function safeParse(key) {
// //   try {
// //     const raw = localStorage.getItem(key);
// //     if (!raw || raw === 'undefined') return null;
// //     return JSON.parse(raw);
// //   } catch (e) {
// //     console.warn(`Failed to parse ${key}:`, e);
// //     return null;
// //   }
// // }

// // const token = localStorage.getItem('token') || null;
// // const roleData = safeParse('role_data');
// // const hasPersonalDetails = localStorage.getItem('has_personal_details') === 'true';

// // const authSlice = createSlice({
// //   name: 'auth',
// //   initialState: {
// //     token,
// //     isAuthenticated: !!token,
// //     loading: false,
// //     error: null,
// //     hasPersonalDetails,
// //     roleData,
// //   },
// //   reducers: {
// //     loginStart: (state) => {
// //       state.loading = true;
// //       state.error = null;
// //     },
// //     loginSuccess: (state, action) => {
// //       const { token, hasPersonalDetails, roleData } = action.payload;

// //       state.loading = false;
// //       state.token = token;
// //       state.isAuthenticated = true;
// //       state.hasPersonalDetails = hasPersonalDetails || false;
// //       state.roleData = roleData || null;

// //       localStorage.setItem('token', token);
// //       localStorage.setItem('has_personal_details', state.hasPersonalDetails.toString());
// //       try {
// //         localStorage.setItem('role_data', JSON.stringify(roleData));
// //       } catch (e) {
// //         console.error('Failed to persist role_data:', e);
// //       }
// //       state.error = null;
// //     },
// //     loginFailure: (state, action) => {
// //       state.loading = false;
// //       state.error = action.payload;
// //       state.token = null;
// //       state.isAuthenticated = false;
// //       state.hasPersonalDetails = false;
// //       state.roleData = null;
// //       localStorage.removeItem('token');
// //       localStorage.removeItem('role_data');
// //       localStorage.removeItem('has_personal_details');
// //     },
// //     logout: (state) => {
// //       state.token = null;
// //       state.isAuthenticated = false;
// //       state.loading = false;
// //       state.error = null;
// //       state.hasPersonalDetails = false;
// //       state.roleData = null;
// //       localStorage.removeItem('token');
// //       localStorage.removeItem('role_data');
// //       localStorage.removeItem('has_personal_details');
// //     },
// //     setHasPersonalDetails: (state) => {
// //       state.hasPersonalDetails = true;
// //       localStorage.setItem('has_personal_details', 'true');
// //     },
// //   },
// // });

// // export const { loginStart, loginSuccess, loginFailure, logout, setHasPersonalDetails } =
// //   authSlice.actions;
// // export default authSlice.reducer;


// // import { createSlice } from '@reduxjs/toolkit';

// // function safeParse(key) {
// //   try {
// //     const raw = localStorage.getItem(key);
// //     if (!raw || raw === 'undefined') return null;
// //     return JSON.parse(raw);
// //   } catch (e) {
// //     console.warn(`Failed to parse ${key}:`, e);
// //     return null;
// //   }
// // }

// // const token = localStorage.getItem('token') || null;
// // const roleData = safeParse('role_data');
// // const hasPersonalDetails = localStorage.getItem('has_personal_details') === 'true';

// // const authSlice = createSlice({
// //   name: 'auth',
// //   initialState: {
// //     token,
// //     isAuthenticated: !!token,
// //     loading: false,
// //     error: null,
// //     hasPersonalDetails,
// //     roleData,
// //   },
// //   reducers: {
// //     loginStart: (state) => {
// //       state.loading = true;
// //       state.error = null;
// //     },
// //     loginSuccess: (state, action) => {
// //       const { token, hasPersonalDetails, roleData } = action.payload;

// //       state.loading = false;
// //       state.token = token;
// //       state.isAuthenticated = true;
// //       state.hasPersonalDetails = hasPersonalDetails || false;
// //       state.roleData = roleData || null;

// //       localStorage.setItem('token', token);
// //       localStorage.setItem('has_personal_details', state.hasPersonalDetails.toString());
// //       try {
// //         localStorage.setItem('role_data', JSON.stringify(roleData));
// //       } catch (e) {
// //         console.error('Failed to persist role_data:', e);
// //       }
// //       state.error = null;
// //     },
// //     loginFailure: (state, action) => {
// //       state.loading = false;
// //       state.error = action.payload;
// //       state.token = null;
// //       state.isAuthenticated = false;
// //       state.hasPersonalDetails = false;
// //       state.roleData = null;
// //       localStorage.removeItem('token');
// //       localStorage.removeItem('role_data');
// //       localStorage.removeItem('has_personal_details');
// //     },
// //     logout: (state) => {
// //       state.token = null;
// //       state.isAuthenticated = false;
// //       state.loading = false;
// //       state.error = null;
// //       state.hasPersonalDetails = false;
// //       state.roleData = null;
// //       localStorage.removeItem('token');
// //       localStorage.removeItem('role_data');
// //       localStorage.removeItem('has_personal_details');
// //     },
// //     setHasPersonalDetails: (state) => {
// //       state.hasPersonalDetails = true;
// //       localStorage.setItem('has_personal_details', 'true');
// //     },
// //   },
// // });

// // export const { loginStart, loginSuccess, loginFailure, logout, setHasPersonalDetails } =
// //   authSlice.actions;
// // export default authSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     token: null,
//     isAuthenticated: false,
//     loading: false,
//     error: null,
//     hasPersonalDetails: false,
//     roleData: null,
//   },
//   reducers: {
//     loginStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     loginSuccess: (state, action) => {
//       const { token, hasPersonalDetails, roleData } = action.payload;

//       state.loading = false;
//       state.token = token;
//       state.isAuthenticated = true;
//       state.hasPersonalDetails = hasPersonalDetails || false;
//       state.roleData = roleData || null;

//       state.error = null;
//     },
//     loginFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.hasPersonalDetails = false;
//       state.roleData = null;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.isAuthenticated = false;
//       state.loading = false;
//       state.error = null;
//       state.hasPersonalDetails = false;
//       state.roleData = null;
//     },
//     setHasPersonalDetails: (state) => {
//       state.hasPersonalDetails = true;
//     },
//   },
// });

// export const { loginStart, loginSuccess, loginFailure, logout, setHasPersonalDetails } =
//   authSlice.actions;
// export default authSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

// A helper function to safely parse JSON from localStorage
function safeParse(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw || raw === 'undefined') return null;
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`Failed to parse ${key}:`, e);
    return null;
  }
}

// Initial state, hydrating from localStorage on app load
const token = localStorage.getItem('token') || null;
const roleData = safeParse('role_data');
const hasPersonalDetails = localStorage.getItem('has_personal_details') === 'true';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token,
    isAuthenticated: !!token,
    loading: false,
    error: null,
    hasPersonalDetails,
    roleData,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { token, hasPersonalDetails, roleData } = action.payload;

      state.loading = false;
      state.token = token;
      state.isAuthenticated = true;
      state.hasPersonalDetails = hasPersonalDetails || false;
      state.roleData = roleData || null;

      // Persist to localStorage for manual access or as a backup
      localStorage.setItem('token', token);
      localStorage.setItem('has_personal_details', state.hasPersonalDetails.toString());
      try {
        localStorage.setItem('role_data', JSON.stringify(roleData));
      } catch (e) {
        console.error('Failed to persist role_data:', e);
      }
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.token = null;
      state.isAuthenticated = false;
      state.hasPersonalDetails = false;
      state.roleData = null;
      localStorage.removeItem('token');
      localStorage.removeItem('role_data');
      localStorage.removeItem('has_personal_details');
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
    setHasPersonalDetails: (state) => {
      state.hasPersonalDetails = true;
      localStorage.setItem('has_personal_details', 'true');
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setHasPersonalDetails } =
  authSlice.actions;
export default authSlice.reducer;