import './FilterSection.scss';

import { Dispatch, FC, SetStateAction } from 'react';

import PropertyFilter from '../../../../../Components/Core/PropertyFilter';
import IPropertyFilter from '../../../../../interfaces/IPropertyFilter';
import IPropertiesMeta from '../../../../../interfaces/IPropertiesMeta';
import PageLoader from '../../../../../Components/Core/PageLoader';

type FilterSectionProps = {
    metaData?: IPropertiesMeta
    setFilter: Dispatch<SetStateAction<IPropertyFilter>>
}

const defaultInitialPropertyFilter: IPropertyFilter = {
    country: 'Any',
    type: 'Any',
    priceRange: [0, 0],
    status: 'Any',
    sizeRange: [0, 0],
    city: '',
    bedrooms: 'Any',
    bathrooms: 'Any',
    garages: 'Any',
    claims: []
}

const defaultMetaData: IPropertiesMeta = {
    count: 0,
    maxBathrooms: 0,
    maxBedrooms: 0,
    maxGarages: 0,
    maxPrice: 0,
    maxSize: 0,
    maxYearBuilt: 0,
    minBathrooms: 0,
    minBedrooms: 0,
    minGarages: 0,
    minPrice: 0,
    minSize: 0,
    minYearBuilt: 0,
    pages: 0,
    types: []
}

const FilterSection: FC<FilterSectionProps> = ({ metaData, setFilter }) => {

    const handleFilterChange = (newFilter: IPropertyFilter) => { setFilter(newFilter) }

    return (
        <section
            className='property-listing-filter-section'
            style={{ backgroundImage: `url(assets/images/modern_house_7.jpg)` }}
        >
            <div>
                <div className='property-listing-filter-heading-container'>
                    <h2><span>New home.&nbsp;</span><span>New adventures.&nbsp;</span><span>New memories.</span></h2>
                </div>
                <div className='property-listing-filter-container'>
                    {
                        metaData
                            ? <PropertyFilter
                                className='property-listing-filter'
                                metaData={metaData}
                                initialPropertyFilter={defaultInitialPropertyFilter}
                                handleFilterChange={handleFilterChange}
                            />
                            : <PageLoader />
                    }
                </div>
            </div>
        </section>
    )
}

export default FilterSection
