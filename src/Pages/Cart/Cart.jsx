/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Request from '../../Config/Request';
import { Grid, Card, User, Row, Button, Modal, Text } from "@nextui-org/react";
import classes from './Cart.module.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';

const Cart = ({ onAddToCart, onRequest, isIn }) => {

    const [t, i18n] = useTranslation();

    const user = localStorage.getItem('uid');
    const email = localStorage.getItem('uEmail');
    const request = new Request();
    const navigate = useNavigate();

    const [cart, setCart] = React.useState([]);

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [severity, setSeverity] = React.useState('');

    const [visible, setVisible] = React.useState(false);

    const [shipping, setShipping] = React.useState('');

    var cartOrder = [];

    const callPage = async () => {
        if(!isIn) {
            navigate('/login');
        }

        const data = { user };
        const cart = await request.getCart(data);
        setCart(cart.data);
    };

    var total = 0.0;

    const totalAmount = () => {
        cart.forEach((element) => {
            total += element.qty * Number(element.productId.productPrice);
        });
        return total.toFixed(2);
    };

    React.useEffect(() => {
        callPage();
        totalAmount();
    }, [total]);

    const increaseQty = (id) => {
        cart.forEach((element) => {
            if (element._id === id) {
                element.qty += 1;
            }
            onRequest();
        });
    };

    const decreaseQty = (id) => {
        cart.forEach((element) => {
            if (element._id === id) {
                if (element.qty > 1) {
                    element.qty -= 1;
                }
            }
            onRequest();
        });
    };

    const deleteProduct = async (productCart) => {
        const id = productCart._id;
        const data = { id, user };
        try {
            await request.deleteFromcart(data);
            setMessage(productCart.productId.productEngName + ' deleted.');
            setSeverity('info');
            setOpen(true);
            callPage();
            onAddToCart(data);
        } catch {
            setMessage('Something Wrong!');
            setSeverity('error');
            setOpen(true);
        }
    };

    const checkout = async () => {
        const data = { user };
        const shippingAddress = await request.getShippingAddress(data);
        if (shippingAddress.data.Address === '' || shippingAddress.data.Street === '' || shippingAddress.data.Building === '') {
            setMessage(`${t('please_update_your_shipping_address')}`);
            setSeverity('error');
            setOpen(true);
            setTimeout(() => {
                navigate('/shipping');
            }, 2000);
        } else {
            setShipping(shippingAddress.data._id);
            setVisible(true);
        }
    };

    const submitCheckoutHandler = async () => {
        cart.forEach((element) => {
            cartOrder.push(
                {
                    product: element.productId._id,
                    qty: element.qty
                }
            );
        });
        const product = cartOrder;
        const date = new Date().toISOString();
        const data = { product, user, shipping, total, date, email };
        const response = await request.checkout(data);
        if(response.data.shipping) {
            setVisible(false);
            setMessage('Thank you');
            setSeverity('success');
            setOpen(true);
            onAddToCart();
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
        console.log(response);
    };

    const editAddressHandler = () => {
        navigate('/shipping');
    };

    const closeHandler = () => {
        setVisible(false);
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <React.Fragment>
        {
            cart.length <= 0 ?
            <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%)', textAlign: 'center'}}>
              <h2>{t('cart_empty')}</h2>
              <h6><Link to='/'>{t('go_to_home')}</Link></h6>
            </div>
            : 
            <div>
            <div className='container'>
                <h3>Your Cart</h3>
                {cart.map((c) => {
                    return (
                        <Grid xs={10} style={{ position: 'relative', left: '50%', transform: 'translate(-50%)', margin: '3%' }}>
                            <Card>
                                <Card.Body>
                                    <Row style={{ justifyContent: 'space-between' }}>
                                        <User squared src={`http://localhost:4000${c.productId.productImage}`} css={{ p: 0 }}>
                                        {i18n.language === 'en' ? <h5>{c.productId.productEngName}</h5> : <h5>{c.productId.productArName}</h5>}
                                            <h6>${c.productId.productPrice}</h6>
                                        </User>
                                        <div style={{ cursor: 'pointer' }}>
                                            <svg onClick={() => deleteProduct(c)} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <line x1="4" y1="7" x2="20" y2="7" />
                                                <line x1="10" y1="11" x2="10" y2="17" />
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                            </svg>
                                            <div style={{ margin: '10% 0' }}>
                                                <button className={classes.qtyButton} onClick={() => decreaseQty(c._id)}>-</button>
                                                <b style={{ padding: '0 2px' }}>{c.qty}</b>
                                                <button className={classes.qtyButton} onClick={() => increaseQty(c._id)}>+</button>
                                            </div>
                                        </div>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Grid>
                    )
                })}
            </div>

            <div className={classes.bottom}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2%' }}>
                    <b>{t('total')} </b>
                    <b>${totalAmount()}</b>
                </div>

                <div style={{ padding: ' 0 5%' }}>
                    <Button onClick={checkout} style={{ width: '100%' }} shadow color="gradient" auto>
                    {t('check_out')}
                    </Button>
                    <br />
                </div>

            </div>

            <Modal
                closeButton
                blur
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Body>
                    <Text id="modal-title" size={18}>
                        {t('make_sure_you_put_the_correct_address_please')}
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="primary" onPress={editAddressHandler}>
                        {t('edit')}
                    </Button>
                    <Button auto color="warning" onPress={submitCheckoutHandler}>
                        {t('continue')}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>

        </div>
        }
        </React.Fragment>
    )
}

export default Cart
