import { Dispatch, Reducer, useReducer } from "react";
import { PropertyStatus } from "../../../enums/PropertyStatus";
import { PropertyType } from "../../../enums/PropertyType";

// An enum with all the types of actions to use in our reducer
export enum PropertyFilterActionType {
    SET_COUNTRY = 'SET_COUNTRY',
    SET_TYPE = 'SET_TYPE',
    SET_PRICE_RANGE = 'SET_PRICE_RANGE',
    SET_STATUS = 'SET_STATUS',
    SET_SIZE_RANGE = 'SET_SIZE_RANGE'
}

// An interface for our actions
export interface PropertyFilterAction {
    type: PropertyFilterActionType;
    payload: any;
}

// An interface for our state
export interface PropertyFilterState {
    country: string,
    type: PropertyType | 'Any',
    priceRange: number[],
    status: PropertyStatus | 'Any',
    sizeRange: number[]
}

// Our reducer function that uses a switch statement to handle our actions
const propertyReducer: Reducer<PropertyFilterState, PropertyFilterAction> =
    (state: PropertyFilterState, action: PropertyFilterAction): PropertyFilterState => {

        const { type, payload } = action;

        switch (type) {
            case PropertyFilterActionType.SET_COUNTRY:
                if (typeof payload === 'string' || payload instanceof String) {
                    return {
                        ...state,
                        country: payload.toString()
                    }
                } else {
                    throw Error('Invalid Country.')
                }
            case PropertyFilterActionType.SET_TYPE:
                if (payload in PropertyType || payload === 'Any') {
                    return {
                        ...state,
                        type: payload
                    }
                } else {
                    throw Error('Invalid property type.')
                }
            case PropertyFilterActionType.SET_PRICE_RANGE:
                if (Array.isArray(payload) && payload.every(e => !isNaN(e))) {
                    return {
                        ...state,
                        priceRange: payload
                    }
                } else {
                    throw Error('Invalid property type.')
                }
            case PropertyFilterActionType.SET_STATUS:
                if (payload in PropertyStatus || payload === 'Any') {
                    return {
                        ...state,
                        status: payload
                    }
                } else {
                    throw Error('Invalid property status.')
                }
            case PropertyFilterActionType.SET_SIZE_RANGE:
                if (Array.isArray(payload) && payload.every(e => !isNaN(e))) {
                    return {
                        ...state,
                        sizeRange: payload
                    }
                } else {
                    throw Error('Invalid property type.')
                }
            default:
                return state;
        }
    }

export const usePropertyFilter = (initialValue: PropertyFilterState): [PropertyFilterState, Dispatch<PropertyFilterAction>] => {

    const [state, dispatch] = useReducer(propertyReducer, initialValue);

    return [state, dispatch]
}