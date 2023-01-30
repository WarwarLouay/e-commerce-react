/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Card, User } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from 'react-i18next';

const Categories = ({ categories }) => {

    const [t, i18n] = useTranslation();

    return (
        <div className='container'>
            <h3>{t('categories')}</h3>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper"
            >
                {categories.map((category) => {
                    return (
                        <SwiperSlide style={{width: '25%'}}>
                            <Card
                                isPressable
                                isHoverable
                                variant="bordered"
                                css={{ mw: "400px" }}
                            >
                                <Card.Body>
                                    <User squared src={`http://localhost:4000${category.categoryImage}`} css={{ p: 0 }}>
                                        {i18n.language === 'en' ? category.categoryEngName : category.categoryArName}
                                    </User>
                                </Card.Body>
                            </Card>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default Categories
