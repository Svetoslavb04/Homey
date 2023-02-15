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
import LocalLoader from '../../../Components/LocalLoader';

const defaultPageSize = 6;

const PropertiesListings = () => {

    const [filter, setFilter] = useState<IPropertyFilter>({});
    const [page, setPage] = useState<number>(1);
    const [meta, setMeta] = useState<IPropertiesMeta>();
    const [pagesCount, setPagesCount] = useState<number>(0);

    const [propertiesLoading, setPropertiesLoading] = useState<boolean>(true);
    const [properties, setProperties] = useState<IProperty[]>([]);

    useEffect(() => {

        setPropertiesLoading(true);

        getFilteredData({ ...filter, page, pageSize: defaultPageSize })
            .then(payload => {
                const properties = payload.properties.map((p: IProperty) => {
                    p.images = p.images.map(i => `${homeyAPI.images.baseURL}/${i}`)
                    return p
                })

                setPagesCount(payload.meta.pages)
                setProperties(properties)
            })
            .catch(err => console.log(err))

        getMetaData()
            .then(meta => setMeta(meta))
            .catch(err => console.log(err))

    }, [filter, page])

    useEffect(() => {
        if(propertiesLoading) { setPropertiesLoading(false)}
    }, [properties, propertiesLoading])

    return (
        <div className='property-listing-container'>
            {!meta}
            <FilterSection metaData={meta} setFilter={setFilter} />
            <div style={{ position: 'relative', minHeight: '150px' }}>
                {propertiesLoading && <LocalLoader />}
                <PropertiesSection properties={properties} />
                <section className='property-listing-pagination df jcc'>
                    <Pagination
                        size={window.innerWidth < 680 ? 'small' : 'medium'}
                        count={pagesCount || 1}
                        page={page}
                        onChange={(_, page) => setPage(page)} color='secondary'
                    />
                </section>
            </div>
        </div>
    )
}

export default PropertiesListings