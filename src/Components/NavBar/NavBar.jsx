import React from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Button, Text, Badge, Dropdown, Avatar } from "@nextui-org/react";

const NavBar = ({ cart, favorites, logout }) => {
    
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
        navigate('/');
        setIsIn(false);
        logout();
    }

    return (
        <Navbar isBordered variant='floating'>
            <Navbar.Brand>
                {/*<AcmeLogo />*/}
                <Text b color="inherit" hideIn="xs">
                    BP Shop
                </Text>
            </Navbar.Brand>
            {/*<Navbar.Content hideIn="xs">
                <Navbar.Link href="#">Features</Navbar.Link>
                <Navbar.Link isActive href="#">Customers</Navbar.Link>
                <Navbar.Link href="#">Pricing</Navbar.Link>
                <Navbar.Link href="#">Company</Navbar.Link>
            </Navbar.Content>*/}
            {isIn ? <Navbar.Content>
                <Badge style={{ cursor: 'pointer' }} color="error" content={favorites ? favorites.length : 0}>
                    <svg style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                    </svg>
                </Badge>
                <Link to='/cart' style={{color: 'black'}}>
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
                            {/*<Dropdown.Item key="profile" css={{ height: "$18" }}>
                                <Text b color="inherit" css={{ d: "flex" }}>
                                    Signed in as
                                </Text>
                                <Text b color="inherit" css={{ d: "flex" }}>
                                    zoey@example.com
                                </Text>
                            </Dropdown.Item>*/}
                            <Dropdown.Item key="Profile">
                                Profile
                            </Dropdown.Item>
                            <Dropdown.Item key="Shipping_Address"><Link style={{color: 'black', textDecoration: 'none'}} to='shipping'>Shipping Address</Link></Dropdown.Item>
                            <Dropdown.Item key="Orders" >
                                Orders
                            </Dropdown.Item>
                            <Dropdown.Item key="Language">Language</Dropdown.Item>
                            <Dropdown.Item key="logout" withDivider color="error">
                                <div onClick={logOut}>Log Out</div>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
            </Navbar.Content>
            
                :
                <Navbar.Content>
                    <Navbar.Link color="inherit" href="/login">
                        Login
                    </Navbar.Link>
                    <Navbar.Item>
                        <Button auto flat>
                            Sign Up
                        </Button>
                    </Navbar.Item>
                </Navbar.Content>}
        </Navbar>
    )
}

export default NavBar
