'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, RefObject } from 'react';
import Slider, { type CarouselSettings } from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { usePopularMovies } from '@/hooks/usePopularMovies';
import { usePopularShows } from '@/hooks/usePopularShows';

import 'react-slick';

export function MovieCarousel(settings?: { slider?: CarouselSettings; }) {
    const { response, loading, error } = usePopularMovies();
    
    const carouselSettings = typeof settings === 'undefined' || typeof settings.slider === 'undefined' ? {
        dots: false,
        infinite: true,
        speed: 1500,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    }
    : settings.slider;
    
    return (
        <div>
            {loading || error ? 
                <svg className="m-auto size-5 animate-spin ..." viewBox="0 0 24 24">
                </svg>
                :
                <Slider {...carouselSettings} className="w-40 sm:w-80 mx-7">
                    {response!.results.map((movie) => (
                        <div className="relative h-72 sm:h-128">
                            <Link className="h-72 sm:h-128" href={`/movies/${movie.id}`}>
                                <Image
                                    className="peer/poster w-full h-auto"
                                    src={movie.posterUrl}
                                    loading="eager"
                                    width={512}
                                    height={768}
                                    alt={movie.title + " poster"}
                                />
                                <div className="hidden peer-hover/poster:block hover:block absolute z-2 top-0 left-0 bg-foreground/75 p-2 text-background">
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

export function ShowCarousel(settings?: { slider?: CarouselSettings; }) {
    const { response, loading, error } = usePopularShows();
    
    const carouselSettings = typeof settings === 'undefined' || typeof settings.slider === 'undefined' ? {
        dots: false,
        infinite: true,
        speed: 1500,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    }
    : settings.slider;
    
    return (
        <div>
            {loading || error ?
                <svg className="m-auto size-5 animate-spin ..." viewBox="0 0 24 24">
                </svg>
                :
                <Slider {...carouselSettings} className="w-40 sm:w-80 mx-7">
                    {response!.results.map((show) => (
                        <div className="relative h-72 sm:h-128">
                            <Link className="h-72 sm:h-128" href={`/shows/${show.id}`}>
                                <Image
                                    className="peer/poster w-full h-auto"
                                    src={show.posterUrl}
                                    loading="eager"
                                    width={512}
                                    height={768}
                                    alt={show.title + " poster"}
                                />
                                <div className="hidden peer-hover/poster:block hover:block absolute z-2 top-0 left-0 bg-foreground/75 p-2 text-background">
                                    <h3 className="text-md font-bold">{show.title}</h3>
                                    <p>&emsp;{show.synopsis}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            }
        </div>
    );
}

export default function Carousels() {
    // Need to check if autoplay is enabled for each browser implementation
    // Default to off for accessibility
    let isAutoplayEnabled = false;
    if ('getAutoplayPolicy' in navigator) {
        // Firefox implementation
        // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getAutoplayPolicy
        // @ts-ignore
        isAutoplayEnabled = navigator.getAutoplayPolicy('mediaelement') as string == 'allowed'
    } else if (typeof window !== 'undefined' && 'AudioContext' in window) {
        // More universal implementation (who??)
        // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
        const context = new window.AudioContext();
        isAutoplayEnabled = context.state == 'running';
    } else if (typeof window !== 'undefined' && 'webkitAudioContext' in window) {
        // Webkit implementation
        // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
        // @ts-ignore
        const context = new window.webkitAudioContext();
        isAutoplayEnabled = context.state == 'running';
    }
    
    const carouselSettings = {
        dots: false,
        infinite: true,
        speed: 1500,
        autoplaySpeed: 4500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: isAutoplayEnabled,
    }

    return (
        <div className="flex flex-auto flex-wrap items-center justify-center">
            <MovieCarousel slider={carouselSettings} /> {/* no idea how to fix this. it works. */}
            <ShowCarousel slider={carouselSettings} />
        </div>
    );
}