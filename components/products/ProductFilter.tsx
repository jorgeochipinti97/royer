import { useState, useEffect } from 'react';
import { FullScreenLoading } from '../../components/ui';

import { capitalize, Box, Button, Divider, InputLabel, Select, MenuItem, FormControl, IconButton, Input, InputAdornment } from '@mui/material';
import { useProducts } from '../../hooks';
import { IProduct } from '../../interfaces';
import { sortHigh, sortLow } from '../../utils/sort';
import { ProductCard } from '.'
import { ClickHere } from './Clickhere';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';




export const ProductFilterPage = () => {
    const { products, isLoading } = useProducts('/products')
    const { asPath } = useRouter()
    const [valueProduct, setValueProduct] = useState<string>('all')
    const [typeProduct, setTypeProduct] = useState<string>('shirts')
    const [_productsFiltered, setProductsFiltered] = useState<IProduct[]>(products)
    const genders_ = ['all', 'fashion']
    const todasCategorias = ['shirts', 'jacket', 'pants', 'mate', 'yerba', 'alfajores', 'wine', 'short', 'socks', 'wallet', 'purse', 'accessories', 'bag', 'espadrilles', 'footwear']
    const fashion__ = ['wallet', 'purse', 'bag', 'espadrilles', 'footwear']
    const categoriasRegional = ['mate', 'yerba', 'alfajores', 'wine']
    const [categories, setCategories] = useState<string[]>(todasCategorias)
    const [select_, setSelect_] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState('');
    const [currentsProducts, setCurrentProducts] = useState<IProduct[]>(_productsFiltered.slice(0, 15) || [])
    const [currentPage, setCurrentPage] = useState(1)

    
    useEffect(() => {
        searchTerm.length == 0 && getProductsFiltered()
        const newProducts = _productsFiltered.filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()))
        searchTerm && setProductsFiltered(newProducts)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm])

    const getProductsFiltered = () => {
        filterValues(valueProduct)
        filterTypes(typeProduct)
    }

    useEffect(() => {
        setCurrentProducts(_productsFiltered.slice(0, currentPage * 15))
    }, [_productsFiltered, currentPage])



    const filterValues = (valueProduct_: string) => {
        valueProduct_ == 'regionales' && setCategories(categoriasRegional)
        valueProduct_ == 'fashion' && setCategories(fashion__)
        valueProduct_ == 'all' && setCategories(todasCategorias)
        const newProductsValue = products.filter(e => e.gender == valueProduct_)
        valueProduct_ != 'all' && setProductsFiltered(newProductsValue)
        setCurrentPage(1)
    }

    const filterTypes = (typeOfProduct_: string) => {
        const newProductsValue = products.filter(e => e.gender == valueProduct && e.type == typeOfProduct_)
        const newProductsValueAll = products.filter(e => e.type == typeOfProduct_)
        valueProduct == 'all' ? setProductsFiltered(newProductsValueAll) : setProductsFiltered(newProductsValue)
        setCurrentPage(1)
    }


    const handleSelectChange = (e: string) => {
        setSelect_(e)
        _productsFiltered && e == 'low' && sortLow(_productsFiltered)
        _productsFiltered && e == 'high' && sortHigh(_productsFiltered)
    }

    const filterAll = () => {
        try {
            setTypeProduct('shirts')
            filterTypes('shirts')
            const newProductsValueAll = products.filter(e => e.type == 'shirts')
            setProductsFiltered(newProductsValueAll)
            setCategories(todasCategorias)
        } catch (err) {
            console.log(err)
        }
    }


    const getMoreProducts = () => {
        setCurrentPage(currentPage + 1)
        console.log(currentPage)
    }


    return (
        <>


            <Box>
                <Box>
                    <Box display='flex' justifyContent='center'>
                        <Box>
                            <Box display='flex' justifyContent='center' sx={{ flexWrap: { xs: 'wrap', sm: 'wrap' } }} >
                                {genders_.map(e => (
                                    <Box key={e}>
                                        <Button color={valueProduct === e ? 'primary' : 'info'}
                                            onClick={() => {
                                                e == 'all' && filterAll()
                                                filterValues(e)
                                                setValueProduct(e)
                                            }}
                                        >{capitalize(e)}</Button>
                                    </Box>
                                ))}
                                <Box >
                                    <Button color={valueProduct === 'regionales' ? 'primary' : 'info'}
                                        onClick={() => {
                                            setValueProduct('regionales')
                                            filterValues('regionales')
                                        }}
                                    >
                                        Regionals
                                    </Button>
                                </Box>

                            </Box>
                        </Box>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box flex={1} />
                    <Box

                        className="fadeIn">
                        <Box display='flex' justifyContent='center' sx={{ flexWrap: { xs: 'wrap', sm: 'wrap' } }}>

                            {
                                categories.map(e => (
                                    // eslint-disable-next-line react/jsx-key
                                    <Box key={e}>
                                        <Button onClick={() => {
                                            filterTypes(e)
                                            setTypeProduct(e)
                                        }

                                        } color={typeProduct === e ? 'primary' : 'info'}>{capitalize(e)}</Button>
                                    </Box>
                                )
                                )
                            }
                        </Box>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box flex={1} />
                </Box>
                <Box display='flex' justifyContent='space-around'>
                    <Box>
                        <FormControl sx={{ m: 3, minWidth: 120 }}>
                            <InputLabel id="select-label">Sort By</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select"
                                label="sort by"
                                value={select_}
                                onChange={e => handleSelectChange(e.target.value)}>
                                <MenuItem value={'low'}>Price: low to high  </MenuItem>
                                <MenuItem value={'high'}>Price: high to low  </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <Input
                            sx={{ mt: 5 }}
                            className='fadeIn'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type='text'
                            placeholder="Search..."

                        />
                    </Box>
                </Box>
            </Box >

            {
                isLoading
                    ? <FullScreenLoading />
                    :
                    <>
                        {/* <Grid container spacing={1}> */}

                        <InfiniteScroll
                            dataLength={currentsProducts.length}
                            next={getMoreProducts}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: window && window.innerWidth > 600 ? 'auto auto auto' : 'auto auto',
                                justifyContent: 'space-around',
                                overflow: 'hidden',

                            }}
                            hasMore={true}
                            loader={<span></span>}

                        >

                            {
                                currentsProducts.map(product => (


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

                        </InfiniteScroll>
                        {/* </Grid> */}
                    </>
            }



        </>

    )
}
