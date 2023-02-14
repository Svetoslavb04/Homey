import { homeyAPI } from "../assets/js/APIs";
import IPropertyFilter from "../interfaces/IPropertyFilter";

export const getTop = (count: number) => fetch(`${homeyAPI.properties.getTop}?count=${count}`)
    .then(res => {
        if (!res.ok) {
            throw res.json()
        }

        return res.json()
    })

export const getFilteredData = (filter: IPropertyFilter) =>
    fetch(homeyAPI.properties.getFiltered, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filter)
    })
        .then(res => {
            if (!res.ok) {
                throw res.json()
            }

            return res.json()
        })

export const getById = (_id: string) =>
    fetch(`${homeyAPI.properties.getById}/${_id}`)
        .then(res => {
            if (!res.ok) {
                throw res.json()
            }

            return res.json()
        })

export const getMetaData = () =>
    fetch(`${homeyAPI.properties.getMetaData}?pageSize=6`)
        .then(res => {
            if (!res.ok) {
                throw res.json()
            }

            return res.json()
        })

export const create = (formData: FormData) =>
    fetch(homeyAPI.properties.create, {
        method: 'POST',
        credentials: 'include',
        body: formData
    })
        .then(res => {
            return res.json()
        })

export const edit = (id: string, formData: FormData) =>
    fetch(`${homeyAPI.properties.edit}/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData
    })
        .then(res => {
            return res.json()
        })