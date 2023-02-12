import './PropertyCard.scss'

import { FC, MouseEvent } from 'react'

export interface IPropertyCard {
  id: string,
  image: {
    src: string,
    alt: string
  },
  town: string,
  name: string
}

export type PropertyCardProps = {
  handleImageClick?: (event: MouseEvent<HTMLDivElement>, id: string) => void
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  & IPropertyCard

const PropertyCard: FC<PropertyCardProps> = ({ id, image, town, name, handleImageClick = () => { }, ...rest }) => {
  return (
    <div className={`home-top-property${rest.className ? ` ${rest.className}` : ''}`} {...rest}>
      <div
        onClick={(e) => { handleImageClick(e, id) }}
        className='home-top-property-image-wrapper'
      >
        <img src={image.src} alt={image.alt} />
      </div>
      <div className='home-top-property-description'>
        <h5>{town}</h5>
        <p>{name}</p>
      </div>
      <div className='home-top-property-description'>
        <h5>{town}</h5>
        <p>{name}</p>
      </div>
    </div>
  )
}

export default PropertyCard