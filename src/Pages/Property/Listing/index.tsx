import './PropertiesListings.scss';

import { useState, useEffect } from 'react';

import { IProperty } from '../../../interfaces/IProperty';
import IPropertyFilter from '../../../interfaces/IPropertyFilter';

import FilterSection from './Components/FilterSection';
import PropertiesSection from './Components/PropertiesSection';

import Pagination from '@mui/material/Pagination';
import { getFilteredData, getMetaData } from '../../../services/propertyService';
import IPropertiesMeta from '../../../interfaces/IPropertiesMeta';
import { homeyAPI } from '../../../assets/js/APIs';

const defaultPageSize = 6;

const PropertiesListings = () => {

    const [filter, setFilter] = useState<IPropertyFilter>({});
    const [page, setPage] = useState<number>(1);
    const [properties, setProperties] = useState<IProperty[]>([]);
    const [meta, setMeta] = useState<IPropertiesMeta>();

    useEffect(() => {

        getFilteredData({ ...filter, page, pageSize: defaultPageSize })
            .then(payload => {
                const properties = payload.properties.map((p: IProperty) => {
                    p.images = p.images.map(i => `${homeyAPI.images.baseURL}/${i}`)
                    return p
                })

                setProperties(properties)
            })
            .catch(err => console.log(err))

        getMetaData()
            .then(meta => setMeta(meta))
            .catch(err => console.log(err))

    }, [filter, page])

    return (
        <div className='property-listing-container'>
            {!meta}
            <FilterSection metaData={meta} setFilter={setFilter} />
            <PropertiesSection properties={properties} />
            <section className='property-listing-pagination df jcc'>
                <Pagination
                    size={window.innerWidth < 680 ? 'small' : 'medium'}
                    count={meta?.pages || 1} //Get from server
                    page={page}
                    onChange={(_, page) => setPage(page)} color='secondary'
                />
            </section>
        </div>
    )
}

export default PropertiesListings