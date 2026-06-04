'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, RefObject } from 'react';
import Slider, { type Settings } from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { usePopularMovies } from '@/hooks/usePopularMovies';
import { usePopularShows } from '@/hooks/usePopularShows';

export function MovieCarousel(settings?: { slider?: Settings; }) {
    const { response, loading, error } = usePopularMovies();
    
    const carouselSettings = typeof settings === 'undefined' || typeof settings.slider === 'undefined' ? {
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
            }
            : settings.slider;
    
    return (
        <div>
            {loading || error ? 
                <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
                </svg>
                :
                <Slider {...carouselSettings} className="w-100 mx-auto">
                    {response!.results.map((movie) => (
                        <div className="relative">
                            <Link href={`/movies/${movie.id}`}>
                                <Image
                                    className="peer/poster"
                                    src={movie.posterUrl}
                                    width={512}
                                    height={768}
                                    alt={movie.title + " poster"}
                                />
                                <div className="hidden peer-hover/poster:block absolute z-2 top-0 left-0 bg-neutral-950/75 p-2">
                                    <h3 className="text-md font-bold">{movie.title}</h3>
                                    <p>&emsp;{movie.synopsis}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            }
        </div>
    );
}

export function ShowCarousel(settings?: { slider: Settings; }) {
    const { response, loading, error } = usePopularShows();
    
    const carouselSettings = typeof settings === 'undefined' || typeof settings.slider === 'undefined' ? {
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
            }
            : settings.slider;
    
    return (
        <div>
            {loading || error ? 
                <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
                </svg>
                :
                <Slider {...carouselSettings} className="w-100 mx-auto">
                    {response!.results.map((movie) => (
                        <div className="relative">
                            <Image
                                className="peer/poster"
                                src={movie.posterUrl}
                                width={512}
                                height={768}
                                alt={movie.title + " poster"}
                            />
                            <div className="hidden peer-hover/poster:block absolute z-2 top-0 left-0 bg-neutral-950/75 p-2">
                                <h3 className="fs-2 fw-bold">{movie.title}</h3>
                                <p>&emsp;{movie.synopsis}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            }
        </div>
    );
}

export default function Carousels() {
    const [nav1, setNav1] = useState<RefObject<null> | null>(null);
    const [nav2, setNav2] = useState<RefObject<null> | null>(null);
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);

    useEffect(() => {
        setNav1(sliderRef1);
        setNav2(sliderRef2);
    }, []);
    
    const carouselSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    }
    
    const slider1 = {
        ...carouselSettings,
        asNavFor: nav2,
        ref: (slider: RefObject<null>) => (sliderRef1 = slider)
    }
    
    const slider2 = {
        ...carouselSettings,
        asNavFor: nav1,
        ref: (slider: RefObject<null>) => (sliderRef2 = slider)
    }
    
    return (
        <div className="flex flex-auto flex-wrap mw-100 items-center justify-between">
            <MovieCarousel slider={slider1} /> {/* no idea how to fix this. it works. */}
            <ShowCarousel slider={slider2} />
        </div> 
    );
}