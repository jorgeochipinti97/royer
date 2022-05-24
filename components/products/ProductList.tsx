import { FC, useEffect, useState } from 'react'
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
    const [productsSort, setProductsSort] = useState<IProduct[]>([])
    const router = useRouter()




    const sortByType = () => {
        const tshirts: IProduct[] = sortPopularity(products, 'shirts')
        const tShirtsMessi = tshirts.sort((a: IProduct, b: IProduct) => {

            if (a.slug.indexOf('messi') < b.slug.indexOf('messi')) {
                return 1
            } else if (a.slug.indexOf('messi') > b.slug.indexOf('messi')) {
                return -1
            }
            return 0
        })
        const shorts: IProduct[] = sortPopularity(products, 'short')
        const hoodies: IProduct[] = sortPopularity(products, 'hoodies')
        const jacket: IProduct[] = sortPopularity(products, 'jacket')
        const socks: IProduct[] = sortPopularity(products, 'socks')
        const purse: IProduct[] = sortPopularity(products, 'purse')
        const wallet: IProduct[] = sortPopularity(products, 'wallet')
        const hats: IProduct[] = sortPopularity(products, 'hats')
        const mate: IProduct[] = sortPopularity(products, 'mate')
        const accessories: IProduct[] = sortPopularity(products, 'accessories')
        const alfajores: IProduct[] = sortPopularity(products, 'alfajores')
        const wine: IProduct[] = sortPopularity(products, 'wine')
        const yerba: IProduct[] = sortPopularity(products, 'yerba')

        return tShirtsMessi.concat(shorts)
            .concat(hoodies)
            .concat(jacket)
            .concat(socks)
            .concat(purse)
            .concat(wallet)
            .concat(hats)
            .concat(mate)
            .concat(accessories)
            .concat(alfajores)
            .concat(wine)
            .concat(yerba)
    }
    useEffect(() => {
        const a = sortByType()
        setProductsSort(a)

    }, [])
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
