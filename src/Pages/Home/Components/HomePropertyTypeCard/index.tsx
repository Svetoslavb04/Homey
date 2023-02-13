import './HomePropertyTypeCard.scss'

import { FC } from 'react'

import { OverridableComponent } from '@mui/types'
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon'

export type HomePropertyTypeCardProps = {
    Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string },
    type: string
}

const HomePropertyTypeCard: FC<HomePropertyTypeCardProps> = ({ Icon, type }) => {
    return (
        <div className='home-property-card'>
            <Icon />
            <h5>{type}</h5>
        </div>
    )
}

export default HomePropertyTypeCard