import { GetServerSideProps, NextPage } from 'next';

import { Box, Card, CardContent, Divider, Grid, Typography, Chip, Button } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from 'next/router';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { dbOrders } from '../../database';
import { IOrder, IOrderCrypto } from '../../interfaces';
import { useEffect, useState } from 'react';
import { tesloApi } from '../../api';
import Image from 'next/image';
import { currency } from '../../utils';


export type OrderResponseBody = {
    id: string;
    status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED";
};

interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
    const router = useRouter();

    const { shippingAddress } = order;

    const [isPaying, setIsPaying] = useState(false);
    const [discountPrice, setDiscountPrice] = useState<number>(order.total)
    const [isDisable, setisDisable] = useState<boolean>(false)
    const crypto = ['https://res.cloudinary.com/djk4q3tys/image/upload/v1649803353/vdcqamydvmx70cksuubo.png', 'https://res.cloudinary.com/djk4q3tys/image/upload/v1649803353/ixqoo5kldhyiy57kuhcr.png', 'https://res.cloudinary.com/djk4q3tys/image/upload/v1649803353/vahsohmh1mozb9tpfbpz.png', 'https://res.cloudinary.com/djk4q3tys/image/upload/v1649803352/zkbtzcdmjqfmtad7ypxw.png', 'https://res.cloudinary.com/djk4q3tys/image/upload/v1649803352/benu5ggpqtwdo7pn4axj.png']

    const handlePrice = (precio: number, descuento: number) => {
        const porcentajePrecioConDescuento = 100 - descuento;
        const precioConDescuento = (precio * porcentajePrecioConDescuento) / 100;

        return precioConDescuento;
    }
    useEffect(() => {
        const a = handlePrice(order.total, 10)
        setDiscountPrice(a)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onOrderCompleted = async (details: OrderResponseBody) => {

        if (details.status !== 'COMPLETED') {
            return alert('No hay pago en Paypal');
        }

        setIsPaying(true);

        try {

            const { data } = await tesloApi.post(`/orders/pay`, {
                transactionId: details.id,
                orderId: order._id
            });

            router.reload();

        } catch (error) {
            setIsPaying(false);
            console.log(error);
            alert('Error');
        }

    }

    const createCryptoOrder = async () => {
        setisDisable(true)
        try {
            if (order._id != undefined) {
                const order_: IOrderCrypto = {
                    _idOrder: order._id,
                    total: discountPrice,
                    isPaid: false,
                }
                
                const { data } = await tesloApi({
                    url: '/cripto',
                    method: 'POST',
                    data: order_
                })

                console.log(data)

                router.replace(`/orders/crypto/${data._id}`);

            } else {
                alert('id undefined')
            }


        } catch (err) {
            console.log(err)
        }
    }





    return (
        <ShopLayout title='Order Resume' pageDescription={'Order Resume'}>
            <Typography variant='h1' component='h1'>Orden: {order._id}</Typography>

            {
                order.isPaid
                    ? (
                        <Chip
                            sx={{ my: 2 }}
                            label="The order is already paid"
                            variant='outlined'
                            color="success"
                            icon={<CreditScoreOutlined />}
                        />
                    ) :
                    (
                        <Chip
                            sx={{ my: 2 }}
                            label="The order is not paid"
                            variant='outlined'
                            color="error"
                            icon={<CreditCardOffOutlined />}
                        />
                    )
            }



            <Grid container className='fadeIn'>
                <Grid item xs={12} sm={7}>
                    <CartList products={order.orderItems} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resume ({order.numberOfItems} {order.numberOfItems > 1 ? 'products' : 'product'})</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Shipping details:</Typography>
                            </Box>


                            <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                            <Typography>{shippingAddress.address} {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}</Typography>
                            <Typography>{shippingAddress.city}, {shippingAddress.zip}</Typography>
                            <Typography>{shippingAddress.country}</Typography>
                            <Typography>{shippingAddress.phone}</Typography>
                            <Typography>{shippingAddress.taxId}</Typography>

                            <Divider sx={{ my: 1 }} />


                            <OrderSummary
                                orderValues={{
                                    numberOfItems: order.numberOfItems,
                                    total: order.total,
                                }}
                            />

                            <Box sx={{ mt: 3 }} display="flex" flexDirection='column'>
                                {/* TODO */}
                                {
                                    order.isPaid
                                        ? (
                                            <Chip
                                                sx={{ my: 2 }}
                                                label="The order is already paid"
                                                variant='outlined'
                                                color="success"
                                                icon={<CreditScoreOutlined />}
                                            />

                                        ) : (
                                            <>
                                                <PayPalButtons
                                                    createOrder={(data, actions) => {
                                                        return actions.order.create({
                                                            purchase_units: [
                                                                {
                                                                    amount: {
                                                                        value: `${order.total}`,
                                                                    },
                                                                },
                                                            ],
                                                        });
                                                    }}
                                                    onApprove={(data, actions) => {
                                                        return actions.order!.capture().then((details) => {
                                                            onOrderCompleted(details);
                                                        });
                                                    }}
                                                />
                                                <Divider sx={{ my: 1 }} />
                                                <Box display='flex' justifyContent='center' sx={{ mb: 3 }}>
                                                    <Chip color='secondary' label='10% OFF' variant='filled' sx={{ pr: 3, pl: 3, pt: 1, pb: 1, mt: 2 }} />
                                                </Box>
                                                <Grid container>
                                                    <Grid item xs={6} sx={{ mt: 2 }}>
                                                        <Typography variant="subtitle1">Total:</Typography>
                                                    </Grid>
                                                    <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
                                                        <Typography variant="subtitle1">{currency.format(discountPrice)}</Typography>
                                                    </Grid>
                                                </Grid>

                                                <Box display='flex' flexDirection='column' sx={{ mt: 1 }}>
                                                    <Box display='flex' justifyContent='center' sx={{ mb: 2 }} >


                                                        {crypto.map(e => (
                                                            <Image src={e} key={e} width={35} height={35} alt='foto' />
                                                        ))}

                                                    </Box>

                                                    <Box display='flex' justifyContent='center'>
                                                        <Button variant="contained" color='success'
                                                            onClick={() => createCryptoOrder()}
                                                            disabled={isDisable}
                                                        >
                                                            <Typography variant='h2' sx={{ m: 2 }}>
                                                                Pay whit cryptocurrency</Typography>
                                                        </Button>
                                                    </Box>

                                                </Box>
                                            </>
                                        )
                                }

                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


        </ShopLayout >
    )
}

export default OrderPage;

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query;
    const order = await dbOrders.getOrderById(id.toString())

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