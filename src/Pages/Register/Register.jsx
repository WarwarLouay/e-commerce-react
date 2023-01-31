import React from 'react';
import axios from 'axios';
import { Card, Input, Spacer, Button, Loading } from "@nextui-org/react";
import classes from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';

const Register = () => {

    const [t] = useTranslation();

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const registerHandler = async () => {
        setIsLoading(true);
        if (!fullName || !email || !phone || !password) {
            setMessage('Please fill all information');
            setOpen(true);
        } else if (confirmPassword !== password) {
            setMessage('Password mismatch.');
            setOpen(true);
        } else {
            try {
                const { data } = await axios.post('http://localhost:4000/api/user', {
                fullName, email, phone, password,
            }, { withCredentials: true });
                if (data.message === 'Email already exist') {
                    setMessage(`${t('an_account_already_created')}`);
                    setOpen(true);
                }
                if (!data.message) {
                    navigate('/login');
                }
                console.log(data);
            } catch (err) {
                setMessage(`${t('something_wrong')}`);
                setOpen(true);
            }
        }
        setIsLoading(false);
    }

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
        <div className={classes.body}>
            <h3>{t('welcome_back')}</h3>
            <Card className={classes.card} css={{ mw: "400px" }}>
                <Card.Body>
                    <Spacer y={1.6} />
                    <Input placeholder={t('name')} name='name' onChange={(e) => setFullName(e.target.value)} />
                    <Spacer y={1.6} />
                    <Input placeholder={t('email')} name='email' onChange={(e) => setEmail(e.target.value)} />
                    <Spacer y={1.6} />
                    <Input
                        labelLeft="+961"
                        placeholder={t('phone')}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <Spacer y={1.6} />
                    <Input.Password placeholder={t('password')} name='password' onChange={(e) => setPassword(e.target.value)} />
                    <Spacer y={1.6} />
                    <Input.Password placeholder={t('password')} name='password' onChange={(e) => setConfirmPassword(e.target.value)} />
                    <Spacer y={1.6} />
                    {!isLoading ? <Button shadow color="gradient" auto
                        onClick={registerHandler} >
                        {t('create_account')}
                    </Button>
                        :
                        <Button shadow color="gradient" auto>
                            <Loading type="points" color="currentColor" size="sm" />
                        </Button>}
                    <Spacer y={1.6} />
                    <Link to='/login'>{t('login')}</Link>
                </Card.Body>
            </Card>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Register
