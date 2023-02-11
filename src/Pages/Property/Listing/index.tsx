import { useState } from 'react';
import { PropertyStatus } from '../../../enums/PropertyStatus';
import { PropertyType } from '../../../enums/PropertyType';
import { IProperty } from '../../../interfaces/IProperty';

import IPropertyFilter from '../../../interfaces/IPropertyFilter';
import FilterSection from './Components/FilterSection';
import PropertiesSection from './Components/PropertiesSection';
import './PropertiesListings.scss';

const PropertiesListings = () => {

    const [filter, setFilter] = useState<IPropertyFilter | null>(null);

    const [properties, setProperties] = useState<IProperty[]>([]);

    return (
        <div className='property-listing-container'>
            <FilterSection setFilter={setFilter} />
            <PropertiesSection properties={properties} />
        </div>
    )
}

export default PropertiesListings