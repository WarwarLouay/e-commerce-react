/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Card, Input, Spacer, Button, Loading } from "@nextui-org/react";
import classes from './ShippingAddress.module.css';
import Request from '../../Config/Request';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ShippingAddress = () => {

    const user = localStorage.getItem('uid');
    const request = new Request();

    const [isLoading, setIsLoading] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [severity, setSeverity] = React.useState('');

    const [address, setAddress] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [building, setBuilding] = React.useState('');

    const callPage = async () => {
        const data = { user };

        const shippingAddress = await request.getShippingAddress(data);
        setAddress(shippingAddress.data.Address);
        setStreet(shippingAddress.data.Street);
        setBuilding(shippingAddress.data.Building);
        console.log('nhuj')
    };

    React.useEffect(() => {
        callPage();
    }, []);

    const changeAddressHandler = async () => {
        setIsLoading(true);
        const data = { user, address, street, building };
        try {
            await request.updateShippingAddress(data);
            setMessage('Shipping Adddress Updated');
            setSeverity('info');
            setOpen(true);
        } catch (error) {
            setMessage('Something Wrong');
            setSeverity('error');
            setOpen(true);
        }
        setIsLoading(false);
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
        <div className='container'>
            <div className={classes.shipping}>
                <h3>BP Shop</h3>

                <Card className={classes.card} css={{ mw: "400px" }}>
                    <Card.Body>
                        <Spacer y={1.6} />
                        <Input labelPlaceholder="Address" name='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                        <Spacer y={1.6} />
                        <Input labelPlaceholder="Street" name='street' value={street} onChange={(e) => setStreet(e.target.value)} />
                        <Spacer y={1.6} />
                        <Input labelPlaceholder="Building" name='building' value={building} onChange={(e) => setBuilding(e.target.value)} />
                        <Spacer y={1.6} />
                        {!isLoading ? <Button shadow color="gradient" auto
                            onClick={changeAddressHandler} >
                            Save
                        </Button>
                            :
                            <Button shadow color="gradient" auto>
                                <Loading type="points" color="currentColor" size="sm" />
                            </Button>}
                        <Spacer y={1.6} />
                    </Card.Body>
                </Card>
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ShippingAddress
