/* eslint-disable no-async-promise-executor */
import { OrderI, PaginationI, SortI } from "../../models/Models"


export const createOrder = (order: OrderI) => {
    return new Promise(async (resolve) => {
        const responce = await fetch('http://localhost:3000/order', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: { "content-type": "application/json" }
        })
        const data = responce.json()
        resolve({ data })
    })
}

export const updateOrder = (order: OrderI) => {
    return new Promise(async (resolve) => {
        const responce = await fetch('http://localhost:3000/order/' +order.id, {
            method: 'PATCH',
            body: JSON.stringify(order),
            headers: { "content-type": "application/json" }
        })
        const data = responce.json()
        resolve({ data })
    })
}

export const fetchAllOrders = (pagination: PaginationI,sort:SortI) => {

    let queryString=''
    // Convert the object into a query string
     queryString += Object.entries(pagination)
        .map(([key, value]) => `${key}=${value}&`)
        .join('&');
        
     queryString += Object.entries(sort)
     .map(([key, value]) => `${key}=${value}`)
     .join('&');
     console.log(queryString);


    return new Promise(async (resolve) => {
        // TODO: we will not hard-code server URL here
        const response = await fetch('http://localhost:3000/order?' + queryString);
        const productData = await response.json();
        const totalOrders = await response.headers.get("X-Total-Count")
        console.log("ordersrsdfsdf", productData);
        
        resolve({ data: { orders: productData, totalOrders } });

    });
}

// export const getOrder=()=>{

// }