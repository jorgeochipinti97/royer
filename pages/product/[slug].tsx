import { useState, useContext, useEffect } from 'react';
import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { Box, Button, Card, CardMedia, Chip, Divider, Grid, Link, Modal, TextField, Typography } from '@mui/material';

import { CartContext } from '../../context/cart/CartContext';

import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui/ItemCounter';
import { localFavorites } from '../../utils';

import { dbProducts } from '../../database';
import { IProduct, ICartProduct, ISize } from '../../interfaces';
import { capitalizarPrimeraLetraPalabras, currency } from '../../utils';
import NextLink from 'next/link';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { tesloApi } from '../../api';
import { isValidEmail } from '../../utils/validations';
import FormQuery from '../../components/ui/FormQuery';
import Image from 'next/image';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import FavoriteIcon from '@mui/icons-material/Favorite';



interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const [isNoSize, setIsNoSize] = useState<boolean>()
  const [discountPrice, setDiscountPrice] = useState<number>(product.price)
  const [title_, setTitle] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isInFavorites, setIsInFavorites] = useState<Boolean>()


  useEffect(() => {
    let favorites: IProduct[] = JSON.parse(localStorage.getItem('favorites') || '[]')
    let a
    const isLiked = () => {
      favorites.forEach(e => {
        if (e._id == product._id) {
          a = true;
        } else {
          a = false
        }
      })
    }
    isLiked()

    if (a && a != undefined) {
      setIsInFavorites(true)
    } else {
      setIsInFavorites(false)
    }

  }, [])

  useEffect(() => {
    if (product.type != 'espadrilles' && product.gender === 'regionales' || product.gender === 'fashion') {
      setIsNoSize(true)
      setTempCartProduct(currentProduct => ({
        ...currentProduct,
        size: 'Unique'
      }));
    }
    product.type == 'espadrilles' && setIsNoSize(false)


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNoSize])
  const router = useRouter();
  const { addProductToCart } = useContext(CartContext)
  /*   TODO ::  HACER REFACTORIZACION DEL HANDLE PRICE */
  const handlePrice = (precio: number, descuento: number) => {
    const porcentajePrecioConDescuento = 100 - descuento;
    const precioConDescuento = (precio * porcentajePrecioConDescuento) / 100;

    return precioConDescuento;
  }

  useEffect(() => {
    setTitle(product.slug)
    const a = handlePrice(product.price, 10)
    setDiscountPrice(a)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })

  const selectedSize = (size: ISize) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      size
    }));
  }

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      quantity
    }));
  }


  const onAddProduct = () => {

    if (!tempCartProduct.size) { return; }

    addProductToCart(tempCartProduct);
    router.push('/cart');

  }


  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(product)
    setIsInFavorites(!isInFavorites)
  }

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Box sx={{ mb: 2 }} display='flex' justifyContent={'space-between'}>
        <Box sx={{ m: 2 }}>
          <NextLink href='/products' passHref>
            <Link>
              <Button color='secondary'>Back</Button>
            </Link>
          </NextLink>
        </Box>

        <Box sx={{ m: 2 }}>
          {isInFavorites ?
            <FavoriteIcon
              color='error'
              onClick={onToggleFavorite}
            />
            :
            <FavoriteBorderIcon
              color='error'
              onClick={onToggleFavorite} />
          }
        </Box>
      </Box>

      <Grid container spacing={3}>

        <Grid item xs={12} sm={7}>

          <ProductSlideshow
            images={product.images}
            seconds={7000}
            height={1200}
            width={1200}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>

            {/* titulos */}
            <Box display='flex' justifyContent='center'>

              <Typography variant='h1' textAlign={'center'} sx={{ width: 300 }}>{capitalizarPrimeraLetraPalabras(product.title)}</Typography>
            </Box>

            <Box display='flex' justifyContent='space-around' sx={{ m: 3 }}>
              <NextLink href={`#`} passHref prefetch={false}>
                <Link>
                  <Button
                    color="primary"
                    onClick={() => console.log()}

                    sx={{ width: '163px', m: 2, pt: 1, pb: 1 }}>
                    <Typography variant='button'>
                      USD: {`${currency.formattwo(product.price)}`}
                    </Typography>
                  </Button>
                </Link>
              </NextLink>
              <NextLink href={`#`} passHref prefetch={false}>
                <Link>
                  <Button
                    color="success"
                    onClick={() => console.log()}
                    startIcon={<CurrencyBitcoinIcon />}
                    sx={{ width: '163px', pt: 1, pb: 1, m: 2 }}
                  >
                    <Typography fontWeight={700} variant='button' >
                      Crypto: {`${currency.formattwo(discountPrice)}`}
                    </Typography>
                  </Button>
                </Link>
              </NextLink>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box display='flex' justifyContent='center'>
              <Chip label="Free Shipping!" color="success" variant="outlined" />
            </Box>
            <Box sx={{ my: 2, }}>
              <Typography variant='subtitle2' sx={{ m: 2 }}>Quantity</Typography>
              <Box sx={{ mb: 2 }}>

                <ItemCounter
                  currentValue={tempCartProduct.quantity}
                  updatedQuantity={onUpdateQuantity}
                  maxValue={product.inStock > 10 ? 10 : product.inStock}
                />
              </Box>


              {!isNoSize ?
                <SizeSelector
                  sizes={product.sizes}
                  selectedSize={tempCartProduct.size}
                  onSelectedSize={selectedSize}
                /> : null
              }
            </Box>
            <Box>
              <Button onClick={() => setIsOpen(true)} color='primary' sx={{ m: 3 }}>Size Guide</Button>
              <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box display='flex' justifyContent='center' >

                  <Card>
                    <Box display='flex' justifyContent='center' >
                      <Button onClick={() => setIsOpen(false)} sx={{ m: 3 }} color='primary'>Close</Button>
                    </Box>
                    <CardMedia
                      component='div'
                      className='fadeIn'>
                      <Image src={product.type != 'espadrilles' ? 'https://res.cloudinary.com/djk4q3tys/image/upload/v1650890012/lzr8ottm36ivarjng6xx.jpg' : 'https://res.cloudinary.com/djk4q3tys/image/upload/v1659495626/crugli9fcbf80ff1jxts.jpg'} alt='size' width={700} height={700} />
                    </CardMedia>
                  </Card>
                </Box>
              </Modal>
            </Box>


            {
              (product.inStock == 0)
                ? (
                  <Chip label="No stock" color="error" variant='outlined' />
                )
                : (
                  <Button
                    color="secondary"
                    className='circular-btn'
                    onClick={onAddProduct}
                  >
                    {
                      tempCartProduct.size
                        ? 'Add to cart'
                        : 'Select Size'
                    }
                  </Button>
                )

            }


            {/* Descripción */}
            <Box sx={{ mt: 3 }} display='flex' justifyContent='center'>
              <Typography variant='subtitle2'>Description</Typography>
            </Box>

            <Box sx={{ mt: 3 }} display='flex' justifyContent='center'>
              <Typography variant='body2' align="justify" sx={{ width: 300 }}>{product.description}</Typography>
            </Box>

          </Box>
          <Box>
            <FormQuery product_={product.title} />
          </Box>
        </Grid>


      </Grid>

    </ShopLayout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const productSlugs = await dbProducts.getAllProductSlugs();


  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}



export default ProductPage