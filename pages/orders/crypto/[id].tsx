import React, { useEffect } from 'react'
import { GetServerSideProps, NextPage } from 'next';
import { IOrderCrypto } from '../../../interfaces';
import { Box, Card, CardContent, Divider, Grid, Typography, Chip, FormControl, FormLabel, TextField, RadioGroup, FormControlLabel, Radio, Button, Link } from '@mui/material';
import { ShopLayout } from '../../../components/layouts';
import { currency } from '../../../utils';
import { db, dbCryptoOrders } from '../../../database';
import { useRouter } from 'next/router';
import { tesloApi } from '../../../api';
import NextLink from 'next/link';


interface Props {
    order: IOrderCrypto;
}

const OrderCryptoPage: NextPage<Props> = ({ order }) => {
    const router = useRouter();

    useEffect(() => {
        const deleteOrder = () => {

            const idInterval = setInterval(async () => {
                let tiempoRestante = 9
                tiempoRestante -= 1
                console.log(tiempoRestante)
                if (tiempoRestante > 0) {
                    alert('la orden ha sido eliminada')
                    const { data } = await tesloApi({
                        url: '/cripto',
                        method: 'DELETE',
                        data: order
                    });
                    router.replace(`/orders/${order._idOrder}`);

                }

                setTimeout(() => {
                    clearInterval(idInterval)
                }, 1000);


            }, 1000000)

        }

        deleteOrder()
    }, [])

    const handleInputChange = () => {

    }


    // TODO: modificar modelo e interfaz , agregar call api
    return (
        <ShopLayout title='Crypto Order Resume' pageDescription={'Crypto Order Resume'}>
            <Divider sx={{ my: 1 }} />

            <Box display='flex' justifyContent='center'>
                <Typography variant='h1' component='h1' sx={{ mt: 2, mb: 4 }}>Checkout</Typography>
            </Box>

            <NextLink href={`/orders/${order._idOrder}`} passHref>
                <Link>
                    <Button color='primary'>Back to the select payment</Button>
                </Link>
            </NextLink>
            <Divider sx={{ my: 1 }} />
            <Box display='flex' justifyContent='start'>
                <Box sx={{ m: 2 }}>
                    <Chip label='This order will be destroyed in ten minutes' variant='outlined' color='error' />
                </Box>
            </Box>
            <Box display='flex' justifyContent='center'>

                <Box >

                    <Box sx={{ mt: 3 }}>
                        <Box display='flex' justifyContent='center' sx={{ mb: 3 }}>
                            <Card className='summary-card' sx={{ width: 300 }} >
                                <CardContent>
                                    <Box display='flex' justifyContent='space-around'>
                                        <Typography variant="subtitle1">Total:</Typography>
                                        <Typography variant="subtitle1">{currency.format(order.total)}</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ mt: 3 }}  >
                            <FormControl >
                                <FormControl>
                                    <FormLabel>Select a criptocurrency please!</FormLabel>
                                    <RadioGroup
                                        sx={{ mt: 1 }}
                                        name="cripto"
                                        // value={formValues.gender}
                                        // onChange={handleInputChange}
                                        row
                                    >
                                        <FormControlLabel
                                            key="eth"
                                            value="eth"
                                            control={<Radio color='secondary' size="small" />}
                                            label="Ethereum"
                                        />
                                        <FormControlLabel
                                            key="btc"
                                            value="btc"
                                            control={<Radio color='secondary' size="small" />}
                                            label="BTC"
                                        />
                                        <FormControlLabel
                                            key="usdt"
                                            value="usdt"
                                            control={<Radio color='secondary' size="small" />}
                                            label="USDT"
                                        />
                                        <FormControlLabel
                                            key="busd"
                                            value="busd"
                                            control={<Radio color='secondary' size="small" />}
                                            label="BUSD"
                                        />
                                        <FormControlLabel
                                            key="bnb"
                                            value="bnb"
                                            control={<Radio color='secondary' size="small" />}
                                            label="BNB"
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <FormLabel sx={{ mt: 1 }}>Put the hash of the transaction please!</FormLabel>
                                <TextField
                                    id='hash'
                                    name='hash'
                                    type='text'
                                ></TextField>
                                <FormLabel sx={{ mt: 1 }}>Put your wallet please!</FormLabel>
                                <TextField
                                    id='wallet'
                                    name='wallet'
                                    type='text'
                                ></TextField>
                                <Button color='success' sx={{ m: 3 }}>Send</Button>
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ShopLayout >

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