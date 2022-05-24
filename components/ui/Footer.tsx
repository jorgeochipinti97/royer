import NextLink from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { Box, Button, Divider, Link, TextField, Typography } from '@mui/material';
import FormQuery from './FormQuery';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail';
import Social from './Social';
export const Footer = () => {
    const router = useRouter()
    const [isVisible, setIsVisible] = useState<boolean>()
    const { asPath } = useRouter()


    return (
        <footer >
            <Box >
                <Divider sx={{ my: 1 }} />
                {
                    asPath == '/contact'
                        ? null
                        :
                        <Box display='flex' justifyContent='center'>

                            <Social sizeFont={25} />
                        </Box>
                }
                {/* <Box display='flex' justifyContent='center'>
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
                    <NextLink href='/find' passHref>
                        <Link>
                            <Button>Find My Order</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/contact' passHref>
                        <Link>
                            <Button>Contact Us</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/faqs' passHref>
                        <Link>
                            <Button>FAQS</Button>
                        </Link>
                    </NextLink>
                </Box> */}
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

