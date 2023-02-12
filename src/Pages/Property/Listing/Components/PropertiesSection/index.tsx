import { FC } from 'react';
import PropertyCardExtended from '../../../../../Components/PropertyCardExtended';
import { IProperty } from '../../../../../interfaces/IProperty';

import './PropertiesSection.scss';

type Props = {
    properties: IProperty[]
}

const PropertiesSection: FC<Props> = ({ properties }) => {

    return (
        <section className='properties-listing-section'>
            <div>
                {
                    properties.filter((p, i) => i % 2 === 0).map(p => <PropertyCardExtended key={p._id} property={p} />)
                }
            </div>
            <div>
                {
                    properties.filter((p, i) => i % 2 !== 0).map(p => <PropertyCardExtended key={p._id} property={p} />)
                }
            </div>
        </section>
    )
}

export default PropertiesSection