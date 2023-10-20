import { AxiosResponse } from "axios";
import { CartItemI } from "../../models/Models";

export const addTocart = (item: CartItemI) => {
    console.log(item);

    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:3000/cart', {
            method: "POST",
            body: JSON.stringify(item),
            headers: { "content-type": "application/json" }
        })
        const data = await response.json()
        console.log(data);

        resolve({ data })
    })
}
export const fetchCartItems = (userId: number) => {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:3000/cart?user=' + userId)
        const data = await response.json()
        console.log(data);

        resolve({ data })
    })
}

export const updatecart = (update: CartItemI) => {

    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:3000/cart/' + update.id, {
            method: "PATCH",
            body: JSON.stringify(update),
            headers: { "content-type": "application/json" }
        })
        const data = await response.json()
        console.log(data);

        resolve({ data })
    })
}
export const deleteItemFromCart = (itemId: number) => {
    // console.log("in api id: ", itemId);

    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:3000/cart/' + itemId, {
            method: "DELETE",
            headers: { "content-type": "application/json" }
        })
        const data = await response.json()
        console.log(data);

        resolve({ data: { id: itemId } })
    })
}

export const resetCart =  (userID: number) => {
    // console.log("in cart api", userID);
    
    return new Promise(async(resolve) => {
        const response = await fetchCartItems(userID) as AxiosResponse
        const items = response.data
        for (const item of items) {
            await deleteItemFromCart(item.id)
        }
        resolve({status:'success'})
    })
}
