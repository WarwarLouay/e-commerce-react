/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Moment from 'moment';
import Request from '../../Config/Request';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, Row } from "@nextui-org/react";
import { IoIosArrowForward } from 'react-icons/io'

const Order = ({ isIn }) => {

    const user = localStorage.getItem('uid');

    const navigate = useNavigate();
    const request = new Request();

    const [orders, setOrders] = React.useState([]);

    const callPage = async () => {
        if (!isIn) {
            navigate('/login');
        }

        const data = { user };

        const order = await request.getOrders(data);
        setOrders(order.data);
        console.log(orders);
    };

    React.useEffect(() => {
        callPage();
    }, []);

    return (
        <div className='container'>
            <Grid.Container gap={2} justify="space-between">
                {orders.map((order) => {
                    return (
                        <Grid onClick={() => navigate(`/order/${order._id}`)} xs={12}>
                            <Card style={{cursor: 'pointer'}}>
                                <Card.Body>
                                    <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <b>{order._id}</b>
                                            <b style={{ padding: '2% 5%', color: 'gray' }}>{Moment(order.date).format('LLL')}</b>
                                        </div>
                                        <div>
                                            <IoIosArrowForward />
                                        </div>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid.Container>
        </div>
    )
}

export default Order
