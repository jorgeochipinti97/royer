import { useMemo, useState, useEffect } from 'react';
import NextLink from 'next/link';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link, Divider, Button, Chip, capitalize } from '@mui/material'

import Image from 'next/image';



export const ClickHere = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <Grid item
            xs={6}
            sm={4}
        >
            <Card>
                <NextLink href={'/contact'} passHref prefetch={false}>
                    <Link>
                        <CardActionArea>
                            <CardMedia
                                component='div'
                                className='fadeIn'
                                onLoad={() => setIsImageLoaded(true)}>
                                <Image width={500} height={500} alt='royer' src='https://res.cloudinary.com/djk4q3tys/image/upload/v1652037641/eeu1n0hrg8zvelbo9jjj.jpg' />
                            </CardMedia>
                        </CardActionArea>
                    </Link>
                </NextLink>
            </Card>
            <Divider sx={{ my: 2 }} />
        </Grid>
    )
}
