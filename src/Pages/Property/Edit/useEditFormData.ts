import { Dispatch, useReducer } from "react";
import { PropertyStatus } from "../../../enums/PropertyStatus";
import { PropertyType } from "../../../enums/PropertyType";

export type PropertyFormData = {
    name: { error: boolean, value: string },
    country: { error: boolean, value: string },
    city: { error: boolean, value: string },
    street: { error: boolean, value: string },
    number?: { error: boolean, value: number },
    description: { error: boolean, value: string },
    size: { error: boolean, value: number },
    bedrooms: { error: boolean, value: number },
    bathrooms: { error: boolean, value: number },
    status: { error: boolean, value: PropertyStatus },
    type: { error: boolean, value: PropertyType },
    garages: { error: boolean, value: number },
    yearBuilt: { error: boolean, value: number },
    price: { error: boolean, value: number }
}

export const initialState: PropertyFormData = {
    name: { error: false, value: '' },
    country: { error: false, value: 'Bulgaria' },
    city: { error: false, value: '' },
    street: { error: false, value: '' },
    number: { error: false, value: 0 },
    description: { error: false, value: '' },
    size: { error: false, value: 0 },
    bedrooms: { error: false, value: 0 },
    bathrooms: { error: false, value: 0 },
    status: { error: false, value: PropertyStatus.for_sale },
    type: { error: false, value: PropertyType.house },
    garages: { error: false, value: 0 },
    yearBuilt: { error: false, value: 0 },
    price: { error: false, value: 0 }
}

export type Action = {
    type: string,
    payload: any
}

export enum ActionTypes {
    'CHANGE_COUNTRY' = 'CHANGE_COUNTRY',
    'CHANGE_CITY' = 'CHANGE_CITY',
    'VALIDATE_CITY' = 'VALIDATE_CITY',
    'CHANGE_STREET' = 'CHANGE_STREET',
    'VALIDATE_STREET' = 'VALIDATE_STREET',
    'CHANGE_NUMBER' = 'CHANGE_NUMBER',
    'VALIDATE_NUMBER' = 'VALIDATE_NUMBER',
    'CHANGE_TYPE' = 'CHANGE_TYPE',
    'CHANGE_STATUS' = 'CHANGE_STATUS',
    'CHANGE_NAME' = 'CHANGE_NAME',
    'VALIDATE_NAME' = 'VALIDATE_NAME',
    'CHANGE_YEARBUILT' = 'CHANGE_YEARBUILT',
    'VALIDATE_YEARBUILT' = 'VALIDATE_YEARBUILT',
    'CHANGE_PRICE' = 'CHANGE_PRICE',
    'VALIDATE_PRICE' = 'VALIDATE_PRICE',
    'CHANGE_SIZE' = 'CHNAGE_SIZE',
    'VALIDATE_SIZE' = 'VALIDATE_SIZE',
    'CHANGE_BEDROOMS' = 'CHNAGE_BEDROMS',
    'CHANGE_BATHROOMS' = 'CHNAGE_BATHROOMS',
    'CHANGE_GARAGES' = 'CHNAGE_GARAGES',
    'CHANGE_DESCRIPTION' = 'CHNAGE_DESCRIPTION',
    'VALIDATE_DESCRIPTION' = 'VALIDATE_DESCRIPTION'
}

