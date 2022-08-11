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
    const [_productsFiltered, setProductsFiltered] = useState<IProduct[]>(products)
    const [typeProduct, setTypeProduct] = useState<string>('')
    const genders_ = ['all', 'fashion']
    const todasCategorias = ['shirts', 'jacket', 'pants', 'mate', 'yerba', 'alfajores', 'wine', 'short', 'socks', 'wallet', 'purse', 'accessories', 'bag', 'espadrilles', 'footwear']
    const categoriasRopa = ['shirts', 'jacket', 'pants', 'short', 'socks', 'wallet', 'purse', 'espadrilles']
    const fashion__ = ['wallet', 'purse', 'shirts', 'bag', 'espadrilles', 'footwear']
    const categoriasRegional = ['mate', 'yerba', 'alfajores', 'wine']
    const [categories, setCategories] = useState<string[]>(todasCategorias)
    const [select_, setSelect_] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {

        searchTerm.length == 0 && setProductsFiltered(products)
        const newProducts = _productsFiltered.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()))
        searchTerm && setProductsFiltered(newProducts)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm])


    const handleSelectChange = (e: string) => {
        setSelect_(e)
        _productsFiltered && e == 'low' && sortLow(_productsFiltered)
        _productsFiltered && e == 'high' && sortHigh(_productsFiltered)
    }

    const handleClickValues = (valueOfProduct_: string) => {

        const handleProduct = (products: IProduct[], valueOfProduct: string, categoria: string[], typeofProduct: string, select?: string) => {
            setProductsFiltered(products)
            setValueProduct(valueOfProduct)
            setCategories(categoria)
            setTypeProduct(typeofProduct)
            select && setSelect_(select)
        }

        try {
            if (valueOfProduct_ === 'all') {
                handleProduct(products, valueOfProduct_, todasCategorias, '', 'populars')
            }
            else if (valueOfProduct_ === 'regionales') {
                const newProducts_ = products.filter(e => e.gender === valueOfProduct_)
                handleProduct(newProducts_, valueOfProduct_, categoriasRegional, '',)

            } else if (valueOfProduct_ == 'fashion') {
                const newProducts_ = products.filter(e => e.gender === valueOfProduct_)
                handleProduct(newProducts_, valueOfProduct_, fashion__, '',)
            } else {
                const newProducts_ = products.filter(e => e.gender === valueOfProduct_)
                handleProduct(newProducts_, valueOfProduct_, categoriasRopa, '',)
            }
        } catch (err) {
            alert(err)
        }
    }

    const handleClickTypes = (typeOfProduct_: string) => {
        try {
            if (valueProduct === 'all') {
                setTypeProduct(typeOfProduct_)
                const newProducts_ = products.filter(e => e.type === typeOfProduct_)
                setProductsFiltered(newProducts_)
            } else {
                setTypeProduct(typeOfProduct_)
                const newProducts_ = products.filter(e => e.type === typeOfProduct_ && e.gender === valueProduct)
                setProductsFiltered(newProducts_)
            }
        } catch (err) {
            alert(err)
        }
    }

    return (
        <>
            (
            <>
                <Box>
                    <Box>
                        <Box display='flex' justifyContent='center'>
                            <Box>
                                <Box display='flex' justifyContent='center' sx={{ flexWrap: { xs: 'wrap', sm: 'wrap' } }} >
                                    {genders_.map(e => (
                                        <Box key={e}>
                                            <Button color={valueProduct === e ? 'primary' : 'info'}
                                                onClick={() => handleClickValues(e)}
                                            >{capitalize(e)}</Button>
                                        </Box>
                                    ))}
                                    <Box >
                                        <Button color={valueProduct === 'regionales' ? 'primary' : 'info'}
                                            onClick={() => handleClickValues('regionales')}
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
                                            <Button onClick={() => handleClickTypes(e)} color={typeProduct === e ? 'primary' : 'info'}>{capitalize(e)}</Button>
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
                        : <ProductList products={_productsFiltered} />
                }
            </>
            )

        </>

    )
}
