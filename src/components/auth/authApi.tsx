/* eslint-disable no-async-promise-executor */
import {  UserDataI } from "../../models/Models";

export const createUser = (userData: UserDataI) => {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:3000/users', {
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
        const email = loginInfo.email;
        const password = loginInfo.password
        const response = await fetch('http://localhost:3000/users?email=' + email)
        const data = await response.json()
        if (data.length) {
            if (password === data[0].password) {
                resolve({ data: data[0] })
            } else {
                reject({ message: "please enter valid password" })
            }

        } else {
            reject({ message: 'user not found' })
        }

    })
}

