/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Spacer, Button, Loading } from "@nextui-org/react";
import classes from './ShippingAddress.module.css';
import Request from '../../Config/Request';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';

const ShippingAddress = ({ isIn }) => {

    const [t] = useTranslation();

    const user = localStorage.getItem('uid');
    const request = new Request();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [severity, setSeverity] = React.useState('');

    const [address, setAddress] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [building, setBuilding] = React.useState('');

    const callPage = async () => {
        if(!isIn) {
            navigate('/login');
        }

        const data = { user };

        const shippingAddress = await request.getShippingAddress(data);
        setAddress(shippingAddress.data.Address);
        setStreet(shippingAddress.data.Street);
        setBuilding(shippingAddress.data.Building);
    };

    React.useEffect(() => {
        callPage();
    }, []);

    const changeAddressHandler = async () => {
        setIsLoading(true);
        const data = { user, address, street, building };
        try {
            await request.updateShippingAddress(data);
            setMessage(`${t('shipping_adddress_updated')}`);
            setSeverity('info');
            setOpen(true);
        } catch (error) {
            setMessage(`${t('something_wrong')}`);
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
                <h3>BP {t('shop')}</h3>

                <Card className={classes.card} css={{ mw: "400px" }}>
                    <Card.Body>
                        <Spacer y={1.6} />
                        <Input labelPlaceholder={t('address')} name='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                        <Spacer y={1.6} />
                        <Input labelPlaceholder={t('street')} name='street' value={street} onChange={(e) => setStreet(e.target.value)} />
                        <Spacer y={1.6} />
                        <Input labelPlaceholder={t('building')} name='building' value={building} onChange={(e) => setBuilding(e.target.value)} />
                        <Spacer y={1.6} />
                        {!isLoading ? <Button shadow color="gradient" auto
                            onClick={changeAddressHandler} >
                            {t('save')}
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
