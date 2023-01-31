import React from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Text, Badge, Dropdown, Avatar } from "@nextui-org/react";
import { useTranslation } from 'react-i18next';
import { GiCheckMark } from 'react-icons/gi';

const NavBar = ({ cart, favorites, logout }) => {

    const [t, i18n] = useTranslation();

    const navigate = useNavigate();

    const [cookie, removeCookie] = useCookies([]);
    const [isIn, setIsIn] = React.useState(false);

    React.useEffect(() => {
        const verifyUser = async () => {
            if (!cookie.jwt) {
            } else {
                const { data } = await axios.post('http://localhost:4000/api/user/auth', {}, { withCredentials: true });
                if (!data.status) {
                    setIsIn(false);
                } else {
                    setIsIn(true);
                }
            }
        };
        verifyUser();
    }, [cookie, removeCookie, cart, favorites]);

    const logOut = () => {
        removeCookie('jwt');
        localStorage.removeItem('uid');
        navigate('/');
        setIsIn(false);
        logout();
    }

    return (
        <Navbar isBordered variant='floating'>
            <Navbar.Brand>
                {/*<AcmeLogo />*/}
                <Text b color="inherit" hideIn="xs">
                    BP {t('shop')}
                </Text>
            </Navbar.Brand>
            {isIn ? <Navbar.Content>
                <Badge style={{ cursor: 'pointer' }} color="error" content={favorites ? favorites.length : 0}>
                    <Link to='/favorite' style={{ color: 'black' }}>
                        <svg style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                        </svg>
                    </Link>
                </Badge>
                <Link to='/cart' style={{ color: 'black' }}>
                    <Badge style={{ cursor: 'pointer' }} color="error" content={cart ? cart.length : 0}>
                        <svg style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="6" cy="19" r="2" />
                            <circle cx="17" cy="19" r="2" />
                            <path d="M17 17h-11v-14h-2" />
                            <path d="M6 5l14 1l-1 7h-13" />
                        </svg>
                    </Badge>
                </Link>
                <Dropdown placement="bottom-right">
                    <Navbar.Item>
                        <Dropdown.Trigger>
                            <Avatar
                                bordered
                                as="button"
                                color="primary"
                                size="md"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </Dropdown.Trigger>
                    </Navbar.Item>
                    <Dropdown.Menu
                        aria-label="User menu actions"
                        color="primary"
                        onAction={(actionKey) => console.log({ actionKey })}
                    >
                        <Dropdown.Item key="Profile">
                            {t('profile')}
                        </Dropdown.Item>
                        <Dropdown.Item key="Shipping_Address">
                            <Link style={{ color: 'black', textDecoration: 'none' }} to='shipping'>
                                {t('shipping_address')}
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item key="Orders" >
                            <Link style={{ color: 'black', textDecoration: 'none' }} to='order'>{t('orders')}</Link>
                        </Dropdown.Item>
                        <Dropdown.Item key="Language">
                            <Link style={{ color: 'black', textDecoration: 'none' }} to='language'>{t('language')}</Link>
                        </Dropdown.Item>
                        <Dropdown.Item key="logout" withDivider color="error">
                            <div onClick={logOut}>{t('log_out')}</div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar.Content>

                :
                <Navbar.Content>
                    <Navbar.Link color="inherit" href="/login">
                        {t('login')}
                    </Navbar.Link>

                    <Dropdown placement="bottom-right">
                        <Navbar.Item>
                            <Dropdown.Trigger>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-world" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <circle cx="12" cy="12" r="9" />
                                    <line x1="3.6" y1="9" x2="20.4" y2="9" />
                                    <line x1="3.6" y1="15" x2="20.4" y2="15" />
                                    <path d="M11.5 3a17 17 0 0 0 0 18" />
                                    <path d="M12.5 3a17 17 0 0 1 0 18" />
                                </svg>
                            </Dropdown.Trigger>
                        </Navbar.Item>
                        <Dropdown.Menu
                            aria-label="User menu actions"
                            color="primary"
                            onAction={(actionKey) => { i18n.changeLanguage(actionKey); localStorage.setItem('language', actionKey) }}
                        >
                            <Dropdown.Item key="en">
                                <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                    <img
                                        src="https://flagcdn.com/us.svg"
                                        alt="English" style={{ width: '30px', height: '20px' }} />
                                    English
                                    {i18n.language  === 'en' ? <b><GiCheckMark /></b> : <b></b>}
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item key="ar">
                                <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                    <img
                                        src="https://flagcdn.com/sa.svg"
                                        alt="Arabic" style={{ width: '30px', height: '20px' }} />
                                    العربية
                                    {i18n.language  === 'ar' ? <b><GiCheckMark /></b> : <b></b>}
                                </div>
                            </Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Content>}
        </Navbar>
    )
}

export default NavBar
