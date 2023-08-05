
export interface UserData{
email:string;
password:string
}

export const createUser=(userData:UserData)=>{
    return new Promise(async(resolve)=>{
        const response=await fetch('http://localhost:3000/auth',{
            method:"POST",
            body:JSON.stringify(userData),
            headers:{"content-type":"application/json"}
        })
        const data=await response.json()
        resolve({data})
    })
}