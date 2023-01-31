import React from 'react';
import axios from 'axios';
import Request from '../../Config/Request';
import { Card, Input, Spacer, Button, Loading } from "@nextui-org/react";
import classes from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { Col, Row } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';


const Login = ({ login }) => {

    const [t, i18n] = useTranslation();
    const request = new Request();

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [values, setValues] = React.useState({
        email: '',
        password: '',
    });

    const loginHandler = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.post('http://localhost:4000/api/user/login', {
                ...values,
            }, { withCredentials: true });
            if (data.user.message === 'Incorrect email') {
                setMessage(`${t('incorrect_email')}`);
                setOpen(true);
            }
            if (data.user.message === 'Incorrect password') {
                setMessage(`${t('incorrect_password')}`);
                setOpen(true);
            }
            if (!data.user.message) {
                login();
                navigate('/');
            }
            console.log(data);
            localStorage.setItem('uid', data.user._id);
            localStorage.setItem('uEmail', data.user.email);
        } catch (err) {
            setMessage(`${t('something_wrong')}`);
            setOpen(true);
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
                    <Input labelPlaceholder={t('email')} name='email' onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                    <Spacer y={1.6} />
                    <Input.Password labelPlaceholder={t('password')} name='password' onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                    <Spacer y={1.6} />
                    {!isLoading ? <Button shadow color="gradient" auto
                        onClick={loginHandler} >
                        {t('login')}
                    </Button>
                        :
                        <Button shadow color="gradient" auto>
                            <Loading type="points" color="currentColor" size="sm" />
                        </Button>}
                    <Spacer y={1.6} />
                    <Row>
                        <Col><hr /></Col>
                        {t('or')}
                        <Col><hr /></Col>
                    </Row>
                    <LoginSocialGoogle
                        client_id={"730557315418-2rhd1fpjb2geqpq548mquuf03svta7i5.apps.googleusercontent.com"}
                        scope="openid profile email"
                        discoveryDocs="claims_supported"
                        access_type="offline"
                        onResolve={async ({ provider, data }) => {
                            console.log(data);
                            const email = data.email;
                            const fullName = data.name;
                            const password = data.name;
                            const d = { email, fullName };
                            const response = await request.loginWithGoogle(d);
                            console.log(response);
                            if (response.data.message === "created" || response.data.message === "loggedin") {

                                console.log(email);
                                const { data } = await axios.post('http://localhost:4000/api/user/login', {
                                    email, password,
                                }, { withCredentials: true });
                                console.log(data);
                                if (!data.user.message) {
                                    login();
                                    navigate('/');
                                }
                                localStorage.setItem('uid', data.user._id);
                                localStorage.setItem('uEmail', data.user.email);
                            }

                            if (response.data.message === "Email already exist") {
                                setMessage(`${t('an_account_already_created')}`);
                                setOpen(true);
                            }
                        }}
                        onReject={(err) => {
                            console.log(err);
                        }}
                    >
                        <div className={classes.loginWithGoogle}>
                            <FcGoogle size={25} />
                            <b style={{
                                marginLeft: i18n.language === 'en' ? '5%' : '0',
                                marginRight: i18n.language === 'ar' ? '5%' : '0'
                            }}>
                                {t('login_with_google')}
                            </b>
                        </div>
                    </LoginSocialGoogle>
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

export default Login
