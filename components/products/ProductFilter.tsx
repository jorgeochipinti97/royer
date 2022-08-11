import { useState, useEffect } from 'react';
import { FullScreenLoading } from '../../components/ui';

import { capitalize, Box, Button, Divider, InputLabel, Select, MenuItem, FormControl, IconButton, Input, InputAdornment } from '@mui/material';
import { useProducts } from '../../hooks';
import { ProductList } from './ProductList';
import { IProduct } from '../../interfaces';
import { sortHigh, sortLow } from '../../utils/sort';
import { ClearOutlined } from '@mui/icons-material';




export const ProductFilterPage = () => {
    const { products, isLoading } = useProducts('/products');
    const [valueProduct, setValueProduct] = useState<string>('all')
    const [typeProduct, setTypeProduct] = useState<string>('')
    const [_productsFiltered, setProductsFiltered] = useState<IProduct[]>(products)
    const genders_ = ['all', 'fashion']
    const todasCategorias = ['shirts', 'jacket', 'pants', 'mate', 'yerba', 'alfajores', 'wine', 'short', 'socks', 'wallet', 'purse', 'accessories', 'bag', 'espadrilles', 'footwear']
    const fashion__ = ['wallet', 'purse', 'bag', 'espadrilles', 'footwear']
    const categoriasRegional = ['mate', 'yerba', 'alfajores', 'wine']
    const [categories, setCategories] = useState<string[]>(todasCategorias)
    const [select_, setSelect_] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        searchTerm.length == 0 && setProductsFiltered(products)
        const newProducts = _productsFiltered.filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()))
        searchTerm && setProductsFiltered(newProducts)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm])


    useEffect(() => {

        valueProduct == 'regionales' && setCategories(categoriasRegional)
        valueProduct == 'fashion' && setCategories(fashion__)
        valueProduct == 'all' && setCategories(todasCategorias)
        const newProductsValue = products.filter(e => e.gender == valueProduct)
        valueProduct == 'all' ? setProductsFiltered(products) : setProductsFiltered(newProductsValue)




        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueProduct])



    useEffect(() => {
        const newProductsValue = products.filter(e => e.gender == valueProduct)
        const newProductsType = newProductsValue.filter(e => e.type == typeProduct)
        const newProducts__ = products.filter(e => e.type == typeProduct)
        valueProduct == 'all' ? setProductsFiltered(newProducts__) : setProductsFiltered(newProductsType)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeProduct])


    const handleSelectChange = (e: string) => {
        setSelect_(e)
        _productsFiltered && e == 'low' && sortLow(_productsFiltered)
        _productsFiltered && e == 'high' && sortHigh(_productsFiltered)
    }

    const filterAll = () => {
        try {
            setTypeProduct('')
            setCategories(todasCategorias)
            setProductsFiltered(products)
        } catch (err) {
            console.log(err)
        }
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
                                                e =='all' && filterAll()
                                                setValueProduct(e)
                                            }}
                                        >{capitalize(e)}</Button>
                                    </Box>
                                ))}
                                <Box >
                                    <Button color={valueProduct === 'regionales' ? 'primary' : 'info'}
                                        onClick={() => setValueProduct('regionales')}
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
                                        <Button onClick={() => setTypeProduct(e)} color={typeProduct === e ? 'primary' : 'info'}>{capitalize(e)}</Button>
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
                                {/* <MenuItem value={'popularity'}>popularity</MenuItem> */}
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
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    
                                        onClick={() => {
                                            setSearchTerm('')
                                            setValueProduct('all')
                                            setTypeProduct('')
                                        }}
                                    >
                                        <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Box>
                </Box>
            </Box >

            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={products} />
            }



        </>

    )
}
