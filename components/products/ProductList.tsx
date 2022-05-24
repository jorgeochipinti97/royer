import { FC, useState } from 'react'
import { Grid, Card, Box } from '@mui/material'
import { IProduct } from '../../interfaces'
import { ProductCard } from '.'
import { ClickHere } from './Clickhere';
import { useRouter } from 'next/router';

interface Props {
    products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
    const [productsSort, setProductsSort] = useState<IProduct[]>([])
    const router = useRouter()

    return (
        <>
            <Grid container spacing={1}>

                {
                    productsSort.map(product => (
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