const formDataReducer = (state: PropertyFormData, action: Action) => {

    switch (action.type) {
        case ActionTypes.CHANGE_COUNTRY:
            return { ...state, country: { error: state.country.error, value: action.payload.trimStart() || '' } }
        case ActionTypes.CHANGE_CITY:
            return { ...state, city: { error: state.city.error, value: action.payload.trimStart() || '' } }
        case ActionTypes.VALIDATE_CITY:
            if (action.payload.trim().length > 85 && action.payload.trim() !== '') {
                return { ...state, city: { error: true, value: action.payload?.trim() || '' } }
            } else {
                return { ...state, city: { error: false, value: action.payload?.trim() || '' } }
            }
        case ActionTypes.CHANGE_STREET:
            return { ...state, street: { error: state.street.error, value: action.payload.trimStart() || '' } }
        case ActionTypes.VALIDATE_STREET:
            if (action.payload.trim().length > 120 && action.payload.trim() !== '') {
                return { ...state, street: { error: true, value: action.payload?.trim() || '' } }
            } else {
                return { ...state, street: { error: false, value: action.payload?.trim() || '' } }
            }
        case ActionTypes.CHANGE_NUMBER:
            return { ...state, number: { error: state.number?.error || false, value: action.payload.trimStart() } }
        case ActionTypes.VALIDATE_NUMBER:
            if ((isNaN(action.payload) || Number(action.payload) > 9999) && action.payload.trim() !== '') {
                return { ...state, number: { error: true, value: action.payload.trim() } }
            } else {
                return { ...state, number: { error: false, value: Number(action.payload).toFixed(0) } }
            }
        case ActionTypes.CHANGE_NAME:
            return { ...state, name: { error: state.name.error, value: action.payload?.trimStart() || '' } }
        case ActionTypes.VALIDATE_NAME:
            if ((action.payload.trim().length > 250 || action.payload.trim().length < 4) && action.payload.trim() !== '') {
                return { ...state, name: { error: true, value: action.payload?.trim() || '' } }
            } else {
                return { ...state, name: { error: false, value: action.payload?.trim() || '' } }
            }
        case ActionTypes.CHANGE_YEARBUILT:
            return { ...state, yearBuilt: { error: state.yearBuilt.error || false, value: action.payload.trim() } }
        case ActionTypes.VALIDATE_YEARBUILT:
            if ((isNaN(action.payload) || Number(action.payload) > (new Date().getFullYear() + 50)) && action.payload.trim() !== '') {
                return { ...state, yearBuilt: { error: true, value: action.payload.trim() } }
            } else {
                return { ...state, yearBuilt: { error: false, value: Number(action.payload).toFixed(0) } }
            }
        case ActionTypes.CHANGE_SIZE:
            return { ...state, size: { error: state.size.error || false, value: action.payload.trim() } }
        case ActionTypes.CHANGE_BEDROOMS:
            return { ...state, bedrooms: { error: state.bedrooms.error || false, value: action.payload } }
        case ActionTypes.CHANGE_BATHROOMS:
            return { ...state, bathrooms: { error: state.bathrooms.error || false, value: action.payload } }
        case ActionTypes.CHANGE_GARAGES:
            return { ...state, garages: { error: state.garages.error || false, value: action.payload } }
        case ActionTypes.VALIDATE_SIZE:
            if ((isNaN(action.payload) || Number(action.payload) > 999999) && action.payload.trim() !== '') {
                return { ...state, size: { error: true, value: action.payload.trim() } }
            } else {
                return { ...state, size: { error: false, value: Number(action.payload).toFixed(0) } }
            }
        case ActionTypes.CHANGE_DESCRIPTION:
            return { ...state, description: { error: state.description.error, value: action.payload?.trimStart() || '' } }
        case ActionTypes.VALIDATE_DESCRIPTION:
            if ((action.payload.trim().length > 9999) && action.payload.trim() !== '') {
                return { ...state, description: { error: true, value: action.payload?.trim() || '' } }
            } else {
                return { ...state, description: { error: false, value: action.payload?.trim() || '' } }
            }
        case ActionTypes.CHANGE_PRICE:
            return { ...state, price: { error: state.price.error || false, value: action.payload.trim() } }
        case ActionTypes.VALIDATE_PRICE:
            if ((isNaN(action.payload) || Number(action.payload) > 99999999999) && action.payload.trim() !== '') {
                return { ...state, price: { error: true, value: action.payload.trim() } }
            } else {
                return { ...state, price: { error: false, value: Number(action.payload).toFixed(0) } }
            }
        case ActionTypes.CHANGE_STATUS:
            return { ...state, status: { error: false, value: action.payload.trim() } }
        case ActionTypes.CHANGE_TYPE:
            return { ...state, type: { error: false, value: action.payload.trim() } }
        default:
            return state
    }

}

export const useEditFormData =
    (state: PropertyFormData = initialState): [PropertyFormData, Dispatch<Action>] => {

        const [data, dispatch] = useReducer(formDataReducer, initialState)

        return [data, dispatch]
    };