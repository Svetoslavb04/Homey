import { homeyAPI } from "../assets/js/APIs"

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