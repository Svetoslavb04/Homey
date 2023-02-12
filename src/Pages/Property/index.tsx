import './Property.scss'
import CloseIcon from '@mui/icons-material/Close';
import ArrowBack from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForward from '@mui/icons-material/ArrowForwardIosRounded';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

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
        description: "Company non lorem ac erat suscipit bibendum. Nulla facilisi. Sedeuter nunc volutpat, mollis sapien vel, conseyer turpeutionyer masin libero sempe. Fusceler mollis augue sit amet hendrerit vestibulum. Duisteyerionyer venenatis lacus.",
        year: '2021',
        agency: 'Era',
        images: ['https://www.sunset.com/wp-content/uploads/medium_2x/hometour-Klopf-Architect-Sacramento-covered-porch-Mariko-Reed-0621.jpg',
                'https://www.mydomaine.com/thmb/dke2LC6lH21Pvqwd2lI6AIutnDY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SuCasaDesign-Modern-9335be77ca0446c7883c5cf8d974e47c.jpg',
                 'https://www.cuded.com/wp-content/uploads/2013/04/Caruth-Boulevard-Residence-by-Tom-Reisenbichler-1.jpg', 
                 'https://www.sunset.com/wp-content/uploads/medium_2x/hometour-Klopf-Architect-Sacramento-covered-porch-Mariko-Reed-0621.jpg'],
        extras: ['Wifi', 'Air Conditioning', 'Fire Place', 'Balcony', 'Fitness', 'Swimming Pool', 'Parking']
    }

    const [imageToOpen, SetImageToOpen] = useState('');

    const clickImageHandler = (imgUrl: string) =>{
        SetImageToOpen(imgUrl);
    }

    const closeImageHandler = () =>{
        SetImageToOpen(oldValue => oldValue = '');
    }
    
    const IconifyiedExtras = [ {
        label: 'Wifi',
        Icon: WifiIcon,
        name: 'wifi'
      }, {
        label: 'Air Conditioning',
        Icon: AcUnitIcon,
        name: 'airConditioning'
      }, {
        label: 'Fire Place',
        Icon: FireplaceIcon,
        name: 'fireplace'
      }, {
        label: 'Balcony',
        Icon: BalconyIcon,
        name: 'balcony'
      }, {
        label: 'Fitness',
        Icon: FitnessCenterIcon,
        name: 'fitness'
      }, {
        label: 'Swimming Pool',
        Icon: PoolIcon,
        name: 'swimmingPool'
      }, {
        label: 'Parking',
        Icon: LocalParkingIcon,
        name: 'parking'
      }];


      const ext = [];
    for (const extra of fetchedProperty.extras) {
        const claim = IconifyiedExtras.find(c => c.label === extra)
        if (claim) {
            console.log(claim);
            
            ext.push(`${<claim.Icon/>} ${claim.label}`);
        }
        
    }

    return (
    <div id='property-main'>
         <div id='top-image' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${fetchedProperty.images[0]})` }}>
            <div>  
                <h1> Name of the property</h1>
            </div>
         </div>

         <div id='property-content'>
            <div id='property-images'>
                <img id='property-primary-image' src={fetchedProperty.images[1]} onClick={() => clickImageHandler(fetchedProperty.images[1])} />
                <div id='property-secondary-images'>
                    <img src={fetchedProperty.images[2]} onClick={() => clickImageHandler(fetchedProperty.images[2])} alt="house" />
                    <img src={fetchedProperty.images[3]} onClick={() => clickImageHandler(fetchedProperty.images[3])} alt="house" /> 
                </div>
            </div>
            <div id='property-description'>
                <p> Company non lorem ac erat suscipit bibendum. Nulla facilisi. Sedeuter nunc volutpat, 
                    mollis sapien vel, conseyer turpeutionyer masin libero sempe. Fusceler mollis augue 
                    sit amet hendrerit vestibulum. Duisteyerionyer venenatis lacus.
                </p>
                <p><b className='property-info'>Status : </b> for sale</p>
                <p><b className='property-info'>Type : </b> Villa</p>
                <p><b className='property-info'>Price : </b> 120 000 €</p>
                <p><b className='property-info'>Site Size : </b> 120 m²</p>
                <p><b className='property-info'>Number of bedrooms : </b> 3 rooms</p>
                <p><b className='property-info'>Number of bathrooms : </b> 1 bathroom</p>                
                <p><b className='property-info'>Year of construction : </b> July 2021</p> 
                <p><b className='property-info'>Garages : </b> 1</p>
                <hr></hr>
                <p><b className='property-info'>Extras : </b> {ext} </p>
            </div>

         </div>
        {imageToOpen !== '' &&    
            <div id='selected-image'>
                <div id='backdrop' onClick={()=> closeImageHandler()}></div>
                <ArrowBack id='arrow-back' className='arrow' />
                <img src= {imageToOpen} />
                <CloseIcon  className="btn-close" onClick={() => closeImageHandler()}/>
                <ArrowForward className='arrow' id='arrow-forward'/>
            </div>
        }
         
    </div>
    );
}

export default Property;