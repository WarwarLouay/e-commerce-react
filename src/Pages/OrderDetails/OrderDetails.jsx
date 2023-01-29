/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import Request from '../../Config/Request';
import { Grid, Card, User, Row, Badge } from "@nextui-org/react";

const OrderDetails = () => {

    const params = useParams();
    const request = new Request();

    const [isLoading, setIsLoading] = React.useState(false);
    const [orderDetails, setOrderDetails] = React.useState([]);
    
    React.useEffect(() => {
        callPage();
    }, []);

    async function callPage() {
        const response = await request.getOrderById(params.id);
        console.log(response.data);
        if (response) {
            setIsLoading(true);
            setOrderDetails(response.data);
            console.log(orderDetails);
        }
    };

    return (
        <div>
            {isLoading ? <div style={{ padding: '2% 5%' }}>
                <Grid.Container gap={2} justify="space-between">
                    {orderDetails.product.map((product) => {
                        return (
                            <Grid xs={12}>
                                <Card>
                                    <Card.Body>
                                        <Row style={{ justifyContent: 'space-between' }}>
                                            <User squared src={`http://localhost:4000${product.product.productImage}`} css={{ p: 0 }}>
                                                {product.product.productName}
                                            </User>
                                            <b>{product.product.productPrice}$</b>
                                            <b>X{product.qty}</b>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Grid>
                        )
                    })}
                    <b style={{ padding: '0 5%' }}>{Moment(orderDetails.date).format('LLL')}</b>
                    {
                        orderDetails.status === '1' ? <Badge color="success">Delivered</Badge>
                          :
                          orderDetails.status === '0' ? <Badge color="warning">Pending</Badge>
                            :
                            <Badge color="error">Cancelled</Badge>
                      }
                    <b style={{ padding: '0 5%' }}><big>Total: </big>{orderDetails.total}$</b>

                    <Card style={{ margin: '2% 5%' }}>
                        <Card.Body>
                            <big><b>Information:</b></big>
                            <p><b>Name: </b>{orderDetails.user.fullName}</p>
                            <p><b>Email: </b>{orderDetails.user.email}</p>
                            <p><b>Phone: </b>{orderDetails.user.countryCode}{orderDetails.user.phone}</p>
                        </Card.Body>
                    </Card>
                    <Card style={{ margin: '2% 5%' }}>
                        <Card.Body>
                            <big><b>Shipping Address:</b></big>
                            <p><b>Address: </b>{orderDetails.shipping.Address}</p>
                            <p><b>Street: </b>{orderDetails.shipping.Street}</p>
                            <p><b>Building: </b>{orderDetails.shipping.Building}</p>
                        </Card.Body>
                    </Card>
                </Grid.Container>
            </div> : <div></div>}
        </div>
    )
}

export default OrderDetails
