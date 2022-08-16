import { FC, useEffect } from 'react';
import { IProduct } from '../../interfaces'
import { ProductCard } from '.'
import { ClickHere } from './Clickhere';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

interface Props {
    products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {

    const { asPath } = useRouter()


    return (
        <>

            <Grid container spacing={1}>


                {
                    products.map(product => (


                        <ProductCard
                            key={product.slug}
                            product={product}
                        />

                    ))
                }
                {
                    asPath == '/'
                        ? null
                        : <ClickHere />
                }

            </Grid>
        </>
    )
}
