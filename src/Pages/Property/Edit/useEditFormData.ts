import { stat } from "fs";
import { Dispatch, useReducer } from "react";


export type PropertyFormData = {
    country: {error:boolean, value: string},
    city: {error:boolean, value: string},
    street: {error:boolean, value: string},
    number: {error:boolean, value: number},
    type: {error:boolean, value: string},
    status: {error:boolean, value: string},
    name: {error:boolean, value: string},
    price: {error:boolean, value: number},
    size: {error:boolean, value: number},
    bedrooms: {error:boolean, value: number},
    bathrooms: {error:boolean, value: number},
    garages: {error:boolean, value: number},
    description: {error:boolean, value: string}
}

export type Action = {
    type:string,
    payload:any
}

export const initialState: PropertyFormData = {
    country: {error:false, value: ''},
    city: {error:false, value: ''},
    street: {error:false, value: ''},
    number: {error:false, value: 0},
    type: {error:false, value: ''},
    status: {error:false, value: ''},
    name: {error:false, value: ''},
    price: {error:false, value: 0},
    size: {error:false, value: 0},
    bedrooms: {error:false, value: 0},
    bathrooms: {error:false, value: 0},
    garages: {error:false, value: 0},
    description: {error:false, value: ''}
}

export enum ActionTypes {
    'CHANGE_COUNTRY' = 'CHANGE_COUNTRY',
    'CHANGE_CITY' = 'CHANGE_CITY',
    'CHANGE_STREET' = 'CHANGE_STREET',
    'VALIDATE_STREET' = 'VALIDATE_STREET',
    'CHANGE_NUMBER' = 'CHANGE_NUMBER',
    'VALIDATE_NUMBER' = 'VALIDATE_NUMBER',
    'CHANGE_TYPE' = 'CHANGE_TYPE',
    'CHANGE_STATUS' = 'CHANGE_STATUS',
    'CHANGE_NAME' = 'CHANGE_NAME',
    'VALIDATE_NAME' = 'VALIDATE_NAME',
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

const formDataReducer = (state: PropertyFormData, action:Action)=>{
    switch (action.type) {
        case ActionTypes.CHANGE_COUNTRY:
            return {...state, country: {error: state.country.error, value:action.payload.trim()}}
        case ActionTypes.CHANGE_CITY:
            return {...state, city: {error: state.city.error, value:action.payload.trim()}}
        case ActionTypes.CHANGE_STREET:
            return {...state, street: {error: state.street.error, value:action.payload.trim()}}
        case ActionTypes.VALIDATE_STREET:
            if (action.payload.trim().length > 60 && action.payload.trim() !== '') {
                return { ...state, street: { error: true, value: state.street.value } }
            } else {
                return { ...state, street: { error: false, value: state.street.value } }
            }
        case ActionTypes.CHANGE_NUMBER:
            return {...state, number: {error: state.number.error, value:action.payload.trim()}}
        case ActionTypes.VALIDATE_NUMBER:
            if (action.payload > 9999 && action.payload.trim() !== '') {
                return { ...state, number: { error: true, value: state.number.value } }
            } else {
                return { ...state, number: { error: false, value: state.number.value } }
            }
        case ActionTypes.CHANGE_NAME:
            return {...state, name: {error: state.name.error, value:action.payload.trim()}}
        case ActionTypes.VALIDATE_NAME:
            if (action.payload.trim().length < 4 && action.payload.trim() !== '') {
                return { ...state, name: { error: true, value: state.name.value } }
            } else {
                return { ...state, name: { error: false, value: state.name.value } }
            }
        case ActionTypes.CHANGE_PRICE:
            return {...state, price: {error: state.price.error, value:action.payload.trim()}}
    
        case ActionTypes.VALIDATE_PRICE:
            if (action.payload > 99999999999  && action.payload.trim() !== '') {
                return { ...state, price: { error: true, value: state.price.value } }
            } else {
                return { ...state, price: { error: false, value: state.price.value } }
            }
        case ActionTypes.CHANGE_SIZE:
            return {...state, size: {error: state.size.error, value:action.payload.trim()}}
        case ActionTypes.VALIDATE_SIZE:
            if (action.payload > 9999 && action.payload < 0 && action.payload.trim() !== '') {
                return { ...state, size: { error: true, value: state.size.value } }
            } else {
                return { ...state, size: { error: false, value: state.size.value } }
            }
        case ActionTypes.CHANGE_BEDROOMS:
            return {...state, bedrooms: {error: state.bedrooms.error, value:action.payload.trim()}}
        case ActionTypes.CHANGE_BATHROOMS:
            return {...state, bathrooms: {error: state.bathrooms.error, value:action.payload.trim()}}
        case ActionTypes.CHANGE_GARAGES:
            return {...state, garages: {error: state.garages.error, value:action.payload.trim()}}
        case ActionTypes.CHANGE_DESCRIPTION:
            return {...state, description: {error: state.description.error, value:action.payload.trim()}}    
        case ActionTypes.VALIDATE_DESCRIPTION:
            if (action.payload.trim().length > 9999 && action.payload.trim() !== '') {
                return { ...state, description: { error: true, value: state.description.value } }
            } else {
                return { ...state, description: { error: false, value: state.description.value } }
            }

                default:
            return state;
    }
}

export const useRegisterFormData =
    (state: PropertyFormData = initialState): [PropertyFormData, Dispatch<Action>] => {

        const [data, dispatch] = useReducer(formDataReducer, initialState)

        return [data, dispatch]
    };