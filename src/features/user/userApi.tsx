
import axios from '../../axiosConfig';
import { AuthResI } from '../../models/Models';

export const fetchLoggedInUserOrder = async () => {
  try {
    const response = await axios.get('/api/order/own');
    const data = response.data;

    return { data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchLoggedInUser = async () => {
  try {
    const response = await axios.get('/api/users/own', {
      withCredentials: true,
    });
    const data = response.data;

    return { data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (update: AuthResI) => {
  try {
    const response = await axios.patch('/api/users', update, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = response.data;
    return { data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
