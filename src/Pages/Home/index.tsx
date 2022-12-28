import './Home.scss';
import { FC, useRef } from 'react'

import { useNavigate } from "react-router-dom";

import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

import SlideshowPropertySlide from '../../interfaces/SlideShowSlide'

import HouseIcon from '@mui/icons-material/House';
import ApartmentIcon from '@mui/icons-material/Apartment';
import VillaIcon from '@mui/icons-material/Villa';
import LandscapeIcon from '@mui/icons-material/Landscape';

const Home: FC = () => {

    const navigate = useNavigate();

    const slides: SlideshowPropertySlide[] = [
        {
            image: {
                src: 'assets/images/modern_house_1.jpg',
                alt: 'house'
            },
            propertyType: 'Vacation',
            header: 'Many beatuiful sea views',
            description: 'Advice from the ocean: Be shore of yourself. Come out of your shell. Take time to coast. Sea life’s beauty. Don’t get so tide down on work that you miss out on life’s beautiful waves.'
        }, {
            image: {
                src: 'assets/images/modern_house_6.jpg',
                alt: 'house'
            },
            propertyType: 'After busy week',
            header: 'Hidden among the trees',
            description: 'The forest is not a resource for us, it is life itself. It is the only place for us to live.'
        }, {
            image: {
                src: 'assets/images/modern_house_8.jpg',
                alt: 'house'
            },
            propertyType: 'Everything at hand',
            header: 'In the heart of the city',
            description: 'No city should be too large for a man to walk out of in a morning.'
        }
    ]

    const splideRef = useRef<Splide>(null);

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
            <div>
                <Splide
                    ref={splideRef}
                    options={{
                        rewindByDrag: true,
                        type: 'loop',
                        autoplay: false,
                        interval: 3000,
                        pauseOnHover: true,
                        arrows: false,
                        height: '100vh',
                    }}>
                    {slides.map(s =>
                        <SplideSlide key={s.image.src}>
                            <div className='home-slideshow-slide' style={{ backgroundImage: `url(${s.image.src})` }}>
                                <div>
                                    <h5 className='home-slide-property-type'>{s.propertyType}</h5>
                                    <h2 className='home-slide-header'>{s.header}</h2>
                                    <p className='home-slide-description'>{s.description}</p>
                                </div>
                            </div>
                        </SplideSlide>
                    )}
                </Splide>
            </div>
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
        </div >
    )
}

export default Home;