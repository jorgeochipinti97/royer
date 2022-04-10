import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts';

import { ProductList, ProductSlideshow } from '../components/products';
import { useProducts } from '../hooks';

import { FullScreenLoading } from '../components/ui';


const HomePage: NextPage = () => {

  const { products, isLoading } = useProducts('/products');


  return (
    <ShopLayout title={'Royer-Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
      <Box display='flex' justifyContent='center' sx={{mb:5}}>
        <Typography variant='h1' component='h1'>Pay with cryptocurrency</Typography>
      </Box>
      <ProductSlideshow images={['https://res.cloudinary.com/djk4q3tys/image/upload/v1649520328/iaxptbkk6aynmqsxho5g.png', 'https://res.cloudinary.com/djk4q3tys/image/upload/v1649520328/iaxptbkk6aynmqsxho5g.png']} />

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }


    </ShopLayout>
  )
}

export default HomePage
