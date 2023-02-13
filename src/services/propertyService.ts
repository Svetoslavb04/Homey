import { homeyAPI } from "../assets/js/APIs";
console.log(homeyAPI.properties.getTop);

export const getTop = (count: number) => fetch(`${homeyAPI.properties.getTop}?count=${count}`)
    .then(res => {
        if (!res.ok) {
            throw res.json()
        }

        return res.json()
    })