/* eslint-disable no-async-promise-executor */
import axios from "axios"
import { AuthResI } from "../../models/Models"

export const fetchLoggedInUserOrder=()=>{
    return new Promise(async(resolve)=>{
        const response=await axios('http://localhost:3000/order')
        const data=await response.data
        resolve({data})
        console.log(data);
        
    })
}
export const fetchLoggedInUser=()=>{
    return new Promise(async(resolve)=>{
        const response=await fetch('http://localhost:3000/users/own',{
            credentials: 'include',
        })
        const data=await response.json()
        resolve({data})
        console.log(data);
        
    })
}
export const updateUser = (update: AuthResI) => {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:3000/users' ,{
            method: "PATCH",
            credentials: 'include',
            body: JSON.stringify(update),
            headers: { "content-type": "application/json" }
        })
        const data = await response.json()
        resolve({ data })
    })
}