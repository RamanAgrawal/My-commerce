import { CartItem } from "./CartSlice"

export const addTocart=(item:CartItem)=>{
    console.log(item);
    
    return new Promise(async(resolve)=>{
        const response=await fetch('http://localhost:3000/cart',{
            method:"POST",
            body:JSON.stringify(item),
            headers:{"content-type":"application/json"}
        })  
        const data=await response.json()
        console.log(data);
        
        resolve({data})
    })
}
export const fetchCartItems=(userId:number)=>{
    return new Promise(async(resolve)=>{
        const response=await fetch('http://localhost:3000/cart?user='+userId)
        const data=await response.json()
        console.log(data);
        
        resolve({data})
    })
}

export const updatecart=(update:CartItem)=>{
    console.log(update);
    
    return new Promise(async(resolve)=>{
        const response=await fetch('http://localhost:3000/cart/'+update.id,{
            method:"PATCH",
            body:JSON.stringify(update),
            headers:{"content-type":"application/json"}
        })  
        const data=await response.json()
        console.log(data);
        
        resolve({data})
    })
}
export const deleteItemFromCart=(itemId:number)=>{
    console.log("in api id: ",itemId);
    
    return new Promise(async(resolve)=>{
        const response=await fetch('http://localhost:3000/cart/'+itemId,{
            method:"DELETE",
            headers:{"content-type":"application/json"}
        })
        const data=await response.json()
        console.log(data);
        
        resolve({data:{id:itemId}})
    })
}