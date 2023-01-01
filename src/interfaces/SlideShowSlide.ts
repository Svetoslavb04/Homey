export default interface SlideshowPropertySlide {
    image: {
        src: string,
        alt: string
    },
    propertyType: string,
    header: string,
    description: string
}