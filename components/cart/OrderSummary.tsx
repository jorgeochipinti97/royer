import { FC, useContext } from 'react';
import { Box, Grid, TextField, Typography, Button } from '@mui/material';
import { CartContext } from '../../context/cart/CartContext';
import { currency } from '../../utils';
import useSWR from 'swr';
import { IDiscount } from '../../interfaces/discountCodes';
import { useState } from 'react';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

interface Props {
    orderValues?: {
        numberOfItems: number;
        total: number;
        codigoDeDescuento: string
        precioFinal: number
    }
}

export const OrderSummary: FC<Props> = ({ orderValues }) => {

    const { numberOfItems, total } = useContext(CartContext);
    const summaryValues = orderValues ? orderValues : { numberOfItems, total };
    const { data, error } = useSWR<IDiscount[]>('/api/discount');
    const [discountPrice_, setDiscountPrice_] = useState(summaryValues.total)
    const [isDiscount, setIsDiscount] = useState(false)
    const [code, setCode] = useState('')
    const [percentage, setPercentage] = useState(0)
    const router = useRouter()


    const getDiscountPrice = (code_: string) => {
        data && data.map(e => {
            const porcentaje = e.percentage * summaryValues.total
            const porcentajeFinal = porcentaje / 100
            const finalAmount = summaryValues.total - porcentajeFinal
            e.name == code_ && setPercentage(e.percentage)
            e.name == code_ && setDiscountPrice_(finalAmount)
            e.name == code_ && setIsDiscount(true)
            e.name == code_ && Cookie.set('discountCode', e.name)
        })
    }
    return (
        <>
            {
                router.asPath.includes('summary') &&
                <Box display='flex' flexDirection='column'>
                    <Box display='flex' justifyContent='center'>
                        <TextField
                            label={'Discount code'}
                            defaultValue={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        <Button color='primary' variant='outlined' sx={{ mt: 1 }}
                            onClick={() => getDiscountPrice(code)}
                        >
                            Apply
                        </Button>
                    </Box>
                </Box>
            }
            <Grid container>
                <Grid item xs={6}>
                    <Typography>Nº Products</Typography>
                </Grid>
                <Grid item xs={6} display='flex' justifyContent='end'>
                    <Typography>{summaryValues.numberOfItems} {summaryValues.numberOfItems > 1 ? 'products' : 'product'}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                    <Typography variant="subtitle1">{summaryValues.numberOfItems > 1 ? 'Products' : 'Product'}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
                    <Typography variant="subtitle1">{currency.format(summaryValues.total)}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                    <Typography variant="subtitle1">Shipping:</Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
                    <Typography variant="subtitle1">{currency.format(0)}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                    <Typography variant="h6">Total:</Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
                    <Typography variant="h6" sx={{ textDecoration: isDiscount || orderValues && orderValues.codigoDeDescuento!.length > 3 ? 'line-through' : '' }}>{currency.format(summaryValues.total)}</Typography>
                </Grid>
                {
                    (orderValues && orderValues.codigoDeDescuento.length > 3) || isDiscount ?
                        <>
                            <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='start'>
                                <Typography variant="subtitle1">{`Discount-Code: ${router.asPath.indexOf('/summary') > -1 ? code.toUpperCase() : orderValues && orderValues.codigoDeDescuento?.toUpperCase() || ''} `} </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
                                <Typography variant="h6">{router.asPath.indexOf('/summary') > -1 ? currency.format(discountPrice_) : orderValues && currency.format(orderValues.precioFinal || summaryValues.total)}</Typography>
                            </Grid>
                        </>
                        : null}

            </Grid>
        </>
    )
}
