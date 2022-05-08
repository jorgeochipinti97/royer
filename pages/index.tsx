import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts';

import { ProductList, ProductSlideshow } from '../components/products';
import { useProducts } from '../hooks';

import { FullScreenLoading } from '../components/ui';
import { useEffect, useState } from 'react';
import { IProduct } from '../interfaces';



const HomePage: NextPage = () => {

  const { products, isLoading } = useProducts('/products');
  const [products_, setProducts_] = useState(products)

  useEffect(() => {
    const filter_ = () => {
      const a = products.filter(e => e.slug === 'river_plate_adidas__home_heat.rdy_jersey_20-21_-_official' || e.slug == 'boca_juniors_jersey_21-22_heat.rdy_adidas_official' || e.slug === 'messi_argentina_team_home_t-shirt_10' || e.slug === 'wine_dv_catena_cabernet-malbec_750ml_case_x_2' || e.slug === 'executive_bag_leather_piet' || e.slug === 'alfajor_havanna_x12')
      setProducts_(a)
    }
    filter_()
  }, [])

  return (
    <ShopLayout title={'Royer-Shop - Home'} pageDescription={'Home'}>
      <ProductSlideshow
        images={['https://res.cloudinary.com/djk4q3tys/image/upload/v1651118986/tlcwig0alhbqnicxcib8.jpg', 'https://res.cloudinary.com/djk4q3tys/image/upload/v1650356226/hay8ghoiyq5miglpdxlm.jpg', 'https://res.cloudinary.com/djk4q3tys/image/upload/v1651118990/kvdeqhgybkch04xzr6ce.jpg']}
        seconds={3000}
        height={1000}
        width={1800}
      />
      <Box display='flex' justifyContent='center'>
        <Typography variant="h1" sx={{ mb: 2, mt: 5 }}>Most Populars</Typography>
      </Box>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products_} />
      }

      <Box sx={{ mt: 3 }} display='flex' justifyContent='center'>
        <Typography variant='h1'>About Us</Typography>
      </Box>
      <Box sx={{ mt: 1 }} display='flex' justifyContent='center'>
        <Typography variant='body1' align="justify" sx={{width:500}}>Royer emerged at the end of 2021 as an idea, which we were able to carry out thanks to a lot of effort and dedication.
          Royer's main objective is to make products known worldwide that could only be obtained locally, working together with Fedex and DHL this can be done safely and reliably.
          Royer is founded by only three members who each contributed their efforts to carry this out.</Typography>
      </Box>
    </ShopLayout>
  )
}

export default HomePage
