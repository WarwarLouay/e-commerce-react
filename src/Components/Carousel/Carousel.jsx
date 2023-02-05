/* eslint-disable no-unused-vars */
import React from 'react';
import classes from './Carousel.module.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import image1 from '../../assets/images/slider-1.jpg';
import image2 from '../../assets/images/slider-2.jpg';
import image3 from '../../assets/images/slider-3.jpg';

const Carousel = () => {
    return (
        <Swiper
            spaceBetween={30}
            effect={"fade"}
            navigation={true}
            loop={true}
            pagination={{
                clickable: true,
            }}
            modules={[EffectFade, Navigation, Pagination]}
            className="mySwiper"
            style={{width: '100%', height: '450px'}}
        >
            <SwiperSlide>
                <img src={image1} alt = '' />
            </SwiperSlide>
            <SwiperSlide>
                <img src={image2} alt = '' />
            </SwiperSlide>
            <SwiperSlide>
                <img src={image3} alt = '' />
            </SwiperSlide>
        </Swiper>
    )
}

export default Carousel
