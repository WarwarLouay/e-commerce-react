/* eslint-disable no-unused-vars */
import React from 'react';
import classes from './Carousel.module.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
                <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt = '' />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-2.jpg" alt = '' />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt = '' />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-4.jpg" alt = '' />
            </SwiperSlide>
        </Swiper>
    )
}

export default Carousel
