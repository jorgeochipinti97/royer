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
  product__: IProduct[]
}


const HomePage: NextPage<Props> = ({ product__ }) => {

  useEffect(() => {

    const tshirts: IProduct[] = sortPopularity(product__, 'shirts')
    const alfajores: IProduct[] = sortPopularity(product__, 'alfajores')
    const wine: IProduct[] = sortPopularity(product__, 'wine')
    const mate: IProduct[] = sortPopularity(product__, 'mate')
    const accessories: IProduct[] = sortPopularity(product__, 'accessories')

    tshirts.sort((a: IProduct, b: IProduct) => {

      if (a.slug.indexOf('argentina_official_') < b.slug.indexOf('argentina_official_')) {
        return 1
      } else if (a.slug.indexOf('argentina_official_') > b.slug.indexOf('argentina_official_')) {
        return -1
      }
      return 0
    })

    const tShirtsMessi = tshirts.sort((a: IProduct, b: IProduct) => {

      if (a.slug.indexOf('messi') < b.slug.indexOf('messi')) {
        return 1
      } else if (a.slug.indexOf('messi') > b.slug.indexOf('messi')) {
        return -1
      }
      return 0
    })


    const productos = tShirtsMessi
      .concat(alfajores)
      .concat(wine)
      .concat(mate)
      .concat(accessories)

    setProducts_(productos)

  }, [product__])

  const { products, isLoading } = useProducts('/products');
  const [products_, setProducts_] = useState(product__)

  return (
    <ShopLayout title={'Royer-Shop - Home'} pageDescription={'Home'}>
      <ProductSlideshow
        images={['https://res.cloudinary.com/djk4q3tys/image/upload/v1658111566/gdv6kqiai3nmfjbgwnx8.jpg', 'https://res.cloudinary.com/djk4q3tys/image/upload/v1650356226/hay8ghoiyq5miglpdxlm.jpg', 'https://res.cloudinary.com/djk4q3tys/image/upload/v1653643368/wwgc8tdtwvc7nq9x7ytw.jpg']}
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
              <Box sx={{ display:{xs:'none', sm:'block',md:'block',lg:'block',xl:'block'} }}>
                <ProductList products={products_.slice(0,6)} />
              </Box>
              <Box sx={{ display:{xs:'block', sm:'none',md:'none',lg:'none',xl:'none'} }}>
                <ProductList products={products_} />
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

  const product__ = await dbProducts.getPopulars()

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
