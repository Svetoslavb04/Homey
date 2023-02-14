import './PropertyCardExtended.scss'

import { FC, MouseEvent } from 'react'
import { IProperty } from '../../interfaces/IProperty'

import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import StraightenRoundedIcon from '@mui/icons-material/StraightenRounded';
import GarageOutlinedIcon from '@mui/icons-material/GarageOutlined';

export type PropertyCardExtendedProps = {
  property: IProperty,
  className?: string,
  handleImageClick?: (event: MouseEvent<HTMLDivElement>, id: string) => void
}

const PropertyCardExtended: FC<PropertyCardExtendedProps> = ({ property, className, handleImageClick = () => { } }) => {
  return (
    <div className={`property-card-extended${className ? ` ${className}` : ''}`} >
      <div
        onClick={(e) => { handleImageClick(e, property._id) }}
        className='property-card-extended-image-wrapper'
      >
        <img src={property.images[0]} alt='property' />
      </div>
      <div className='property-card-extended-description-block property-card-extended-bottom-left df fdc'>
        <div className='df jcsb gap-20'>
          <h5 className='property-card-extended-heading'>{property.city.trim()}</h5>
          <p className='property-card-extended-heading'>€ {property.price.toFixed(2)}</p>
        </div>
        <div className='df jcfe aife'>
          <p className='property-card-extended-text'>{property.name.trim()}</p>
        </div>
      </div>
      {/* <div className='property-card-extended-description-block property-card-extended-bottom-right'>
        <p className='property-card-extended-text'>€ {property.price.toFixed(2)}</p>
      </div> */}
      <div className='property-card-extended-description-block property-card-extended-top-right'>
        <div className='df gap-10 jcsb'>
          <p className='property-card-extended-text df aic gap-5'><StraightenRoundedIcon /> {property.size}</p>
          <p className='property-card-extended-text df aic gap-5'><GarageOutlinedIcon /> {property.garages}</p>
        </div>
        <div className='df gap-10 jcsb'>
          <p className='property-card-extended-text df aic gap-5'><BedOutlinedIcon /> {property.bedrooms}</p>
          <p className='property-card-extended-text df aic gap-5'><BathtubOutlinedIcon /> {property.bathrooms}</p>
        </div>
      </div>
    </div >
  )
}

export default PropertyCardExtended