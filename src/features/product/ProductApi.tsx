
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductDataI } from "../../models/Models";

import axios from "../../axiosConfig"


export const fetchSingleProduct = async (id:string) => {
  try {
    const response = await axios.get(`/api/products/${id}`, {
      withCredentials: true, // To include cookies in the request
    });

    if (response.status === 200) {
      return { data: response.data };
    } else {
      // If the response status is not 200 (OK), handle the error.
      throw new Error('Request failed with status: ' + response.status);
    }
  } catch (error) {
    console.error(error);
    throw error; // You can choose to handle or rethrow the error here
  }
};



export const createProduct = async (product:any) => {
  try {
    const response = await axios.post('/api/products', product, {
      withCredentials: true, // To include cookies in the request
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return { data: response.data };
    } else {
      // If the response status is not 200 (OK), handle the error.
      throw new Error('Request failed with status: ' + response.status);
    }
  } catch (error) {
    console.error(error);
    throw error; // You can choose to handle or rethrow the error here
  }
};




export const updateProduct = async (update:ProductDataI) => {
  try {
    const response = await axios.patch(`/api/products/${update.id}`, update, {
      withCredentials: true, // To include cookies in the request
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return  response;
    } else {
      // If the response status is not 200 (OK), handle the error.
      throw new Error('Request failed with status: ' + response.status);
    }
  } catch (error) {
    console.error(error);
    throw error; // You can choose to handle or rethrow the error here
  }
};


export const fetchCategories = async () => {
  try {
    const response = await axios.get('/api/categories', {
      withCredentials: true, // To include cookies in the request
    });

    if (response.status === 200) {
      return { data: response.data };
    } else {
      // If the response status is not 200 (OK), handle the error.
      throw new Error('Request failed with status: ' + response.status);
    }
  } catch (error) {
    console.error(error);
    throw error; // You can choose to handle or rethrow the error here
  }
};




export const fetchBrands = async () => {
  try {
    const response = await axios.get('/api/brands', {
      withCredentials: true, // To include cookies in the request
    });

    if (response.status === 200) {
      return { data: response.data };
    } else {
      // If the response status is not 200 (OK), handle the error.
      throw new Error('Request failed with status: ' + response.status);
    }
  } catch (error) {
    console.error(error);
    throw error; // You can choose to handle or rethrow the error here
  }
};

export interface Data {
  products: ProductDataI[]
  totalItems: string | null
}




export const fetchProductsByFilters = async (filter: any, sort: any, pagination: any ,admin:boolean) => {
  // Build the query string from the filter, sort, and pagination parameters
  const queryParams = {
    ...filter,
    ...sort,
    ...pagination,
  };

  if (admin) {
    queryParams.admin = admin;
  }

  try {
    // Use Axios to make the GET request with the query parameters
    const response = await axios.get('/api/products', {
      params: queryParams,
      withCredentials: true, // To include cookies in the request
    });

    if (response.status === 200) {
      // Extract the product data and total items from the response
      const productData = response.data;
      const totalItems = response.headers['x-total-count'];

      return { data: { products: productData, totalItems } };
    } else {
      // If the response status is not 200 (OK), handle the error.
      throw new Error('Request failed with status: ' + response.status);
    }
  } catch (error) {
    console.error(error);
    throw error; // You can choose to handle or rethrow the error here
  }
};






