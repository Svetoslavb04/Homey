import { PropertyStatus } from "../enums/PropertyStatus";
import { PropertyType } from "../enums/PropertyType";

export interface IProperty {
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
    price: number
}