import React, { createContext, useContext, useReducer } from 'react';
import authReducer from '../store/reducers/authReducer'; // Import the reducer
import { loginStart, loginSuccess, loginFailure, logout } from '../store/reducers/authReducer';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoggedIn: !!localStorage.getItem('token'),
    hasPersonalDetails: localStorage.getItem('has_personal_details') === 'true',
    userToken: localStorage.getItem('token'),
    error: null,
    isLoading: false,
  });

  const value = { state, dispatch, loginStart, loginSuccess, loginFailure, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};