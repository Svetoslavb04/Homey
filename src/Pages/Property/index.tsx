import './Property.scss'
import CloseIcon from '@mui/icons-material/Close';
import ArrowBack from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForward from '@mui/icons-material/ArrowForwardIosRounded';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import BalconyIcon from '@mui/icons-material/Balcony';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';
import LocalParkingIcon from '@mui/icons-material/LocalParking';




const Property: FC = ()=> {

    const {propertyId} = useParams();
    
    //fetch property by id
    const fetchedProperty = {
        id: '3',
        name: 'Modern Villa',
        status: 'for sale',
        type: 'Villa',
        price: '120 000',  
        size: 200, 
        numberOfBedrooms: 3,
        numberOfBathrooms: 1,
        numberOfGarages: 1,
        description: "Company non lorem ac erat suscipit bibendum. Nulla facilisi. Sedeuter nunc volutpat, mollis sapien vel, conseyer turpeutionyer masin libero sempe. Fusceler mollis augue sit amet hendrerit vestibulum. Duisteyerionyer venenatis lacus.",
        year: '2021',
        agency: 'Era',
        contactNumber: '+1 202-918-2132',
        images: ['https://www.sunset.com/wp-content/uploads/medium_2x/hometour-Klopf-Architect-Sacramento-covered-porch-Mariko-Reed-0621.jpg',
                'https://www.mydomaine.com/thmb/dke2LC6lH21Pvqwd2lI6AIutnDY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SuCasaDesign-Modern-9335be77ca0446c7883c5cf8d974e47c.jpg',
                 'https://www.cuded.com/wp-content/uploads/2013/04/Caruth-Boulevard-Residence-by-Tom-Reisenbichler-1.jpg', 
                 'https://www.sunset.com/wp-content/uploads/medium_2x/hometour-Klopf-Architect-Sacramento-covered-porch-Mariko-Reed-0621.jpg'],
        extras: ['Wifi', 'Air Conditioning', 'Fire Place', 'Fitness', 'Swimming Pool', 'Parking']
    }

    const [imageToOpen, SetImageToOpen] = useState('');
    const [contactButtonClicked, SetContactButtonClicked] = useState(false);

    const clickImageHandler = (imgUrl: string) =>{
        SetImageToOpen(imgUrl);
    }

    const contactButtonHandler = () =>{
        SetContactButtonClicked(!contactButtonClicked);
    }
    const closeImageHandler = () =>{
        SetImageToOpen(oldValue => oldValue = '');
    }
    
    const forwardImageOpen = (url: string) =>{
        let imageIndex = fetchedProperty.images.findIndex(u=> u===url);

        imageIndex+=1;
        if (imageIndex>3) {
            imageIndex = 0;
        }

        SetImageToOpen(fetchedProperty.images[imageIndex]);
    }

     const backImageOpen = (url: string) =>{
        let imageIndex = fetchedProperty.images.findIndex(u=> u===url);

        imageIndex-=1;
        if (imageIndex<0) {
            imageIndex = 3;
        }

        SetImageToOpen(fetchedProperty.images[imageIndex]);
    }

    const IconifyiedExtras = [ {
        name: 'Wifi',
        Icon: WifiIcon,
      }, {
        name: 'Air Conditioning',
        Icon: AcUnitIcon,
      }, {
        name: 'Fire Place',
        Icon: FireplaceIcon,
      }, {
        name: 'Balcony',
        Icon: BalconyIcon,
      }, {
        name: 'Fitness',
        Icon: FitnessCenterIcon,
      }, {
        name: 'Swimming Pool',
        Icon: PoolIcon,
      }, {
        name: 'Parking',
        Icon: LocalParkingIcon,
      }];


    const extras = [];
    for (const extra of fetchedProperty.extras) {
        const claim = IconifyiedExtras.find(c => c.name === extra)
        if (claim) {
            extras.push({Icon: claim.Icon, name:claim.name});
        }
    };

    return (
        

    <div id='property-main'>
         <div id='top-image' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${fetchedProperty.images[0]})` }}>
            <div>  
                 <h1>{fetchedProperty.name}</h1>
            </div>
         </div>

         <div id='property-content'>
            <div id='property-images'>
                <img id='property-primary-image' src={fetchedProperty.images[1]} alt='house' onClick={() => clickImageHandler(fetchedProperty.images[1])} />
                <div id='property-secondary-images'>
                  <div className='secondary-image'>
                        <img src={fetchedProperty.images[2]} onClick={() => clickImageHandler(fetchedProperty.images[2])} alt="house" />
                  </div> 
                  <div className='secondary-image'>
                        <img src={fetchedProperty.images[3]} onClick={() => clickImageHandler(fetchedProperty.images[3])} alt="house" />
                  </div>
                    
                </div>
            </div>
            <div id='property-description'>
                <p> {fetchedProperty.description}
                </p>
                <p><b className='property-info'>Status : </b> {fetchedProperty.status}</p>
                <p><b className='property-info'>Type : </b> {fetchedProperty.type}</p>
                <p><b className='property-info'>Price : </b> {fetchedProperty.price} €</p>
                <p><b className='property-info'>Site Size : </b> {fetchedProperty.size} m²</p>
                <p><b className='property-info'>Number of bedrooms : </b> {fetchedProperty.numberOfBedrooms} rooms</p>
                <p><b className='property-info'>Number of bathrooms : </b> {fetchedProperty.numberOfBathrooms} bathroom</p>                
                <p><b className='property-info'>Year of construction : </b> {fetchedProperty.year}</p> 
                <p><b className='property-info'>Garages : </b> {fetchedProperty.numberOfGarages}</p>
                <div ><b className='property-info'>Extras : </b> <div className='extras'>{extras.map(e=> <div className ='extra' key={e.name}><e.Icon/> {e.name}</div>)}</div> </div>
            </div>

        </div>
        <hr></hr>

        <div id='contact-section'>
            <div id='agency-info'>
                <span>This property is offered by</span> <b className='property-info'>{fetchedProperty.agency}</b>
            </div>
                <Button variant="contained" size='large' id='contact-button' type='submit' onClick={() => contactButtonHandler()}> 
                    {contactButtonClicked ? fetchedProperty.contactNumber : 'Contact'}
                </Button>
        </div>

        {imageToOpen !== '' &&    
            <div id='selected-image'>
                <div id='backdrop' onClick={()=> closeImageHandler()}></div>
                <ArrowBack id='arrow-back' className='arrow' onClick = {()=> backImageOpen(imageToOpen)}/>
                <img src= {imageToOpen} alt='house'/>
                <CloseIcon  className="btn-close" onClick={() => closeImageHandler()}/>
                <ArrowForward className='arrow' id='arrow-forward' onClick = {()=> forwardImageOpen(imageToOpen)}/>
            </div>
        }
         
    </div>
    );
}

export default Property;