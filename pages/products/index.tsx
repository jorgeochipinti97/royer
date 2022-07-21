import {  Divider } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { useProducts } from '../../hooks';

import { ProductFilterPage } from '../../components/products/ProductFilter';


const ProductsPage = () => {
    const { products, isLoading } = useProducts('/products');
    



    return (
        <ShopLayout title={'Royer-Shop - Products'} pageDescription={'Encuentra los mejores productos aquí'}>
            <Divider sx={{my:1}}/>
        <ProductFilterPage />

        </ShopLayout>
    )
}
export default ProductsPage