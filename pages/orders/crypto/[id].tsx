import { useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next';
import { IOrderCrypto } from '../../../interfaces';
import { Box, Card, CardContent, Divider, Grid, Typography, Chip, FormControl, FormLabel, TextField, RadioGroup, FormControlLabel, Radio, Button, Link, capitalize } from '@mui/material';
import { ShopLayout } from '../../../components/layouts';
import { capitalizarPrimeraLetraPalabras, currency } from '../../../utils';
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
    const walletETH = '0x9b9421089cc003b109ac590a8584a56aa40e5947'
    const walletBTC = '0x9b9421089cc003b109ac590a8584a56aa40e5947'
    const walletBUSD = '0x53583B48EbC48Fb15352143fBD98BaF3AB54fd50'
    const walletUSDT = '0x9b9421089cc003b109ac590a8584a56aa40e5947'
    const walletBNB = '0x53583B48EbC48Fb15352143fBD98BaF3AB54fd50'
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

            if (order.isSend) {
                return
            }

            let i = 10
            let counter = window.setInterval(async () => {
                let f = i--
                if (f <= 0) {

                    alert('la orden ha sido eliminada')
                    const { data } = await tesloApi({
                        url: '/cripto',
                        method: 'DELETE',
                        data: order
                    });
                    router.replace(`/orders/${order._idOrder}`);
                    clearInterval(counter)
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
                        <Button color='primary' sx={{ m: 2 }}>Back to the select payment</Button>
                    </Link>
                </NextLink>
                :
                <NextLink href={`/products`} passHref>
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
                            <Chip label='your order is being reviewed' variant='outlined' color='secondary' sx={{ mb: 1 }} />
                            <Chip label='we will contact you as soon as possible' variant='filled' color='primary' sx={{ mb: 2 }} />
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
                                <Card className='summary-card' sx={{ width: 350 }} >
                                    <CardContent>
                                        <Box display='flex' justifyContent='space-around'>
                                            <Typography variant="subtitle1">Total:</Typography>
                                            <Typography variant="subtitle1">{currency.format(order.total)}</Typography>
                                        </Box>
                                        <Box display='flex' justifyContent='space-around'>
                                            <Typography variant="subtitle1"> {crpytoPrice}</Typography>
                                        </Box>


                                        {wallet_ != ''

                                            ? <Box display='flex' justifyContent='center'>
                                                <Typography variant="subtitle1" sx={{ mt: 2 }}>{network}</Typography>
                                            </Box>

                                            : null
                                        }
                                        <Box display='flex' justifyContent='center'>
                                            <Typography variant="body2" fontWeight={700} >{wallet_}</Typography>
                                        </Box>


                                    </CardContent>
                                </Card>
                            </Box> :
                            <Box display='flex' justifyContent='center' sx={{ mb: 3 }}>
                                <Card className='summary-card' sx={{ width: 350 }} >
                                    <CardContent>
                                        <Box display='flex' justifyContent='space-around'>
                                            <Typography variant="subtitle1">{order.amount} {capitalizarPrimeraLetraPalabras(order.crypto)}</Typography>
                                        </Box>
                                        <Box display='flex' justifyContent='space-around'>
                                            <Typography variant="subtitle1">From: {order.wallet}</Typography>
                                        </Box>
                                        <Box display='flex' justifyContent='space-around'>
                                            <Typography variant="subtitle1">{network}</Typography>
                                        </Box>
                                        <Box display='flex' justifyContent='space-around'>
                                            <Typography variant="subtitle1">Hash: {order.transactionId}</Typography>
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
                                            <FormLabel sx={{m:2}}>Select a criptocurrency please!</FormLabel>
                                                <RadioGroup
                                                    sx={{ m: 2 }}
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
                                        <FormLabel sx={{ m: 1 }}>Put the hash of the transaction please!</FormLabel>
                                        <TextField
                                            {...register('transactionId', {
                                                required: 'this field is required',
                                            })}
                                            onChange={(e) => setValue('transactionId', e.target.value)}
                                            id='hash'
                                            name='hash'
                                            type='text'
                                        ></TextField>
                                        <FormLabel sx={{ m: 1 }}>Put your wallet please!</FormLabel>
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
    const order = await dbCryptoOrders.getOrderCryptoById(id.toString())

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