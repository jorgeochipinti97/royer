import { useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';

import { ClearOutlined } from '@mui/icons-material';
import { Typography, Box, IconButton, Input, InputAdornment } from '@mui/material';

import { useProducts } from '../../hooks';
import { ProductList } from '../../components/products';
import { IProduct } from '../../interfaces';
import { ShopLayout } from '../../components/layouts';

import Cookie from 'js-cookie';



const SearchIndexPage: NextPage = () => {
    const { products, isLoading } = useProducts('/products');
    const [products_, setProducts] = useState(products)
    const [searchTerm, setSearchTerm] = useState('');
    const [currentProducts, setCurrentProducts] = useState<IProduct[]>([])


    useEffect(() => {
        const a = Cookie.get('searchTerm')
        a && setSearchTerm(a)
    }, [])

    useEffect(() => {
         setCurrentProducts(products_.slice(0, 15))

    }, [products_])

    useEffect(() => {
        searchTerm.length == 0 && setProducts(products)
        const newProducts = products.filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()))
        searchTerm && setProducts(newProducts)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm])

    const onSearch = (searchTerm_: string) => {
        Cookie.set('searchTerm', searchTerm_)
        setSearchTerm(searchTerm_)
    }


    return (
        <ShopLayout title={'Royer-Shop - Search'} pageDescription={'search page'}>
            <Typography variant='h1' component='h1'>Search products</Typography>
            <Box display='flex' justifyContent='center'>
                <Input
                    sx={{ mt: 5 }}
                    className='fadeIn'
                    value={searchTerm}
                    onChange={(e) => onSearch(e.target.value)}
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

            <ProductList products={currentProducts} />

        </ShopLayout>
    )
}


export default SearchIndexPage
