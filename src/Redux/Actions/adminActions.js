import axios from 'axios';
import { baseURL } from '../../../config';

export const adminLogin = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseURL}/api/admin/login`, credentials);
    dispatch({ type: 'ADMIN_LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'ADMIN_LOGIN_FAILURE', payload: error.response.data.message });
    throw new Error(error.response.data.message);  // Ensure error is propagated
  }
};

