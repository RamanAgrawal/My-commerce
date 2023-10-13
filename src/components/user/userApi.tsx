import axios from "axios"

export const fetchLoggedInUserOrder=(userID:number)=>{
    return new Promise(async(resolve)=>{
        const response=await axios('http://localhost:3000/order/?user.id='+userID)
        const data=await response.data
        resolve({data})
        console.log(data);
        
    })
}