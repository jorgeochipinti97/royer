import { FC, useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { CartContext } from '../../context/cart/CartContext';
import { currency } from '../../utils';

interface Props {
    orderValues?: {
        numberOfItems: number;
        total: number;
    }
}

export const OrderSummary: FC<Props> = ({ orderValues }) => {

    const { numberOfItems, total } = useContext( CartContext );
    const summaryValues = orderValues ? orderValues : { numberOfItems, total };

    
  return (
    <Grid container>
        
        <Grid item xs={6}>
            <Typography>Nº Products</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{summaryValues.numberOfItems} { summaryValues.numberOfItems > 1 ? 'products': 'product' }</Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt:2 }}>
            <Typography variant="subtitle1">Total:</Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt:2 }} display='flex' justifyContent='end'>
            <Typography variant="subtitle1">{ currency.format(summaryValues.total) }</Typography>
        </Grid>

    </Grid>
  )
}
