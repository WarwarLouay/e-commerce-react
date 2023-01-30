/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import Request from '../../Config/Request';
import { Grid, Card, User, Row, Badge } from "@nextui-org/react";
import { useTranslation } from 'react-i18next';

const OrderDetails = () => {

    const [t, i18n] = useTranslation();
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
                                                {i18n.language === 'en' ? product.product.productEngName : product.product.productArName}
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
                        orderDetails.status === '1' ? <Badge color="success">{t('delivered')}</Badge>
                          :
                          orderDetails.status === '0' ? <Badge color="warning">{t('pending')}</Badge>
                            :
                            <Badge color="error">{t('cancelled')}</Badge>
                      }
                    <b style={{ padding: '0 5%' }}><big>{t('total')} </big>{orderDetails.total}$</b>

                    <Card style={{ margin: '2% 5%' }}>
                        <Card.Body>
                            <big><b>{t('personal_information')}</b></big>
                            <p><b>{t('name')}: </b>{orderDetails.user.fullName}</p>
                            <p><b>{t('email')}: </b>{orderDetails.user.email}</p>
                            <p><b>{t('phone')}: </b>{orderDetails.user.countryCode}{orderDetails.user.phone}</p>
                        </Card.Body>
                    </Card>
                    <Card style={{ margin: '2% 5%' }}>
                        <Card.Body>
                            <big><b>{t('shipping_address')}</b></big>
                            <p><b>{t('address')}: </b>{orderDetails.shipping.Address}</p>
                            <p><b>{t('street')}: </b>{orderDetails.shipping.Street}</p>
                            <p><b>{t('building')}: </b>{orderDetails.shipping.Building}</p>
                        </Card.Body>
                    </Card>
                </Grid.Container>
            </div> : <div></div>}
        </div>
    )
}

export default OrderDetails
