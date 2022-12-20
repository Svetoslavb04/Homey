import './Home.scss';
import { FC, useEffect, useRef } from 'react'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

import SlideshowPropertySlide from '../../interfaces/SlideShowSlide'

const Home: FC = () => {

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

    useEffect(() => {
        window.addEventListener('resize', () => {
            splideRef.current?.render()
        })

    }, [])

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

        </div>
    )
}

export default Home;