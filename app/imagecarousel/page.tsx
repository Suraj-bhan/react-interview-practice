import React from 'react'
import ImageCarousel from './ImageCarousel'

const ImageCarouselPage = () => {
    const images = [
        "https://picsum.photos/id/1/400/200",
        "https://picsum.photos/id/2/400/200",
        "https://picsum.photos/id/3/400/200",
    ];
    return (
        <div className='page'>
            <h1>Image Carousel</h1>
            <ImageCarousel images={images} />
        </div>
    )
}

export default ImageCarouselPage