import React from 'react';
import {
    createStyles,
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
} from '@mantine/core';
import { IconTruck, IconCertificate, IconCoin } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

const mockdata = [
    {
        icon: IconTruck,
        title: 'Free Worldwide shipping',
        description:
          'As electricity builds up inside its body, it becomes more aggressive. One theory is that the electricity.',
      },
      {
        icon: IconCertificate,
        title: 'Best Quality Product',
        description:
          'Slakoth’s heart beats just once a minute. Whatever happens, it is content to loaf around motionless.',
      },
      {
        icon: IconCoin,
        title: 'Very Affordable Pricing',
        description:
          'Thought to have gone extinct, Relicanth was given a name that is a variation of the name of the person who discovered.',
      },
];

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 34,
        fontWeight: 900,
        [theme.fn.smallerThan('sm')]: {
            fontSize: 24,
        },
    },

    description: {
        maxWidth: 600,
        margin: 'auto',

        '&::after': {
            content: '""',
            display: 'block',
            backgroundColor: theme.fn.primaryColor(),
            width: 45,
            height: 2,
            marginTop: theme.spacing.sm,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    card: {
        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
            }`,
    },

    cardTitle: {
        '&::after': {
            content: '""',
            display: 'block',
            backgroundColor: theme.fn.primaryColor(),
            width: 45,
            height: 2,
            marginTop: theme.spacing.sm,
        },
    },
}));

const Features = () => {

    const [t] = useTranslation();

    const { classes, theme } = useStyles();
    const features = mockdata.map((feature) => (
        <Card key={feature.title} shadow="md" radius="md" className={classes.card} p="xl">
            <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
            <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
                {feature.title}
            </Text>
            <Text size="sm" color="dimmed" mt="sm">
                {feature.description}
            </Text>
        </Card>
    ));

    return (
        <Container size="lg" py="xl">
            <Group position="center">
                <Badge variant="filled" size="lg">
                    {t('best_company_ever')}
                </Badge>
            </Group>

            <Title order={2} className={classes.title} align="center" mt="sm">
                {t('integrate_effortlessly')}
            </Title>

            <Text color="dimmed" className={classes.description} align="center" mt="md">
                {t('every_once_in_a_while')}
            </Text>

            <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
                {features}
            </SimpleGrid>
        </Container>
    )
}

export default Features
