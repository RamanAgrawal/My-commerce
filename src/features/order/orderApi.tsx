
import { OrderI, PaginationI, SortI, UpdateOrderI } from "../../models/Models"
import axios from '../../axiosConfig'


export const createOrder = async (order: OrderI) => {
  try {
    const response = await axios.post('/api/order', order, {
      headers: { 'Content-Type': 'application/json' },
    });

    return { data: response.data };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const updateOrder = async (order: UpdateOrderI) => {
  try {
    const response = await axios.patch(`/api/order/${order.id}`, order.status , {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    console.error("response",response);
    
    return { data: response.data };
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

export const fetchAllOrders = async (pagination: PaginationI, sort: SortI) => {
  try {
    const params = new URLSearchParams({ ...pagination, ...sort });
    const response = await axios.get(`/api/order?${params.toString()}`);

    const totalOrders = response.headers['x-total-count'];
    return { data: { orders: response.data, totalOrders } };
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
};

