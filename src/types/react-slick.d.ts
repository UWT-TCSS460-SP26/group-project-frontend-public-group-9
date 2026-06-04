import 'react-slick';
import { RefObject } from 'react';

declare module 'react-slick' {
  interface CarouselSettings extends Omit<Settings, 'asNavFor'> {
    asNavFor?: RefObject<null> | Slider;
  }
}