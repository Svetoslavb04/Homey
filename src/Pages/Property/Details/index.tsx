import './Property.scss'

import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import ArrowBack from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForward from '@mui/icons-material/ArrowForwardIosRounded';

import Button from '@mui/material/Button';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import BalconyIcon from '@mui/icons-material/Balcony';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { IProperty } from '../../../interfaces/IProperty';
import PageLoader from '../../../Components/Core/PageLoader';
import { getById } from '../../../services/propertyService';

const Property: FC = () => {

    const { propertyId } = useParams();

    const [property, setProperty] = useState<IProperty | null>(null)

    useEffect(() => {
        getById(propertyId || '')
            .then(payload => {
                const property = { ...payload[0][0], claims: payload[0].claims }

                setProperty(property)
            })
            .catch(err => console.log(err))
    }, [])

    const [imageToOpen, setImageToOpen] = useState('');
    const [contactButtonClicked, setContactButtonClicked] = useState<boolean>(false);
    
    if (!property) {
        return (
            <PageLoader />
        )
    }

    const clickImageHandler = (imgUrl: string) => { setImageToOpen(imgUrl) }

    const contactButtonHandler = () => { setContactButtonClicked(!contactButtonClicked) }

    const closeImageHandler = () => { setImageToOpen(oldValue => oldValue = '') }

    const forwardImageOpen = (url: string) => {
        let imageIndex = property.images.findIndex(u => u === url);

        imageIndex += 1;
        if (imageIndex > 3) {
            imageIndex = 0;
        }

        setImageToOpen(property.images[imageIndex]);
    }

    const backImageOpen = (url: string) => {
        let imageIndex = property.images.findIndex(u => u === url);

        imageIndex -= 1;
        if (imageIndex < 0) {
            imageIndex = 3;
        }

        setImageToOpen(property.images[imageIndex]);
    }

    const IconifiedExtras = [{
        name: 'wifi',
        Icon: WifiIcon,
    }, {
        name: 'air conditioning',
        Icon: AcUnitIcon,
    }, {
        name: 'fire place',
        Icon: FireplaceIcon,
    }, {
        name: 'balcony',
        Icon: BalconyIcon,
    }, {
        name: 'fitness',
        Icon: FitnessCenterIcon,
    }, {
        name: 'swimming pool',
        Icon: PoolIcon,
    }, {
        name: 'parking',
        Icon: LocalParkingIcon,
    }];

    const claims = [];
    for (const extra of property.claims) {
        const claim = IconifiedExtras.find(c => c.name.toLowerCase() === extra.value.toLowerCase())
        if (claim) {
            claims.push({ Icon: claim.Icon, name: claim.name });
        }
    };
    
    return (
        <div id='property-main'>
            <div id='top-image' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${property.images[0]})` }}>
                <div>
                    <h1>{property.name}</h1>
                </div>
            </div>

            <div id='property-content'>
                <div id='property-images'>
                    <img id='property-primary-image' src={property.images[1]} alt='house' onClick={() => clickImageHandler(property.images[1])} />
                    <div id='property-secondary-images'>
                        <div className='secondary-image'>
                            <img src={property.images[2]} onClick={() => clickImageHandler(property.images[2])} alt="house" />
                        </div>
                        <div className='secondary-image'>
                            <img src={property.images[3]} onClick={() => clickImageHandler(property.images[3])} alt="house" />
                        </div>

                    </div>
                </div>
                <div id='property-description'>
                    <p> {property.description}
                    </p>
                    <p><b className='property-info'>Status : </b> {property.status?.split('_').join(' ')}</p>
                    <p><b className='property-info'>Type : </b> {property.type}</p>
                    <p><b className='property-info'>Price : </b> {property.price} €</p>
                    <p><b className='property-info'>Site Size : </b> {property.size} m²</p>
                    <p><b className='property-info'>Number of bedrooms : </b> {property.bedrooms} rooms</p>
                    <p><b className='property-info'>Number of bathrooms : </b> {property.bathrooms} bathroom</p>
                    <p><b className='property-info'>Year of construction : </b> {property.yearBuilt}</p>
                    <p><b className='property-info'>Garages : </b> {property.garages}</p>
                    {property.claims.length > 0
                        && <div>
                            <b className='property-info'>Extras : </b>
                            <div className='extras'>{claims
                                .map(e => <div className='extra' key={e.name}><e.Icon /> {e.name}</div>)}
                            </div>
                        </div>
                    }
                </div>

            </div>
            <hr></hr>

            <div id='contact-section'>
                <div id='agency-info'>
                    <span>This property is offered by</span> <b className='property-info'>{property.agency_id?.agencyName}</b>
                </div>
                <Button variant="contained" size='large' id='contact-button' type='submit' onClick={() => contactButtonHandler()}>
                    {contactButtonClicked ? '' : 'Contact'}
                </Button>
            </div>

            {imageToOpen !== '' &&
                <div id='selected-image'>
                    <div id='backdrop' onClick={() => closeImageHandler()}></div>
                    <ArrowBack id='arrow-back' className='arrow' onClick={() => backImageOpen(imageToOpen)} />
                    <img src={imageToOpen} alt='house' />
                    <CloseIcon className="btn-close" onClick={() => closeImageHandler()} />
                    <ArrowForward className='arrow' id='arrow-forward' onClick={() => forwardImageOpen(imageToOpen)} />
                </div>
            }

        </div>
    );
}

export default Property;