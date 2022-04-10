import { FC, useMemo, useState, useEffect } from 'react';
import NextLink from 'next/link';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IProduct } from '../../interfaces'
import { localFavorites } from '../../utils';

interface Props {
    product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
    const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(product))
    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const productImage = useMemo(() => {
        return isHovered
            ? product.images[1]
            : product.images[0];

    }, [isHovered, product.images])

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(product)
        setIsInFavorites(!isInFavorites)
    }




    return (
        <Grid item
            xs={6}
            sm={4}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card>
                <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
                    <Link>

                        <CardActionArea>
                            {/* 
                        {
                            (product.inStock === 0 ) && (
                                <Chip 
                                    color="primary"
                                    label="No hay disponibles"
                                    sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
                                />
                            )
                        } */}

                            <CardMedia
                                component='img'
                                className='fadeIn'
                                image={productImage}
                                alt={product.title}
                                onLoad={() => setIsImageLoaded(true)}
                            />

                        </CardActionArea>
                    </Link>
                </NextLink>
                {isInFavorites ?
                    <FavoriteIcon 
                    color='error'
                    onClick={onToggleFavorite}
                    />
                    :
                    <FavoriteBorderIcon
                    color='error'
                        onClick={onToggleFavorite}
                    />
                }

            </Card>

            <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
                <Typography fontWeight={700}>{product.title}</Typography>
                <Typography fontWeight={500}>{`$${product.price}`}</Typography>
            </Box>
        </Grid>
    )
}
