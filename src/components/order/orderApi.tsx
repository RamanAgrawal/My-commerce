import { Order } from "./OrderSlice"

export const  createOrder=(order:Order)=>{
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