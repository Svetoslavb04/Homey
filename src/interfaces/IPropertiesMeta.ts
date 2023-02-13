import { PropertyType } from "../enums/PropertyType";

export default interface IPropertiesMeta {
    count: number,
    maxBathrooms: number,
    maxBedrooms: number,
    maxGarages: number,
    maxPrice: number,
    maxSize: number,
    maxYearBuilt: number,
    minBathrooms: number,
    minBedrooms: number,
    minGarages: number,
    minPrice: number,
    minSize: number,
    minYearBuilt: number,
    pages: number,
    types: PropertyType[]
}