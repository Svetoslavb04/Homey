import { homeyAPI } from "../assets/js/APIs"
import { IAgencyData } from "../interfaces/IAgencyData"
import { IUserData } from "../interfaces/IUserData"

export const login = (email: string, password: string) => fetch(homeyAPI.login, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ email: email, password: password })
})
    .then(res => res.json())
    .catch(err => console.log(err))

export const logout = () => fetch(homeyAPI.logout, {
    method: 'GET',
    credentials: 'include'
})
    .then(res => res.json())
    .catch(err => console.log(err))

export const me = () => fetch(homeyAPI.me, {
    method: 'GET',
    credentials: 'include'
})
    .then(res => res.json())
    .catch(err => console.log(err))

export const registerUser = (userInfo: IUserData) => fetch(homeyAPI.registerUser, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(userInfo)
})
    .then(res => res.json())

export const registerAgency = (agencyInfo: IAgencyData) => fetch(homeyAPI.registerAgency, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(agencyInfo)
})
    .then(res => res.json())