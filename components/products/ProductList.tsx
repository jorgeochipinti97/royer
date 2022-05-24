import { FC, useEffect } from 'react'
import { Grid, Card, Box } from '@mui/material'
import { IProduct } from '../../interfaces'
import { ProductCard } from '.'
import { ClickHere } from './Clickhere';
import { useRouter } from 'next/router';
import { sortPopularity } from '../../utils/sort';

interface Props {
    products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
    const router = useRouter()

    useEffect(() => {
        const a = sortPopularity(products,'messi')
        console.log(a)
    }, [])
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
                    router.asPath == '/'
                        ? null
                        : <ClickHere />
                }
            </Grid>
        </>
    )
}
