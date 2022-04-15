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
      <ProductSlideshow
        images={['https://res.cloudinary.com/djk4q3tys/image/upload/v1650010722/ds5fundqtf5tgvtuxms8.jpg', 'https://res.cloudinary.com/djk4q3tys/image/upload/v1650010722/puzd1rdp1jkykqtxjkae.jpg', 'https://res.cloudinary.com/djk4q3tys/image/upload/v1650010722/nogmicqu6xlfarpcvrky.jpg']}
        seconds={3000}
        height={1000}
        width={1800}
      />


      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }


    </ShopLayout>
  )
}

export default HomePage
