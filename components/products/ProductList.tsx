import { FC } from 'react'
import { Grid } from '@mui/material'
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
            <Grid container spacing={4}>
                {
                    products.map(product => (
                        <ProductCard
                            key={product.slug}
                            product={product}
                        />
                    ))
                }
            {router.asPath == '/'
            ?null
            :<ClickHere />
            }
            </Grid>
        </>
    )
}
