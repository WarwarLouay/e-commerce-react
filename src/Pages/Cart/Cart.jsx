/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Request from '../../Config/Request';
import { Grid, Card, User, Row, Button } from "@nextui-org/react";
import classes from './Cart.module.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Cart = () => {

    const user = localStorage.getItem('uid');
    const request = new Request();

    const [cart, setCart] = React.useState([]);

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [severity, setSeverity] = React.useState('');

    const callPage = async () => {
        const data = { user };

        const cart = await request.getCart(data);
        console.log(cart.data)
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
        })
    };

    const decreaseQty = (id) => {
        cart.forEach((element) => {
            if (element._id === id) {
                if (element.qty > 1) {
                    element.qty -= 1;
                }
            }
        })
    };

    const deleteProduct = async (productCart) => {
        const id = productCart._id;
        const data = { id };
        console.log(id);
        try {
            await request.deleteFromcart(data);
            setMessage(productCart.productId.productName + ' deleted.');
            setSeverity('info');
            setOpen(true);
            callPage();
        } catch {
            setMessage('Something Wrong!');
            setSeverity('error');
            setOpen(true);
        }
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
                                            <h5>{c.productId.productName}</h5>
                                            <h6>{c.productId.productPrice}$</h6>
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
                    <b>Total: </b>
                    <b>${totalAmount()}</b>
                </div>

                <div style={{padding: ' 0 5%'}}>
                <Button style={{width: '100%'}} shadow color="gradient" auto>
                    Check Out
                </Button>
                <br/>
                </div>

            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>

        </div>
    )
}

export default Cart
