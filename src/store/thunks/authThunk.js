// src/store/thunks/authThunk.js
import { loginStart, loginSuccess, loginFailure } from '../reducers/authReducer';
import { setRoleData } from '../reducers/rolesSlice';
import axios from '../../api/axiosInstance';

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());

    // 1️⃣ Login
    const loginResponse = await axios.post('/api/v1/login', credentials);
    const { access_token } = loginResponse.data.data;

    // 2️⃣ Fetch role data
    const roleResponse = await axios.get('/api/v1/roles/my', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    // ✅ Flatten to only permissions
    const roleData = roleResponse.data.data;

    // 3️⃣ Check personal details
    const checkResponse = await axios.get('/api/v1/personal_details/employee/check', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const hasPersonalDetails = checkResponse.data.data;

    // 4️⃣ Update Redux and LocalStorage
    dispatch(
      loginSuccess({
        token: access_token,
        hasPersonalDetails,
        roleData, // ✅ flattened
      })
    );
    dispatch(setRoleData(roleData)); // ✅ menus now work

    return { success: true, hasPersonalDetails };
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Login failed';
    dispatch(loginFailure(message));
    return { success: false, message };
  }
};
