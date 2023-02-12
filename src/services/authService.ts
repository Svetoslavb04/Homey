import { homeyAPI } from "../assets/js/APIs"

export const login = (email: string, password: string) => fetch(homeyAPI.login, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, password: password })
})
    .then(res => res.json())
    .catch(err => console.log(err))

