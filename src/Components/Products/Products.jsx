import React from 'react';
import Request from '../../Config/Request';
import { useNavigate } from 'react-router-dom';
import { createStyles, Image, Card, Text, Group } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import classesCSS from './Products.module.css';
import { useTranslation } from 'react-i18next';

const useStyles = createStyles((theme, _params, getRef) => ({
    price: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    carousel: {
        '&:hover': {
            [`& .${getRef('carouselControls')}`]: {
                opacity: 1,
            },
        },
    },

    carouselControls: {
        ref: getRef('carouselControls'),
        transition: 'opacity 150ms ease',
        opacity: 0,
    },

    carouselIndicator: {
        width: 4,
        height: 4,
        transition: 'width 250ms ease',

        '&[data-active]': {
            width: 16,
        },
    },
}));

const Products = ({ products, isIn, onAddToCart, onRequest }) => {

    const [t, i18n] = useTranslation();
    const { classes } = useStyles();

    // const slides = images.map((image) => (
    //     <Carousel.Slide key={image}>
    //         <Image src={image} height={220} />
    //     </Carousel.Slide>
    // ));

    const navigate = useNavigate();
    const request = new Request();

    const user = localStorage.getItem('uid');

    const addToCart = async (product) => {
        const productId = product._id;
        const qty = 1;
        const data = { user, productId, qty };
        if (isIn === true) {
            try {
                await request.addToCart(data);
                onAddToCart(data);
            } catch (error) {
                console.log(error);
            }
        } else {
            navigate('/login');
        }
    };

    const toggleFavorite = async (product) => {
        const data = { user, product };
        if (isIn === true) {
            await request.toggleFavorites(data);
            onRequest();
        } else {
            navigate('/login');
        }
    };

    return (
        <div className='container'>
            <h3>{t('products')}</h3>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper"
            >
                {products.map((product) => {
                    return (
                        <SwiperSlide className={classesCSS.swiperSlider}>
                            <Card radius="md" withBorder p="xl">
                                <Card.Section>
                                    <Carousel
                                        withIndicators
                                        loop
                                        classNames={{
                                            root: classes.carousel,
                                            controls: classes.carouselControls,
                                            indicator: classes.carouselIndicator,
                                        }}
                                    >
                                        <Carousel.Slide key={product._id}>
                                            <Image src={`http://localhost:4000${product.productImage}`} height={220} />
                                        </Carousel.Slide>
                                    </Carousel>
                                </Card.Section>

                                <Group position="apart" mt="lg">
                                    <Text weight={500} size="lg">
                                        {i18n.language === 'en' ? product.productEngName : product.productArName}
                                    </Text>

                                    <Group spacing={5}>
                                        <Text size="xs" weight={500}>
                                            {product.productPrice}$
                                        </Text>
                                    </Group>
                                </Group>

                                <Group position="apart" mt="lg">
                                    <Text weight={500} size="lg">

                                    </Text>

                                    <Group spacing={5}>
                                        <Text size="xs" weight={500}>
                                            {
                                                product.usersFavorite.includes(user) ? <AiFillHeart style={{ cursor: 'pointer' }} onClick={() => toggleFavorite(product._id)} size={25} color='red' /> : <AiOutlineHeart style={{ cursor: 'pointer' }} onClick={() => toggleFavorite(product._id)} size={25} color='red' />
                                            }
                                        </Text>
                                        <Text size="xs" weight={500}>
                                            <svg style={{ cursor: 'pointer' }} onClick={() => addToCart(product)} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <circle cx="6" cy="19" r="2" />
                                                <circle cx="17" cy="19" r="2" />
                                                <path d="M17 17h-11v-14h-2" />
                                                <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
                                                <path d="M15 6h6m-3 -3v6" />
                                            </svg>
                                        </Text>
                                    </Group>
                                </Group>
                            </Card>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default Products
