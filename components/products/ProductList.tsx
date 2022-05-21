import { FC } from 'react'
import { Grid, Card, Box } from '@mui/material'
import { IProduct } from '../../interfaces'
import { ProductCard } from '.'
import { ClickHere } from './Clickhere';
import { useRouter } from 'next/router';

interface Props {
    products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
    const router = useRouter()
    return (
        <>
            {/* <Grid container spacing={1}> */}
            <Box sx={{ display: 'flex' ,  justifyContent: 'space-around' ,flexWrap: 'wrap' }}>


                    {
                        products.map(product => (
                            <ProductCard
                                key={product.slug}
                                product={product}
                            />
                        ))
                    }
                    {
                        router.asPath == '/'
                            ? null
                            : <ClickHere />
                    }
                </Box>

            {/* </Grid> */}
        </>
    )
}
