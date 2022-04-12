import type { NextPage } from 'next';
import { Box, Divider, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList, ProductSlideshow } from '../../components/products';
import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';
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