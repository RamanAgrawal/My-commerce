
export interface UserData{
email:string;
password:string
}

export const createUser=(userData:UserData)=>{
    return new Promise(async(resolve)=>{
        const response=await fetch('http://localhost:3000/users',{
            method:"POST",
            body:JSON.stringify(userData),
            headers:{"content-type":"application/json"}
        })
        const data=await response.json()
        resolve({data})
    })
}
export const checkUser=(loginInfo:UserData)=>{
    return new Promise(async(resolve,reject)=>{
        const email=loginInfo.email;
        const password=loginInfo.password
        const response=await fetch('http://localhost:3000/users?email='+email)
        const data=await response.json()
        if(data.length){
            if(password===data[0].password){
                resolve({data:data[0]})
            }else{
                reject({message:"please enter valid password"})
            }
            
        }else{
            reject({message:'user not found'})
        }
        
    })
}