import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';
import { GetStaticProps } from 'next';

import { ShopLayout } from '../components/layouts';

import { ProductList, ProductSlideshow } from '../components/products';
import { useProducts } from '../hooks';

import { FullScreenLoading } from '../components/ui';
import { useEffect, useState } from 'react';
import { IProduct } from '../interfaces';
import { dbProducts } from '../database';
import { sortPopularity } from '../utils';



interface Props {
  populars_: IProduct[]
}


const HomePage: NextPage<Props> = ({ populars_ }) => {

  const { isLoading } = useProducts('/products');

  return (
    <ShopLayout title={'Royer-Shop - Home'} pageDescription={'Home'}>
      {/* <ProductSlideshow
        images={['https://res.cloudinary.com/djk4q3tys/image/upload/v1671629116/bwgauczcvhizfnehrizp.jpg','https://res.cloudinary.com/djk4q3tys/image/upload/v1671629081/sa0wva9eyoxdxvmgoqp8.jpg','https://res.cloudinary.com/djk4q3tys/image/upload/v1671629081/bj5aky8g3gz7lkhzjyhi.webp', 'https://res.cloudinary.com/djk4q3tys/image/upload/v1650356226/hay8ghoiyq5miglpdxlm.jpg','https://res.cloudinary.com/djk4q3tys/image/upload/v1670998312/ne77motg2em6s2dhb2m1.png', 'https://res.cloudinary.com/djk4q3tys/image/upload/v1653643368/wwgc8tdtwvc7nq9x7ytw.jpg']}
        seconds={3000}
        height={1000} 
        width={1800}
      /> */}
      {
        isLoading
          ? <FullScreenLoading />
          : (
            <>
              <Box display='flex' justifyContent='center'>
                <Typography variant="h1" sx={{ mb: 2, mt: 5 }}>Most Populars</Typography>

              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' } }}>
                <ProductList products={populars_.slice(0, 6)} />

              </Box>
              <Box sx={{ display: { xs: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none' } }}>
                <ProductList products={populars_} />
              </Box>

            </>
          )
      }

      <Box sx={{ mt: 3 }} display='flex' justifyContent='center'>
        <Typography variant='h1'>About Us</Typography>
      </Box>
      <Box sx={{ mt: 1 }} display='flex' justifyContent='center'>
        <Typography variant='body1' align="justify" sx={{ width: 500, margin: 3 }}>
          Royer emerged at the end of 2021 as an idea, which we were able to carry out thanks to a lot of effort and dedication.
          Royers main objective is to make products known worldwide that could only be obtained locally, working together with Fedex and DHL this can be done safely and reliably.
          Royer is founded by only three members who each contributed their efforts to carry this out.</Typography>
      </Box>
    </ShopLayout>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const populars_ = await dbProducts.getPopulars()
  if (!populars_) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      populars_
    },
    revalidate: 3600 
  }
}
