/* eslint-disable no-async-promise-executor */
import { UserDataI } from "../../models/Models";

export const createUser = (userData: UserDataI) => {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "content-type": "application/json" }
        })
        const data = await response.json()
        resolve({ data })
    })
}
export const checkUser = (loginInfo: UserDataI) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: "POST",
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

export function signOut() {
    return new Promise(async (resolve) => {
        //   try {
        //     const response = await fetch('/auth/logout');
        //     if (response.ok) {
        //       resolve({ data:'success' });
        //     } else {
        //       const error = await response.text();
        //       reject(error);
        //     }
        //   } catch (error) {
        //     console.log(error)
        //     reject( error );
        //   }

        resolve({ data: 'success' });
    });
}