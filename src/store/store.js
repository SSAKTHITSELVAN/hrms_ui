import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import profileReducer from './reducers/profileReducer';
import rolesReducer from './reducers/rolesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    roles: rolesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;