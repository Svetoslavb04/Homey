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
