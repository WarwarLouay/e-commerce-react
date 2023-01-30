/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, Row } from "@nextui-org/react";
import { GiCheckMark } from 'react-icons/gi';
import { useTranslation } from 'react-i18next';

const Language = ({ isIn }) => {

    const [t, i18n] = useTranslation();
    const navigate = useNavigate();

    const callPage = async () => {
        if (!isIn) {
            navigate('/login');
        }
    };

    React.useEffect(() => {
        callPage();
    }, []);

    return (
        <Grid.Container gap={2} justify="space-between">
            <h5>{t('select_Language')}</h5>
            <Grid xs={12} style={{ cursor: 'pointer' }} onClick={() => {i18n.changeLanguage('en'); localStorage.setItem('language', 'en')}}>
                <Card>
                    <Card.Body>
                        <Row style={{ justifyContent: 'space-between' }}>
                        <img
                        src="https://flagcdn.com/us.svg"
                        alt="English" style={{ width: '30px', height: '20px' }} />
                            <b>English</b>
                            {i18n.language === 'en' ? <b><GiCheckMark /></b> : <b></b>}
                        </Row>
                    </Card.Body>
                </Card>
            </Grid>

            <Grid xs={12} style={{ cursor: 'pointer' }} onClick={() => {i18n.changeLanguage('ar'); localStorage.setItem('language', 'ar')}}>
                <Card>
                    <Card.Body>
                        <Row style={{ justifyContent: 'space-between' }}>
                        <img
                        src="https://flagcdn.com/sa.svg"
                        alt="English" style={{ width: '30px', height: '20px' }} />
                            <b>العربية</b>
                            {i18n.language  === 'ar' ? <b><GiCheckMark /></b> : <b></b>}
                        </Row>
                    </Card.Body>
                </Card>
            </Grid>
        </Grid.Container>
    )
}

export default Language
