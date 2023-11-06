import { AxiosResponse } from "axios";
import axios from "../../axiosConfig";
import { CartItemI, CartItemResI } from "../../models/Models";

export const addTocart = async (item: CartItemI) => {
  try {
    const response = await axios.post('/api/cart', item, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });

    const data = response;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const fetchCartItems = async () => {
  try {
    const response = await axios.get('/api/cart', { withCredentials: true });
    const data = response;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const updatecart = async (update: Omit<CartItemResI, 'user' | 'product'>) => {
  try {
    const response = await axios.patch(`/api/cart/${update.id}`, update, {
      headers: { 'Content-Type': 'application/json' },
    });

    return response;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const deleteItemFromCart = async (itemId: string) => {
  try {
    const response = await axios.delete(`/api/cart/${itemId}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    await response;
    return { data: { id: itemId } };
  } catch (error) {
    console.error('Error deleting cart item:', error);
    throw error;
  }
};

export const resetCart = async () => {
  try {
    const response = await fetchCartItems() as AxiosResponse;
    const items = response.data;
    for (const item of items) {
      await deleteItemFromCart(item.id);
    }
    return { status: 'success' };
  } catch (error) {
    console.error('Error resetting cart:', error);
    throw error;
  }
};
