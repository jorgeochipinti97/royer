import type { NextPage, GetServerSideProps } from 'next';
import { Typography, Box, IconButton, Input, InputAdornment } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';
import { useProducts } from '../../hooks';
import { useState, useEffect } from 'react';
import { SearchOutlined } from '@mui/icons-material';


interface Props {

    query: string;
}


const SearchPage: NextPage<Props> = ({ query }) => {
    const { products, isLoading } = useProducts('/products');
    const [products_, setProducts] = useState(products)
    const [searchTerm, setSearchTerm] = useState(query);



    useEffect(() => {
        searchTerm.length < 2 && setProducts(products)
        const newProducts = products.filter(e => e.slug.includes(searchTerm))
        searchTerm && setProducts(newProducts)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm])

    return (
        <ShopLayout title={'Royer-Shop - Search'} pageDescription={'search page'}>
            <Typography variant='h1' component='h1'>Search products</Typography>

            <Box display='flex' justifyContent='center'>
                <Input

                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type='text'
                    placeholder="Search..."
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton>
                                <SearchOutlined />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </Box>

            {
                products_
                    ? <Typography variant='h2' sx={{ mb: 1 }} textTransform="capitalize">Word: {searchTerm}</Typography>
                    : (
                        <Box display='flex'>
                            <Typography variant='h2' sx={{ mb: 1 }}>We did not find any product</Typography>
                            <Typography variant='h2' sx={{ ml: 1 }} color="secondary" textTransform="capitalize">{searchTerm}</Typography>
                        </Box>
                    )
            }




            <ProductList products={products_} />

        </ShopLayout>
    )
}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { query = '' } = params as { query: string };

    // if (query.length === 0) {
    //     return {
    //         redirect: {
    //             destination: '/',
    //             permanent: true
    //         }
    //     }
    // }

    // // y no hay productos
    // let products = await dbProducts.getProductsByTerm(query);
    // const foundProducts = products.length > 0;

    // // TODO: retornar otros productos
    // if (!foundProducts) {
    //     // products = await dbProducts.getAllProducts(); 
    //     products = await dbProducts.getProductsByTerm('shirt');
    // }

    return {
        props: {
            // products,
            // foundProducts,
            query
        }
    }
}


export default SearchPage
