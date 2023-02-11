import { PropertyStatus } from "../enums/PropertyStatus";
import { PropertyType } from "../enums/PropertyType";

export default interface IPropertyFilter {
    country?: string,
    type?: PropertyType | 'Any',
    priceRange: number[],
    status?: PropertyStatus | 'Any',
    sizeRange?: number[],
    city?: string,
    bedrooms?: number | 'Any',
    bathrooms?: number | 'Any',
    garages?: number | 'Any',
    claims?: string[]
}