import React from 'react'
import { GetServerSideProps, NextPage } from 'next';
import { IOrderCrypto } from '../../../interfaces';
import { Box, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';
import { ShopLayout } from '../../../components/layouts';
import { currency } from '../../../utils';
import { dbCryptoOrders, dbOrders } from '../../../database';

interface Props {
    order: IOrderCrypto;
}

const OrderCryptoPage: NextPage<Props> = ({ order }) => {
    return (
        <ShopLayout title='Crypto Order Resume' pageDescription={'Crypto Order Resume'}>
            <Box display='flex' justifyContent='center'>
            <Typography variant='h1' component='h1'>Crypto Orden:</Typography>
            <Typography variant='subtitle1' component='h3'>{ order._id}</Typography>
            </Box>
            <Box sx={{ m: 2 }}>
                <Chip label='This order will be destroyed in an hour' variant='outlined' color='error' />
            </Box>
            <Grid container className='fadeIn'>

                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2' component='h1'>Order: {order._idOrder}</Typography>
                            <Grid container>
                                <Grid item xs={6} sx={{ mt: 2 }}>
                                    <Typography variant="subtitle1">Total:</Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
                                    <Typography variant="subtitle1">{currency.format(order.total)}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid >
        </ShopLayout>

    )
}

export default OrderCryptoPage

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query;
    const order = await dbCryptoOrders.getOrderById(id.toString())

    if (!order) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            order
        }
    }
}