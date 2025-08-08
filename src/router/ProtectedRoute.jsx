// import { Navigate } from 'react-router-dom';


// const ProtectedRoute = ({ children }) => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//     return <Navigate to="/login" replace />;
//     }

//     return children;
// };

// export default ProtectedRoute;


// import { Navigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { rehydrateAuth } from '../store/reducers/authReducer';

// const ProtectedRoute = ({ children }) => {
//   const dispatch = useDispatch();
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   useEffect(() => {
//     // ✅ Sync Redux with localStorage on refresh
//     dispatch(rehydrateAuth());
//   }, [dispatch]);

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { rehydrateAuth } from '../store/reducers/authReducer';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isAuthenticated, hasPersonalDetails } = useSelector((state) => state.auth);

  // ✅ Sync Redux with localStorage on refresh
  useEffect(() => {
    dispatch(rehydrateAuth());
  }, [dispatch]);

  // 1️⃣ If not authenticated → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ If logged in but missing personal details → redirect to personal-details
  if (!hasPersonalDetails && location.pathname !== '/personal-details') {
    return <Navigate to="/personal-details" replace />;
  }

  // 3️⃣ Authenticated → allow access
  return children;
};

export default ProtectedRoute;
