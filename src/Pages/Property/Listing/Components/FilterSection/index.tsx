import './FilterSection.scss';

import PropertyFilter from '../../../../../Components/Core/PropertyFilter';

const FilterSection = () => {
    return (
        <section
            className='property-listing-filter-section'
            style={{ backgroundImage: `url(assets/images/modern_house_7.jpg)` }}
        >
            <div>
                <div className='property-listing-filter-heading-container'>
                    <h2><span>New home.&nbsp;</span><span>New adventures.&nbsp;</span><span>New memories.</span></h2>
                </div>
                <PropertyFilter className='property-listing-filter'/>
            </div>
        </section>
    )
}

export default FilterSection
