import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import PropertyCardExtended from '../../../../../Components/PropertyCardExtended';
import { IProperty } from '../../../../../interfaces/IProperty';

import './PropertiesSection.scss';

type Props = {
    properties: IProperty[]
}

const PropertiesSection: FC<Props> = ({ properties }) => {

    return (
        <section className='properties-listing-section'>
            <div id='home-top-properties-left'>
                {
                    properties.filter((p, i) => i % 2 === 0).map((p, i) =>
                        <NavLink key={p._id + i} to={`/properties/${p._id}`}>
                            <PropertyCardExtended property={p} />
                        </NavLink>
                    )
                }
            </div>
            <div id='home-top-properties-right'>
                {
                    properties.filter((p, i) => i % 2 !== 0).map((p, i) =>
                        <NavLink key={p._id + i} to={`/properties/${p._id}`}>
                            <PropertyCardExtended property={p} />
                        </NavLink>
                    )
                }
            </div>
        </section>
    )
}

export default PropertiesSection