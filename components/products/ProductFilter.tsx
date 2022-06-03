import { useState, useEffect } from 'react';
import { FullScreenLoading } from '../../components/ui';

import { capitalize, Box, Button, Divider, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { useProducts } from '../../hooks';
import { ProductList } from './ProductList';
import { IProduct } from '../../interfaces';
import { sortHigh, sortLow, sortPopularity } from '../../utils/sort';




export const ProductFilterPage = () => {
    const { products, isLoading } = useProducts('/products');
    const [valueProduct, setValueProduct] = useState<string>('all')
    const [_productsFiltered, setProductsFiltered] = useState<IProduct[]>(products)
    const [typeProduct, setTypeProduct] = useState<string>('')
    const genders_ = ['all', 'fashion']
    const todasCategorias = ['shirts', 'jacket', 'pants', 'hoodies', 'hats', 'mate', 'yerba', 'alfajores', 'wine', 'short', 'socks', 'wallet', 'purse', 'accessories', 'bag']
    const categoriasRopa = ['shirts', 'jacket', 'pants', 'hoodies', 'hats', 'short', 'socks', 'wallet', 'purse']
    const fashion__ = ['wallet', 'purse', 'shirts', 'bag', 'hats']
    const categoriasRegional = ['mate', 'yerba', 'alfajores', 'wine']
    const [categories, setCategories] = useState<string[]>(todasCategorias)
    const [select_, setSelect_] = useState<string>('populars')

    useEffect(() => {
        const _handle = () => {
            const a = sortByType(products)
            setProductsFiltered(a)
        }
        _handle()
    }, [products])


    const handleSelectChange = (e: string) => {
        setSelect_(e)
        if (e == 'low') {
            sortLow(_productsFiltered)
        }

        if (e == 'high') {
            sortHigh(_productsFiltered)

        }

        // if(e =='popularity'){
        //     sortPopularity(_productsFiltered)
        // }
    }

    // useEffect(() => {
    // const sort =()=>{
    //     const a =   sortByType(_productsFiltered)
    //     setProductsFiltered(a)
    // }
    // sort()

    // }, [_productsFiltered])

    const sortByType = (products: IProduct[]) => {

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
        const pants: IProduct[] = sortPopularity(products, 'pants')
        const socks: IProduct[] = sortPopularity(products, 'socks')
        const purse: IProduct[] = sortPopularity(products, 'purse')
        const bag: IProduct[] = sortPopularity(products, 'bag')
        const wallet: IProduct[] = sortPopularity(products, 'wallet')
        const hats: IProduct[] = sortPopularity(products, 'hats')
        const mate: IProduct[] = sortPopularity(products, 'mate')
        const accessories: IProduct[] = sortPopularity(products, 'accessories')
        const alfajores: IProduct[] = sortPopularity(products, 'alfajores')
        const wine: IProduct[] = sortPopularity(products, 'wine')
        const yerba: IProduct[] = sortPopularity(products, 'yerba')

  
        return tShirtsMessi
            .concat(shorts)
            .concat(hoodies)
            .concat(jacket)
            .concat(pants)
            .concat(socks)
            .concat(bag)
            .concat(purse)
            .concat(wallet)
            .concat(hats)
            .concat(mate)
            .concat(accessories)
            .concat(alfajores)
            .concat(wine)
            .concat(yerba)


    }

    const handleClickValues = (valueOfProduct_: string) => {
        try {
            if (valueOfProduct_ === 'all') {
                const a = sortByType(products)
                setProductsFiltered(a)
                setValueProduct(valueOfProduct_)
                setCategories(todasCategorias)
                setTypeProduct('')
                setSelect_('populars')
                console.log(categories)

            } else if (valueOfProduct_ === 'regionales') {
                const newProducts_ = products.filter(e => e.gender === valueOfProduct_)
                const a = sortByType(newProducts_)
                setProductsFiltered(a)
                setValueProduct(valueOfProduct_)
                setCategories(categoriasRegional)
                setTypeProduct('')


            } else if (valueOfProduct_ == 'fashion') {
                const newProducts_ = products.filter(e => e.gender === valueOfProduct_)
                const a = sortByType(newProducts_)
                setProductsFiltered(a)
                setValueProduct(valueOfProduct_)
                setCategories(fashion__)
                setTypeProduct('')
            } else {
                const newProducts_ = products.filter(e => e.gender === valueOfProduct_)
                const a = sortByType(newProducts_)
                setProductsFiltered(a)
                setCategories(categoriasRopa)
                setValueProduct(valueOfProduct_)
                setTypeProduct('')
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
                const a = sortByType(newProducts_)
                setProductsFiltered(a)


            } else {

                setTypeProduct(typeOfProduct_)
                const newProducts_ = products.filter(e => e.type === typeOfProduct_ && e.gender === valueProduct)

                const a = sortByType(newProducts_)
                setProductsFiltered(a)

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
                                        >Regionals</Button>
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
            </Box >
            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={_productsFiltered} />
            }
        </>

    )
}
