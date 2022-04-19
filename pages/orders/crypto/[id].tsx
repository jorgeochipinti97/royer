import { useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next';
import { IOrderCrypto } from '../../../interfaces';
import { Box, Card, CardContent, Divider, Grid, Typography, Chip, FormControl, FormLabel, TextField, RadioGroup, FormControlLabel, Radio, Button, Link } from '@mui/material';
import { ShopLayout } from '../../../components/layouts';
import { currency } from '../../../utils';
import { db, dbCryptoOrders } from '../../../database';
import { useRouter } from 'next/router';
import { tesloApi } from '../../../api';
import NextLink from 'next/link';
import { getPrice } from '../../../utils/getPrice';
import { useForm } from 'react-hook-form';


interface Props {
    order: IOrderCrypto;
}

interface FormData {
    _id?: string;
    _idOrder: string;
    total: number;
    isPaid: boolean;
    transactionId: string;
    amount: number;
    isSend: boolean;
    crypto: string;
    wallet: string;
}



const OrderCryptoPage: NextPage<Props> = ({ order }) => {
    const network = 'BEP-20'
    const walletETH = 'walletETH'
    const walletBTC = 'walletBTC'
    const walletBUSD = 'walletBUSD'
    const walletUSDT = 'walletUSDT'
    const walletBNB = 'walletBNB'
    const [CryptoMethod, setCryptoMethod] = useState<string>()
    const [wallet_, setWallet_] = useState<string>('')
    const [crpytoPrice, setcrpytoPrice] = useState<string>()

    const { register, setValue, handleSubmit } = useForm<FormData>({
        defaultValues: {
            _id: order._id,
            _idOrder: order._idOrder,
            total: order.total,
            isPaid: false,
            isSend: true,
        }
    })

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

                    setTimeout(() => {
                        clearInterval(idInterval)
                    }, 1000);
                }



            }, 60000)

        }

        deleteOrder()
    }, [])


    const handleChangeCryptoButtons = async (crypto_: string) => {
        setCryptoMethod(crypto_)
        setValue('crypto', crypto_)

        if (crypto_ == 'ethereum') {
            const data = await getPrice('ethereum', order.total)
            setWallet_(walletETH)
            setcrpytoPrice(`${data} ETH`)
            if (data != undefined) {
                setValue('amount', data)
            }
            setValue('crypto', 'ethereum')

        } else if (crypto_ == 'bitcoin') {
            const data = await getPrice('bitcoin', order.total)
            setWallet_(walletBTC)
            if (data != undefined) {
                setValue('amount', data)
            }
            setcrpytoPrice(`${data} BTC`)
            setValue('crypto', 'bitcoin')

        } else if (crypto_ == 'binancecoin') {
            const data = await getPrice('binancecoin', order.total)
            setWallet_(walletBNB)
            setcrpytoPrice(`${data} BNB`)
            if (data != undefined) {
                setValue('amount', data)
                setValue('crypto', 'binancecoin')
            }
        } else if (crypto_ == 'usdt') {
            setWallet_(walletUSDT)
            setcrpytoPrice(`${order.total} USDT`)
            setValue('amount', order.total)
            setValue('crypto', 'usdt')
        } else if (crypto_ == 'busd') {
            setWallet_(walletBUSD)
            setcrpytoPrice(`${order.total} BUSD`)
            setValue('amount', order.total)
            setValue('crypto', 'busd')

        }
    }

    const onSubmit = async (form: FormData) => {
        console.log('submit')
        console.log(form)
        // setTimeout(() => {
        //     console.log('intervalo limpio')
        //     clearInterval(idInterval)
        // }, 1000)
        try {
            const { data } = await tesloApi({
                url: '/cripto',
                method: 'PUT',
                data: form
            })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <ShopLayout title='Crypto Order Resume' pageDescription={'Crypto Order Resume'}>
            {!order.isSend ?
                <NextLink href={`/orders/${order._idOrder}`} passHref>
                    <Link>
                        <Button color='primary'>Back to the select payment</Button>
                    </Link>
                </NextLink>
                :
                <NextLink href={`/products}`} passHref>
                    <Link>
                        <Button color='primary'>Back</Button>
                    </Link>
                </NextLink>
            }



            <Divider sx={{ my: 1 }} />
            <Box display='flex' justifyContent='start'>
                {order.isSend ?
                    <Box sx={{ m: 2 }} >
                        <Box display='flex' flexDirection='column'>
                            <Chip label='your order is being reviewed' variant='outlined' color='secondary' sx={{mb:1}}/>
                            <Chip label='we will contact you as soon as possible' variant='filled' color='primary' sx={{mb:2}} />
                        </Box>
                        <Box display='flex' justifyContent='center'>
                            <Typography variant='h5'>your order ID: {order._id}</Typography>
                        </Box>
                    </Box>
                    :
                    <Box sx={{ m: 2 }}>
                        <Chip label='This order will be destroyed in ten minutes' variant='outlined' color='error' />
                    </Box>
                }
            </Box>

            <Box display='flex' justifyContent='center'>
                <Box >
                    <Box sx={{ mt: 3 }}>
                        {!order.isSend ?
                            <Box display='flex' justifyContent='center' sx={{ mb: 3 }}>
                                <Card className='summary-card' sx={{ width: 300 }} >
                                    <CardContent>
                                        <Box display='flex' justifyContent='space-around'>
                                            <Typography variant="subtitle1">Total:</Typography>
                                            <Typography variant="subtitle1">{currency.format(order.total)}</Typography>
                                        </Box>
                                        <Box display='flex' justifyContent='space-around'>
                                            <Typography variant="subtitle1"> {crpytoPrice}</Typography>
                                        </Box>
                                        <Box display='flex' justifyContent='space-around'>
                                            {wallet_ != '' ?
                                                <Typography variant="subtitle1">{network}</Typography> : null
                                            }
                                            <Typography variant="subtitle1">{wallet_}</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Box> :
                            <Box display='flex' justifyContent='center' sx={{ mb: 3 }}>
                                <Card className='summary-card' sx={{ width: 300 }} >
                                    <CardContent>
                                        <Box display='flex' justifyContent='space-around'>
                                            <Typography variant="subtitle1">Total:</Typography>
                                            <Typography variant="subtitle1">{order.total} {order.crypto}</Typography>
                                        </Box>
                                        <Box display='flex' justifyContent='space-around'>
                                            {wallet_ != '' ?
                                                <Typography variant="subtitle1">{network}</Typography> : null
                                            }
                                            <Typography variant="subtitle1">{order.wallet}</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Box>
                        }

                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ mt: 3 }}  >
                            {!order.isSend ?

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <FormControl >
                                        <FormControl>
                                            <FormLabel>Select a criptocurrency please!</FormLabel>
                                            <RadioGroup
                                                sx={{ mt: 1 }}
                                                name="cripto"
                                                // value={formValues.gender}
                                                onChange={(e) => handleChangeCryptoButtons(e.target.value)}
                                                row>
                                                <FormControlLabel
                                                    key="eth"
                                                    value="ethereum"
                                                    control={<Radio color='secondary' size="small" />}
                                                    label="Ethereum"
                                                />
                                                <FormControlLabel
                                                    key="btc"
                                                    value="bitcoin"
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
                                                    value="binancecoin"
                                                    control={<Radio color='secondary' size="small" />}
                                                    label="BNB"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                        <FormLabel sx={{ mt: 1 }}>Put the hash of the transaction please!</FormLabel>
                                        <TextField
                                            {...register('transactionId', {
                                                required: 'this field is required',
                                            })}
                                            onChange={(e) => setValue('transactionId', e.target.value)}
                                            id='hash'
                                            name='hash'
                                            type='text'
                                        ></TextField>
                                        <FormLabel sx={{ mt: 1 }}>Put your wallet please!</FormLabel>
                                        <TextField
                                            {...register('wallet', {
                                                required: 'this field is required',
                                            })}
                                            onChange={(e) => setValue('wallet', e.target.value)}
                                            id='wallet'
                                            name='wallet'
                                            type='text'
                                        ></TextField>
                                        <Button
                                            type='submit'
                                            color='success' sx={{ m: 3 }}>
                                            Send
                                        </Button>
                                    </FormControl>
                                </form> : null}
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