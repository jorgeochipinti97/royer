import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';


const KidPage: NextPage = () => {


  const { products, isLoading } = useProducts('/products?gender=kid');


  return (
    <ShopLayout title={'Royer-Shop - Kids'} pageDescription={'Encuentra los mejores productos de Teslo para niños'}>
        <Typography variant='h1' component='h1'>Kid</Typography>

        {
          isLoading
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        }

        
    

    </ShopLayout>
  )
}

export default KidPage
