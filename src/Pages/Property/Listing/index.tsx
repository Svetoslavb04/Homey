import './PropertiesListings.scss';

import { useState } from 'react';

import { IProperty } from '../../../interfaces/IProperty';
import IPropertyFilter from '../../../interfaces/IPropertyFilter';

import FilterSection from './Components/FilterSection';
import PropertiesSection from './Components/PropertiesSection';

import Pagination from '@mui/material/Pagination';

const PropertiesListings = () => {

    const [filter, setFilter] = useState<IPropertyFilter | null>(null);

    const [page, setPage] = useState<number>(1);

    const [properties, setProperties] = useState<IProperty[]>([]);

    return (
        <div className='property-listing-container'>
            <FilterSection setFilter={setFilter} />
            <PropertiesSection properties={properties} />
            <section className='property-listing-pagination df jcc'>
                <Pagination
                    size={window.innerWidth < 680 ? 'small' : 'medium'}
                    count={10} //Get from server
                    page={page}
                    onChange={(_, page) => setPage(page)} color='secondary'
                />
            </section>
        </div>
    )
}

export default PropertiesListings