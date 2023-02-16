import { Dispatch, useReducer } from "react"
import isMobilePhone from "validator/lib/isMobilePhone";

export enum FormDataMode {
    'user' = 'user',
    'agency' = 'agency'
}

export type CommonData = {
    email: { error: boolean, value: string },
    password: { error: boolean, value: string },
    rePassword: { error: boolean, value: string }
}

export type FormData = { mode: FormDataMode }

export type UserData = CommonData & {
    firstName: { error: boolean, value: string },
    lastName: { error: boolean, value: string },
}
export type UserFormData = FormData & UserData

export type AgencyData = CommonData & {
    agencyName: { error: boolean, value: string },
    city: { error: boolean, value: string },
    address: { error: boolean, value: string },
    phoneNumber: { error: boolean, value: string },
}

export type AgencyFormData = FormData & AgencyData

export type Action = {
    type: string,
    payload: any
}

export const initialState: UserFormData & AgencyFormData = {
    mode: FormDataMode.user,
    email: { error: false, value: '' },
    firstName: { error: false, value: '' },
    lastName: { error: false, value: '' },
    agencyName: { error: false, value: '' },
    city: { error: false, value: '' },
    address: { error: false, value: '' },
    phoneNumber: { error: false, value: '' },
    password: { error: false, value: '' },
    rePassword: { error: false, value: '' },
}

export enum ActionTypes {
    'CHANGE_MODE' = 'CHANGE_MODE',
    'CHANGE_EMAIL' = 'CHANGE_EMAIL',
    'VALIDATE_EMAIL' = 'VALIDATE_EMAIL',
    'CHANGE_PASSWORD' = 'CHANGE_PASSWORD',
    'VALIDATE_PASSWORD' = 'VALIDATE_PASSWORD',
    'CHANGE_REPASSWORD' = 'CHANGE_REPASSWORD',
    'VALIDATE_REPASSWORD' = 'VALIDATE_REPASSWORD',
    'CHANGE_FIRSTNAME' = 'CHANGE_FIRSTNAME',
    'VALIDATE_FIRSTNAME' = 'VALIDATE_FIRSTNAME',
    'CHANGE_LASTNAME' = 'CHANGE_LASTNAME',
    'VALIDATE_LASTNAME' = 'VALIDATE_LASTNAME',
    'CHANGE_AGENCYNAME' = 'CHANGE_AGENCYNAME',
    'VALIDATE_AGENCYNAME' = 'VALIDATE_AGENCYNAME',
    'CHANGE_CITY' = 'CHANGE_CITY',
    'VALIDATE_CITY' = 'VALIDATE_CITY',
    'CHANGE_ADDRESS' = 'CHANGE_ADDRESS',
    'VALIDATE_ADDRESS' = 'VALIDATE_ADDRESS',
    'CHANGE_PHONENUMBER' = 'CHANGE_PHONENUMBER',
    'VALIDATE_PHONENUMBER' = 'VALIDATE_PHONENUMBER'
}

const formDataReducer = (state: UserFormData & AgencyFormData, action: Action) => {

    switch (action.type) {
        case ActionTypes.CHANGE_MODE:
            return { ...state, mode: action.payload }
        case ActionTypes.CHANGE_EMAIL:
            return { ...state, email: { error: state.email.error, value: action.payload.trim() } }
        case ActionTypes.VALIDATE_EMAIL:
            if (action.payload.trim().length < 3 && action.payload.trim() !== '') {
                return { ...state, email: { error: true, value: state.email.value } }
            } else {
                return { ...state, email: { error: false, value: state.email.value } }
            }
        case ActionTypes.CHANGE_PASSWORD:
            return { ...state, password: { error: state.password.error, value: action.payload.trim() } }
        case ActionTypes.VALIDATE_PASSWORD:
            if (action.payload.trim().length < 8 && action.payload !== '') {
                return { ...state, password: { error: true, value: state.password.value } }
            } else {
                return { ...state, password: { error: false, value: state.password.value } }
            }
        case ActionTypes.CHANGE_REPASSWORD:
            return { ...state, rePassword: { error: state.rePassword.error, value: action.payload.trim() } }
        case ActionTypes.VALIDATE_REPASSWORD:
            if (action.payload !== state.password.value) {
                return { ...state, rePassword: { error: true, value: state.rePassword.value } }
            } else {
                return { ...state, rePassword: { error: false, value: state.rePassword.value } }
            }
        case ActionTypes.CHANGE_FIRSTNAME:
            return { ...state, firstName: { error: state.firstName.error, value: action.payload.trimStart() } }
        case ActionTypes.VALIDATE_FIRSTNAME:
            if (action.payload.trim().length < 2 && action.payload !== '') {
                return { ...state, firstName: { error: true, value: state.firstName.value.trim() } }
            } else {
                return { ...state, firstName: { error: false, value: state.firstName.value.trim() } }
            }
        case ActionTypes.CHANGE_LASTNAME:
            return { ...state, lastName: { error: state.lastName.error, value: action.payload.trimStart() } }
        case ActionTypes.VALIDATE_LASTNAME:
            if (action.payload.trim().length < 2 && action.payload !== '') {
                return { ...state, lastName: { error: true, value: state.lastName.value.trim() } }
            } else {
                return { ...state, lastName: { error: false, value: state.lastName.value.trim() } }
            }
        case ActionTypes.CHANGE_AGENCYNAME:
            return { ...state, agencyName: { error: state.agencyName.error, value: action.payload.trimStart() } }
        case ActionTypes.VALIDATE_AGENCYNAME:
            if (action.payload.trim().length < 2 && action.payload !== '') {
                return { ...state, agencyName: { error: true, value: state.agencyName.value.trim() } }
            } else {
                return { ...state, agencyName: { error: false, value: state.agencyName.value.trim() } }
            }
        case ActionTypes.CHANGE_CITY:
            return { ...state, city: { error: state.city.error, value: action.payload.trimStart() } }
        case ActionTypes.VALIDATE_CITY:
            if (action.payload.trim().length < 3 && action.payload !== '') {
                return { ...state, city: { error: true, value: state.city.value.trim() } }
            } else {
                return { ...state, city: { error: false, value: state.city.value.trim() } }
            }
        case ActionTypes.CHANGE_ADDRESS:
            return { ...state, address: { error: state.address.error, value: action.payload.trimStart() } }
        case ActionTypes.VALIDATE_ADDRESS:
            if (action.payload.trim().length < 3 && action.payload !== '') {
                return { ...state, address: { error: true, value: state.address.value.trim() } }
            } else {
                return { ...state, address: { error: false, value: state.address.value.trim() } }
            }
        case ActionTypes.CHANGE_PHONENUMBER:
            return { ...state, phoneNumber: { error: state.phoneNumber.error, value: action.payload.trimStart() } }
        case ActionTypes.VALIDATE_PHONENUMBER:
            if (!isMobilePhone(action.payload) && action.payload !== '') {
                return { ...state, phoneNumber: { error: true, value: state.phoneNumber.value.trim() } }
            } else {
                return { ...state, phoneNumber: { error: false, value: state.phoneNumber.value.trim() } }
            }
        default:
            return state
    }

}

export const useRegisterFormData =
    (state: UserFormData & AgencyFormData = initialState): [UserFormData & AgencyFormData, Dispatch<Action>] => {

        const [data, dispatch] = useReducer(formDataReducer, initialState)

        return [data, dispatch]
    }