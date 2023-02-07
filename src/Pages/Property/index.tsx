
import './Property.scss'
import CloseIcon from '@mui/icons-material/Close';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';



const Property: FC = ()=> {

    const {propertyId} = useParams();
    
    //fetch property by id
    const fetchedProperty = {
        id: '3',
        name: 'Modern Villa',
        numberOfRooms: 3,
        numberOfBathrooms: 1,
        size: 200,
        description: "Company non lorem ac erat suscipit bibendum. Nulla facilisi. Sedeuter nunc volutpat, mollis sapien vel, conseyer turpeutionyer masin libero sempe. Fusceler mollis augue sit amet hendrerit vestibulum. Duisteyerionyer venenatis lacus.",
        year: '2021',
        broker: 'John Wattson',
        agency: 'Era',
        topImg: 'https://www.sunset.com/wp-content/uploads/medium_2x/hometour-Klopf-Architect-Sacramento-covered-porch-Mariko-Reed-0621.jpg',
        primaryImg: 'https://www.mydomaine.com/thmb/dke2LC6lH21Pvqwd2lI6AIutnDY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SuCasaDesign-Modern-9335be77ca0446c7883c5cf8d974e47c.jpg',
        secondaryImg1: 'https://www.cuded.com/wp-content/uploads/2013/04/Caruth-Boulevard-Residence-by-Tom-Reisenbichler-1.jpg',
        secondaryImg2: 'https://www.sunset.com/wp-content/uploads/medium_2x/hometour-Klopf-Architect-Sacramento-covered-porch-Mariko-Reed-0621.jpg'
    }


    const [imageToOpen, SetImageToOpen] = useState('');

    const clickImageHandler = (imgUrl: string) =>{
        SetImageToOpen(imgUrl);
    }

    const closeImageHandler = () =>{
        SetImageToOpen(oldValue => oldValue = '');
    }
    
    return (
    <div id='property-main'>
         <div id='top-image' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${fetchedProperty.topImg})` }}>
            <div>
                
                <h1> Name of the property</h1>
            </div>
         </div>

         <div id='property-content'>
            <div id='property-images'>
                <img id='property-primary-image' src={fetchedProperty.primaryImg} onClick={() => clickImageHandler(fetchedProperty.primaryImg)} />
                <div id='property-secondary-images'>
                    <img src={fetchedProperty.secondaryImg1} onClick={() => clickImageHandler(fetchedProperty.secondaryImg1)} alt="house" />
                    <img src={fetchedProperty.secondaryImg2} onClick={() => clickImageHandler(fetchedProperty.secondaryImg2)} alt="house" /> 
                </div>
            </div>
            <div id='property-description'>
                <p> Company non lorem ac erat suscipit bibendum. Nulla facilisi. Sedeuter nunc volutpat, 
                    mollis sapien vel, conseyer turpeutionyer masin libero sempe. Fusceler mollis augue 
                    sit amet hendrerit vestibulum. Duisteyerionyer venenatis lacus.
                </p>
                <p> Villa gravida eros ut turpis interdum ornare. Interdum et malesu they adamale fames ac
                    anteipsu pimsine faucibus. Curabitur arcu site feugiat in torto.
                </p>
                <p><b className='property-info'>Price : </b> 120 000 €</p>
                <p><b className='property-info'>Number of rooms : </b> 3 rooms</p>
                <p><b className='property-info'>Number of bathrooms : </b> 1 bathroom</p>
                <p><b className='property-info'>Site Size : </b> 12ha</p>
                <p><b className='property-info'>Year of construction : </b> July 2021</p> 
            </div>
           

          
         </div>
        {imageToOpen != '' &&  
            <>
                <div id='backdrop' onClick={()=> closeImageHandler()}></div>
                <div id='selected-image'>
                    <CloseIcon  className="btn-close" onClick={() => closeImageHandler()}/>
                    <img src= {imageToOpen} />
                </div>
            </>
        }
         
    </div>
    );
}

export default Property;