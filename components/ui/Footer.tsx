import NextLink from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { Box, Button, Divider, Link, TextField, Typography } from '@mui/material';
import FormQuery from './FormQuery';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const Footer = () => {
    const router = useRouter()
    const [isVisible, setIsVisible] = useState<boolean>()


    return (
        <footer >

            <Box >
                <Divider sx={{ my: 1 }} />
                <Box display='flex' justifyContent='center'>
                    <NextLink href='https://www.instagram.com/royerstore.ar/' passHref>
                        <Link>
                            <Button>  <InstagramIcon sx={{ mr: 4, ml: 4, mb: 2 }} /></Button>

                        </Link>
                    </NextLink>
                    <NextLink href='https://twitter.com/StoreRoyer' passHref>
                        <Link>
                            <Button> <TwitterIcon sx={{ mr: 4, ml: 4, mb: 2 }} /></Button>

                        </Link>
                    </NextLink>

                </Box>
                <Box display='flex' justifyContent='center'>
                    <NextLink href='/' passHref>
                        <Link>
                            <Button>Home</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/products' passHref>
                        <Link>
                            <Button>Products</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/' passHref>
                        <Link>
                            <Button>Find My Order</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/' passHref>
                        <Link>
                            <Button>Contact Us</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/' passHref>
                        <Link>
                            <Button>FAQS</Button>
                        </Link>
                    </NextLink>
                </Box>
                <Box display='flex' justifyContent='center' sx={{ mt: 3 }} >
                    <Typography component='h5'><CopyrightIcon sx={{ fontSize: 14 }} />  all rights reserved. Royer</Typography>
                </Box>
                <Box display='flex' justifyContent='center' sx={{ mt: 3, mb: 2 }} >
                    <Typography component='h5' fontWeight={650}> Development by LAZARO</Typography>
                </Box>
            </Box>
        </footer>
    )
}

