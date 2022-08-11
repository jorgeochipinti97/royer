import type { NextPage, GetServerSideProps } from 'next';
import { Typography, Box, IconButton, Input, InputAdornment } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';

import { useProducts } from '../../hooks';
import { useState, useEffect } from 'react';
import { ClearOutlined } from '@mui/icons-material';


interface Props {

    query: string;
}


const SearchPage: NextPage<Props> = ({ query }) => {
    const { products, isLoading } = useProducts('/products');
    const [products_, setProducts] = useState(products)
    const [searchTerm, setSearchTerm] = useState(query);



    useEffect(() => {
        searchTerm.length == 0 && setProducts(products)
        const newProducts = products.filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()))
        searchTerm && setProducts(newProducts)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm])

    return (
        <ShopLayout title={'Royer-Shop - Search'} pageDescription={'search page'}>
            <Typography variant='h1' component='h1'>Search products</Typography>

            <Box display='flex' justifyContent='center'>
                <Input
                    sx={{ mt: 5 }}
                    className='fadeIn'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type='text'
                    placeholder="Search..."
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => {
                                    setSearchTerm('')
                                    setProducts(products)
                                }}
                            >
                                <ClearOutlined />
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
    return {
        props: {
            query
        }
    }
}


export default SearchPage
