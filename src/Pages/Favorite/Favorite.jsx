/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Request from '../../Config/Request';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';
import { createStyles, Image, Card, Text, Group } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { AiFillHeart } from 'react-icons/ai';
import { Col, Row } from 'react-bootstrap';
import classesCSS from './Favorite.module.css';
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

const Favorite = ({ cart, isIn, logout, onAddToCart, onRequest }) => {

    const [i18n] = useTranslation();
    const { classes } = useStyles();

    const user = localStorage.getItem('uid');

    const navigate = useNavigate();
    const request = new Request();

    const [favorites, setFavorites] = React.useState([]);

    const callPage = async () => {
        if(!isIn) {
            navigate('/login');
        }

        const data = { user };

        const favorite = await request.getFavorite(data);
        setFavorites(favorite.data);
        console.log(favorites);
    };

    React.useEffect(() => {
        callPage();
    }, []);

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
            callPage();
        } else {
            navigate('/login');
        }
    };

    return (
        <div>
            <NavBar cart={cart} favorites={favorites} isIn={isIn} logout={logout} />
            <div className='container'>
            <Row>
            {
                favorites.map((product) => {
                    return <React.Fragment>
                      <Col className={`col-4 ${classesCSS.card}`} style={{margin: '5% 0'}}>
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
                                <Carousel.Slide key={product.product._id}>
                                    <Image src={`http://localhost:4000${product.product.productImage}`} height={220} />
                                </Carousel.Slide>
                            </Carousel>
                        </Card.Section>

                        <Group position="apart" mt="lg">
                            <Text weight={500} size="lg">
                                {i18n.language === 'en' ? product.product.productEngName : product.product.productArName}
                            </Text>

                            <Group spacing={5}>
                                <Text size="xs" weight={500}>
                                    {product.product.productPrice}$
                                </Text>
                            </Group>
                        </Group>

                        <Group position="apart" mt="lg">
                            <Text weight={500} size="lg">

                            </Text>

                            <Group spacing={5}>
                                <Text size="xs" weight={500}>
                                    <AiFillHeart style={{ cursor: 'pointer' }} onClick={() => toggleFavorite(product.product._id)} size={25} color='red' />
                                </Text>
                                <Text size="xs" weight={500}>
                                    <svg style={{ cursor: 'pointer' }} onClick={() => addToCart(product.product)} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
                      </Col>
                    </React.Fragment>
                })
            }
            </Row>
            </div>
        </div>
    )
}

export default Favorite
