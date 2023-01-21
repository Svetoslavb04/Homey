import './Home.scss';
import { FC } from 'react'

import { useNavigate } from "react-router-dom";

import HouseIcon from '@mui/icons-material/House';
import ApartmentIcon from '@mui/icons-material/Apartment';
import VillaIcon from '@mui/icons-material/Villa';
import LandscapeIcon from '@mui/icons-material/Landscape';
import HomeSlideShow from './Components/HomeSlideShow';

const Home: FC = () => {

    const navigate = useNavigate();

    //Fetch top properties
    const topProperties = [
        {
            id: '1',
            image: {
                src: 'assets/images/modern_house_1.jpg',
                alt: 'house'
            },
            town: 'Sofia',
            name: 'Modern House'
        }, {
            id: '2',
            image: {
                src: 'assets/images/modern_house_2.jpg',
                alt: 'house'
            },
            town: 'Sofia',
            name: 'Modern House'
        }, {
            id: '3',
            image: {
                src: 'assets/images/modern_house_3.jpg',
                alt: 'house'
            },
            town: 'Sofia',
            name: 'Modern House'
        }, {
            id: '4',
            image: {
                src: 'assets/images/modern_house_4.jpg',
                alt: 'house'
            },
            town: 'Sofia',
            name: 'Modern House'
        }, {
            id: '5',
            image: {
                src: 'assets/images/modern_house_7.jpg',
                alt: 'house'
            },
            town: 'Sofia',
            name: 'Modern House'
        }, {
            id: '6',
            image: {
                src: 'assets/images/modern_house_8.jpg',
                alt: 'house'
            },
            town: 'Sofia',
            name: 'Modern House'
        }
    ]

    const handleTopPropertyClick = (id: string) => {

        navigate(`/properties/${id}`);

    }

    return (
        <div id='home-container'>
            <HomeSlideShow />
            <div id='home-property-cards'>
                <div className='home-property-card'>
                    <HouseIcon />
                    <h5>Houses</h5>
                </div>
                <div className='home-property-card'>
                    <ApartmentIcon />
                    <h5>Apartments</h5>
                </div>
                <div className='home-property-card'>
                    <VillaIcon />
                    <h5>Villas</h5>
                </div>
                <div className='home-property-card'>
                    <LandscapeIcon />
                    <h5>Landfields</h5>
                </div>
            </div>
            <div id="home-top-properties">
                <h2>Our top picks</h2>
                <div id='home-top-properties-container'>
                    <div>
                        {
                            topProperties.slice(0, 3)
                                .map(prop =>
                                    <div className='home-top-property' key={`${prop.name + prop.town + prop.image.src}`}>
                                        <div
                                            onClick={handleTopPropertyClick.bind(null, prop.id)}
                                            className='home-top-property-image-wrapper'
                                        >
                                            <img src={prop.image.src} alt={prop.image.alt} />
                                        </div>
                                        <div className='home-top-property-description'>
                                            <h5>{prop.town}</h5>
                                            <p>{prop.name}</p>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                    <div>
                        {
                            topProperties.slice(3)
                                .map(prop =>
                                    <div className='home-top-property' key={`${prop.name + prop.town + prop.image.src}`}>
                                        <div
                                            onClick={handleTopPropertyClick.bind(null, prop.id)}
                                            className='home-top-property-image-wrapper'
                                        >
                                            <img src={prop.image.src} alt={prop.image.alt} />
                                        </div>
                                        <div className='home-top-property-description'>
                                            <h5>{prop.town}</h5>
                                            <p>{prop.name}</p>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
            <div id='home-mission'>
                <h2>Our Mission</h2>
                <p>Finding a property buyer is not easy, nor is choosing your next home. That is why we have brought both parties under one roof here to facilitate their task.
                </p>
            </div>
        </div >
    )
}

export default Home;