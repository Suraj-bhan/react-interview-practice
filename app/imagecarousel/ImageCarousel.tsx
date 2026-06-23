
"use client"

import Image from 'next/image';
import React, { TouchEvent, PointerEvent, useCallback, useEffect, useRef, useState } from 'react'
import classes from "./carousel.module.css"

const AUTO_PLAY_TIME = 3000;

const ImageCarousel = ({ images }: { images: string[] }) => {
    const [index, setIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const length = images.length;

    const handleNext = useCallback(() => {
        if (isAnimating) return;

        setIsAnimating(true);
        setIndex((prev) => (prev + 1) % length);

        setTimeout(() => setIsAnimating(false), 400); // match CSS
    }, [length, isAnimating]);


    const handlePrev = useCallback(() => {
        if (isAnimating) return;

        setIsAnimating(true);
        setIndex((prev) => (prev - 1 + length) % length)

        setTimeout(() => setIsAnimating(false), 400); // match CSS
    }, [length, isAnimating]);

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => handleNext(), AUTO_PLAY_TIME)
        return (() => clearInterval(timer))
    }, [handleNext, isHovered])


    const getVisibleSlides = () => {
        const prevIndex = (index - 1 + length) % length;
        const nextIndex = (index + 1) % length;

        return [
            { img: images[prevIndex], position: -1 },
            { img: images[index], position: 0 },
            { img: images[nextIndex], position: 1 }
        ]
    }

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0].clientX;
    }

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        touchEndX.current = e.touches[0].clientX;
    }

    const handleTouchEnd = () => {
        const diff = touchEndX.current - touchStartX.current;

        if (diff > 50) handleNext();
        else if (diff < -50) handlePrev();
    }


    const onPointerDown = (e: PointerEvent) => {
        if (e.pointerType !== "touch") return; // only touch
        touchStartX.current = e.clientX;
    };

    const onPointerMove = (e: PointerEvent) => {
        if (e.pointerType !== "touch") return;
        touchEndX.current = e.clientX;
    };

    const onPointerUp = () => {
        const diff = touchStartX.current - touchEndX.current;

        if (diff > 10) handleNext();
        else if (diff < -10) handlePrev();
    };

    return (
        <div className={classes.container}>
            <div
                className={classes.slider}
                style={{
                    transform: `translateX(-${index * 100}%)`,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                // onTouchStart={handleTouchStart} 
                // // onTouchEnd={handleTouchEnd} 
                // // onTouchMove={handleTouchMove} 
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
            >
                {images.map((img, i) => (
                    <Image
                        key={i}
                        src={img}
                        width={400}
                        height={400}
                        className={classes.image}
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        alt={`image ${i}`}
                    />
                ))}
            </div>
            <button onClick={handlePrev} className={classes.prevBtn}>Prev</button>
            <button onClick={handleNext} className={classes.nextBtn}>Next</button>
        </div>
    )
}

export default ImageCarousel

