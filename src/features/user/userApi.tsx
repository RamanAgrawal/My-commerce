/* eslint-disable no-async-promise-executor */
import axios from "axios"
import { AuthResI } from "../../models/Models"

export const fetchLoggedInUserOrder=(userID:string)=>{
    return new Promise(async(resolve)=>{
        const response=await axios('http://localhost:3000/order/?user.id='+userID)
        const data=await response.data
        resolve({data})
        console.log(data);
        
    })
}
export const fetchLoggedInUser=(userID:string)=>{
    return new Promise(async(resolve)=>{
        const response=await axios('http://localhost:3000/users/'+userID)
        const data=await response.data
        resolve({data})
        console.log(data);
        
    })
}
export const updateUser = (update: AuthResI) => {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:3000/users/' + update.id, {
            method: "PATCH",
            body: JSON.stringify(update),
            headers: { "content-type": "application/json" }
        })
        const data = await response.json()
        resolve({ data })
    })
}