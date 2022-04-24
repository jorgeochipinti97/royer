import type { NextPage } from 'next';
import { Box, Divider, Link, Typography } from "@mui/material"
import { ShopLayout } from '../../components/layouts';
import NextLink from 'next/link';
import { ProductList } from '../../components/products';
import { localFavorites } from "../../utils";
import { useEffect, useState } from 'react';
import { IProduct } from '../../interfaces';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const FavoritesPage: NextPage = () => {
    const [favoriteProducts, setFavoriteProducts] = useState<IProduct[]>([])
    useEffect(() => {
        setFavoriteProducts(localFavorites.productsInFavorites)
    }, [])

    return (
        <ShopLayout title={'Royer-Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>

            {favoriteProducts.length == 0  ?
                <>
                    <Box display='flex' justifyContent='center' sx={{ mt: 30 }}>
                        <Typography variant='h2' component='h2' sx={{ mr: 5, fontSize: 30 }}>Don t have favorites yet</Typography>
                        <SentimentVeryDissatisfiedIcon sx={{ fontSize: 100 }} />
                    </Box>
                    <Box sx={{ mt: 4 }}>
                        <NextLink href='/' passHref>
                            <Link typography="h4" color='secondary'>
                                Back
                            </Link>
                        </NextLink>
                    </Box>
                    <Divider sx={{ my: 1 }} />

                </>


                :
                <ProductList products={favoriteProducts} />

            }


        </ShopLayout >
    )
}

export default FavoritesPage
