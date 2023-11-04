/* eslint-disable no-async-promise-executor */
import { AxiosResponse } from "axios";
import { CartItemI, CartItemResI } from "../../models/Models";

export const addTocart = (item: CartItemI) => {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:3000/cart', {
            method: "POST",
            body: JSON.stringify(item),
            headers: { "content-type": "application/json" }
        })
        const data = await response.json()
        resolve({ data })
    })
}
export const fetchCartItems = (userId: string) => {
    return new Promise(async (resolve) => {
        console.log(userId);
        
        const response = await fetch('http://localhost:3000/cart/' +userId)
        const data = await response.json()
        console.log(data);
        
        resolve({ data })
    })
}

export const updatecart = (update:Omit<CartItemResI,'user' | 'product'>) => {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:3000/cart/' + update.id, {
            method: "PATCH",
            body: JSON.stringify(update),
            headers: { "content-type": "application/json" }
        })
        const data = await response.json()


        resolve({ data })
    })
}
export const deleteItemFromCart = (itemId: string) => {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:3000/cart/' + itemId, {
            method: "DELETE",
            headers: { "content-type": "application/json" }
        })
        await response.json();
        resolve({ data: { id: itemId } })
    })
}

export const resetCart = (userID: string) => {
    // console.log("in cart api", userID);

    return new Promise(async (resolve) => {
        const response = await fetchCartItems(userID) as AxiosResponse
        const items = response.data
        for (const item of items) {
            await deleteItemFromCart(item.id)
        }
        resolve({ status: 'success' })
    })
}
