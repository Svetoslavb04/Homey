import './FilterSection.scss';

import { Dispatch, FC, SetStateAction } from 'react';

import PropertyFilter from '../../../../../Components/Core/PropertyFilter';
import IPropertyFilter from '../../../../../interfaces/IPropertyFilter';

type FilterSectionProps = {
    setFilter: Dispatch<SetStateAction<IPropertyFilter | null>>
}

const FilterSection: FC<FilterSectionProps> = ({ setFilter }) => {

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
                    <PropertyFilter className='property-listing-filter' handleFilterChange={handleFilterChange} />
                </div>
            </div>
        </section>
    )
}

export default FilterSection
