// // // import { configureStore } from '@reduxjs/toolkit';
// // // import authReducer from './reducers/authReducer';
// // // import profileReducer from './reducers/profileReducer';
// // // import rolesReducer from './reducers/rolesSlice';

// // // const store = configureStore({
// // //   reducer: {
// // //     auth: authReducer,
// // //     profile: profileReducer,
// // //     roles: rolesReducer,
// // //   },
// // //   devTools: process.env.NODE_ENV !== 'production',
// // // });

// // // export default store;

// // import { configureStore } from '@reduxjs/toolkit';
// // import authReducer from './reducers/authReducer';
// // import profileReducer from './reducers/profileReducer';
// // import rolesReducer from './reducers/rolesSlice';

// // const store = configureStore({
// //   reducer: {
// //     auth: authReducer,
// //     profile: profileReducer,
// //     roles: rolesReducer,
// //   },
// //   devTools: process.env.NODE_ENV !== 'production',
// // });

// // export default store;



// // src/store/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import authReducer from './reducers/authReducer';
// import profileReducer from './reducers/profileReducer';
// import rolesReducer from './reducers/rolesSlice';

// // Configuration for redux-persist
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['auth'], // Only persist the 'auth' slice of the state
// };

// const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// const store = configureStore({
//   reducer: {
//     auth: persistedAuthReducer,
//     profile: profileReducer,
//     roles: rolesReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // Prevents Redux-Toolkit from flagging the actions of redux-persist
//     }),
//   devTools: process.env.NODE_ENV !== 'production',
// });

// export const persistor = persistStore(store);
// export default store;



import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authReducer from './reducers/authReducer';
import profileReducer from './reducers/profileReducer';
import rolesReducer from './reducers/rolesSlice';

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist the 'auth' slice of the state
};

// Create a persisted reducer for the auth slice
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    profile: profileReducer,
    roles: rolesReducer,
  },
  // Add middleware to prevent Redux-Toolkit from flagging persistence actions as non-serializable
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create a persistor object to rehydrate the store
export const persistor = persistStore(store);
export default store;