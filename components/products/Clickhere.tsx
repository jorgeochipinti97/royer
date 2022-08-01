import { useState } from 'react';
import NextLink from 'next/link';
import { Grid, Card, CardActionArea, CardMedia, Link, Divider, } from '@mui/material'

import Image from 'next/image';



export const ClickHere = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <Grid item
            xs={6}
            sm={4}
        >
            <Card sx={{ m: 3 }}>
                <NextLink href={'/contact'} passHref prefetch={false}>
                    <Link>
                        <CardActionArea>
                            <CardMedia
                                component='div'
                                className='fadeIn'
                                onLoad={() => setIsImageLoaded(true)}>
                                <Image width={500} height={500} alt='royer' src='https://res.cloudinary.com/djk4q3tys/image/upload/v1652040590/uffw9po6ntgqvc0lx7zu.jpg' />
                            </CardMedia>
                        </CardActionArea>
                    </Link>
                </NextLink>
            </Card>
            <Divider sx={{ my: 2 }} />
        </Grid>
    )
}
