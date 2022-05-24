import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';

import { ShopLayout } from '../components/layouts';

import {  ProductList, ProductSlideshow } from '../components/products';
import { useProducts } from '../hooks';

import { FullScreenLoading } from '../components/ui';
import { useEffect, useState } from 'react';
import { IProduct } from '../interfaces';
import { dbProducts } from '../database';



interface Props {
  product__: []
}


const HomePage: NextPage<Props> = ({ product__ }) => {

  const { products, isLoading } = useProducts('/products');
  const [products_, setProducts_] = useState(product__)

  return (
    <ShopLayout title={'Royer-Shop - Home'} pageDescription={'Home'}>
      <ProductSlideshow
        images={['https://res.cloudinary.com/djk4q3tys/image/upload/v1653305089/batbidvm80rcoojptk8g.jpg', 'https://res.cloudinary.com/djk4q3tys/image/upload/v1650356226/hay8ghoiyq5miglpdxlm.jpg', 'https://res.cloudinary.com/djk4q3tys/image/upload/v1651118990/kvdeqhgybkch04xzr6ce.jpg']}
        seconds={3000}
        height={1000}
        width={1800}
      />

      {
        isLoading
          ? <FullScreenLoading />
          : (
            <>
              <Box display='flex' justifyContent='center'>
                <Typography variant="h1" sx={{ mb: 2, mt: 5 }}>Most Populars</Typography>
              </Box>
              <ProductList products={products_} />
           
            </>
          )
      }



      <Box sx={{ mt: 3 }} display='flex' justifyContent='center'>
        <Typography variant='h1'>About Us</Typography>
      </Box>
      <Box sx={{ mt: 1 }} display='flex' justifyContent='center'>
        <Typography variant='body1' align="justify" sx={{ width: 500,margin:3 }}>
          Royer emerged at the end of 2021 as an idea, which we were able to carry out thanks to a lot of effort and dedication.
          Royers main objective is to make products known worldwide that could only be obtained locally, working together with Fedex and DHL this can be done safely and reliably.
          Royer is founded by only three members who each contributed their efforts to carry this out.</Typography>
      </Box>
    </ShopLayout>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const product__ = await dbProducts.getPopulars()
  console.log(product__)

  console.log(product__)
  if (!product__) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product__
    },
    revalidate: 60 * 60 * 24
  }
}
