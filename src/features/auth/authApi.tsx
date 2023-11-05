/* eslint-disable no-async-promise-executor */
import { UserDataI } from "../../models/Models";

export const createUser = (userData: UserDataI) => {
    console.log(userData);
    
    return new Promise(async (resolve) => {
        const response = await fetch('/api/auth/signup', {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "content-type": "application/json" }
        })
        const data = await response.json()
        resolve({ data })
    })
}
export const loginUser = (loginInfo: UserDataI) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify(loginInfo),
                headers: { "content-type": "application/json" }

            })
            if (response.ok) {
                const data = await response.json()
                resolve({ data })
            } else {
                const error = await response.json()
                reject(error)
            }

        } catch (error) {
            reject(error)
        }
    })
}

export const checkAuth=()=> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/auth/check',{
            credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
  
    });
  }

export function signOut() {
    console.log("in signout");
    
    return new Promise(async (resolve,reject) => {
          try {
            const response = await fetch('/api/auth/logout');

            
            if (response.ok) {
              resolve({ data:'success' });
            } else {
              const error = await response.text();
              reject(error);
            }
          } catch (error) {
            console.log(error)
            reject( error );
          }

        resolve({ data: 'success' });
    });
}