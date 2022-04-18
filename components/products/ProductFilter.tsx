import { useState, useEffect } from 'react';
import { FullScreenLoading } from '../../components/ui';

import { capitalize, Box, Button, Divider, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { useProducts } from '../../hooks';
import { ProductList } from './ProductList';
import { IProduct } from '../../interfaces';




export const ProductFilterPage = () => {
    const { products, isLoading } = useProducts('/products');
    const [_productsFiltered, setProductsFiltered] = useState<IProduct[]>(products)
    const [valueProduct, setValueProduct] = useState<string>('all')
    const [typeProduct, setTypeProduct] = useState<string>('')
    const genders_ = ['all', 'kid', 'regionales', 'fashion']
    const todasCategorias = ['shirts', 't-shirt', 'football shirt', 'jacket', 'pants', 'hoodies', 'hats', 'mate', 'yerba', 'alfajores', 'wine', 'short', 'socks', 'wallet', 'purse', 'accessories', 'bag']
    const categoriasRopa = ['shirts', 't-shirt', 'football shirt', 'jacket', 'pants', 'hoodies', 'hats', 'short', 'socks', 'wallet', 'purse']
    const fashion__ = ['wallet', 'purse', 'shirts', 'bag', 'hats']
    const categoriasRegional = ['mate', 'yerba', 'alfajores', 'wine']
    const [categories, setCategories] = useState<string[]>(todasCategorias)
    const [select_, setSelect_] = useState<string>('')



    useEffect(() => {
        if (select_ == 'populars') {
            console.log('hola1')
            // const newProducts: IProduct[] = _productsFiltered.filter(e => e.slug.includes('river') || e.slug.includes('boca'))
            // setProductsFiltered(newProducts)
        } else if (select_ == 'hight') {
            console.log('hola2')
            const newProducts: IProduct[] = _productsFiltered.sort((a: IProduct, b: IProduct) => {
                if (a.price < b.price) {
                    return 1
                } else if (a.price, b.price) {
                    return -1
                }
                return 0
            })
            setProductsFiltered(newProducts)
        } else if (select_ == 'low') {
            console.log('asdsadsa')
            const newProducts: IProduct[] = _productsFiltered.sort((a: IProduct, b: IProduct) => {
                if (a.price < b.price) {
                    return -1
                } else if (a.price, b.price) {
                    return 1
                }
                return 0
            })
            setProductsFiltered(newProducts)
        }
    }, [select_])



    const handleClickValues = (valueOfProduct_: string) => {
        try {
            if (valueOfProduct_ === 'all') {
                setProductsFiltered(products)
                setValueProduct(valueOfProduct_)
                setCategories(todasCategorias)
                setTypeProduct('')
                setSelect_('hight')
                console.log(categories)

            } else if (valueOfProduct_ === 'regionales') {
                const newProducts_ = products.filter(e => e.gender === valueOfProduct_)
                setProductsFiltered(newProducts_)
                setValueProduct(valueOfProduct_)
                setCategories(categoriasRegional)
                setTypeProduct('')

                console.log(newProducts_)

            } else if (valueOfProduct_ == 'fashion') {
                const newProducts_ = products.filter(e => e.gender === valueOfProduct_)
                setProductsFiltered(newProducts_)
                setValueProduct(valueOfProduct_)
                setCategories(fashion__)
                setTypeProduct('')
            } else {
                const newProducts_ = products.filter(e => e.gender === valueOfProduct_)
                setProductsFiltered(newProducts_)
                setCategories(categoriasRopa)
                setValueProduct(valueOfProduct_)
                setTypeProduct('')
                console.log(newProducts_)
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
                console.log(newProducts_)

            } else {

                setTypeProduct(typeOfProduct_)
                const newProducts_ = products.filter(e => e.type === typeOfProduct_ && e.gender === valueProduct)

                setProductsFiltered(newProducts_)
                console.log(newProducts_)
            }


        } catch (err) {
            alert(err)
        }

    }

    return (
        <>

            <Box>
                <Box>
                    <Box display='flex' justifyContent='center'>

                        <Box
                        >
                            <Box display='flex' justifyContent='center' sx={{ flexWrap: { xs: 'wrap', sm: 'wrap' } }} >
                                {genders_.map(e => (
                                    <Box key={e}>
                                        <Button color={valueProduct === e ? 'primary' : 'info'}
                                            onClick={() => handleClickValues(e)}
                                        >{capitalize(e)}</Button>
                                    </Box>
                                ))}

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
                                    <Box >
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
                <Box>
                    <FormControl sx={{ m: 3, minWidth: 120 }}>
                        <InputLabel id="select-label">Sort By</InputLabel>
                        <Select
                            labelId="select-label"
                            id="select"
                            label="sort by"
                            value=''
                            onChange={e => setSelect_(e.target.value)}
                        >
                            <MenuItem value={'populars'}>Populars</MenuItem>
                            <MenuItem value={'hight'}>Price: hight to low  </MenuItem>
                            <MenuItem value={'low'}>Price: low to hight  </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box >
            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={_productsFiltered} />
            }
        </>

    )
}
