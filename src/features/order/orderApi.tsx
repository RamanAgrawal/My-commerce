/* eslint-disable no-async-promise-executor */
import { OrderI } from "../../models/Models"


export const  createOrder=(order:OrderI)=>{
    return new Promise(async(resolve) => {
        const responce=await fetch('http://localhost:3000/order',{
            method:'POST',
            body:JSON.stringify(order),
            headers:{"content-type":"application/json"}
        })
        const data=responce.json()
        resolve({data})
    })
}

// export const getOrder=()=>{

// }