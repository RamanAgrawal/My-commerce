
import axios from "../../axiosConfig"
import { UserDataI } from "../../models/Models";


export const createUser = async (userData:UserDataI) => {
  try {
    const response = await axios.post('/api/auth/signup', userData, {
      withCredentials: true, // To include cookies in the request
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error; // You can choose to handle or rethrow the error here
  }
};



export const loginUser = async (loginInfo:UserDataI) => {
  try {
    const response = await axios.post('/api/auth/login', loginInfo, {
      withCredentials: true, // To include cookies in the request
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    
    if (response.status === 200) {
      console.log(response.data);
      return response;
    } else {
      // If the response status is not 200 (OK), handle the error.
      throw new Error('Request failed with status: ' + response.status);
    }
  } catch (error) {
    console.error(error);
    throw error; // You can choose to handle or rethrow the error here
  }
};





export const checkAuth = async () => {
  try {
    const response = await axios.get('/auth/check', {
      withCredentials: true, // To include cookies in the request
    });

    if (response.status === 200) {
      return response;
    } else {
      // If the response status is not 200 (OK), handle the error.
      throw new Error('Request failed with status: ' + response.status);
    }
  } catch (error) {
    console.error(error);
    throw error; // You can choose to handle or rethrow the error here
  }
};

export const signOut = async () => {
  try {
    const response = await axios.get('/api/auth/logout');

    if (response.status === 200) {
      return 'success';
    } else {
      // If the response status is not 200 (OK), handle the error.
      throw new Error('Request failed with status: ' + response.status);
    }
  } catch (error) {
    console.error(error);
    throw error; // You can choose to handle or rethrow the error here
  }
};