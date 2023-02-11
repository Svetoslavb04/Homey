import { useState } from 'react';

import IPropertyFilter from '../../../interfaces/IPropertyFilter';
import FilterSection from './Components/FilterSection';
import './PropertiesListings.scss';

const PropertiesListings = () => {

    const [filter, setFilter] = useState<IPropertyFilter | null>(null)
    
    return (
        <div className='property-listing-container'>
            <FilterSection setFilter={setFilter} />
        </div>
    )
}

export default PropertiesListings