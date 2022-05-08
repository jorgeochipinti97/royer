import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts';

import { ProductList, ProductSlideshow } from '../components/products';
import { useProducts } from '../hooks';

import { FullScreenLoading } from '../components/ui';



const HomePage: NextPage = () => {

  const { products, isLoading } = useProducts('/products');
  return (
    <ShopLayout title={'Royer-Shop - Home'} pageDescription={'Home'}>
      <ProductSlideshow
        images={['https://res.cloudinary.com/djk4q3tys/image/upload/v1651118986/tlcwig0alhbqnicxcib8.jpg', 'https://res.cloudinary.com/djk4q3tys/image/upload/v1650356226/hay8ghoiyq5miglpdxlm.jpg','https://res.cloudinary.com/djk4q3tys/image/upload/v1651118990/kvdeqhgybkch04xzr6ce.jpg' ]}
        seconds={3000}
        height={1000}
        width={1800}
      />
      {/* {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      } */}
    </ShopLayout>
  )
}

export default HomePage
