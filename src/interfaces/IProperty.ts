import { PropertyStatus } from "../enums/PropertyStatus";
import { PropertyType } from "../enums/PropertyType";
import { IAgency } from "./IAgency";

export interface IProperty {
    _id: string,
    name: string,
    type: PropertyType,
    status: PropertyStatus,
    country: string,
    city: string,
    street: string,
    number?: number,
    description: string,
    size: number,
    bedrooms: number,
    bathrooms: number,
    garages: number,
    yearBuilt: number,
    price: number,
    images: string[],
    claims: {
        name: string,
        value: string
    }[],
    agency_id: IAgency
}