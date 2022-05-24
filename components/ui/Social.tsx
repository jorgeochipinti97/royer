import React from 'react'
import NextLink from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail';
import { Box, Button, Divider, Link, TextField, Typography } from '@mui/material';
import { FC } from 'react';

interface Props{
    sizeFont: number
}

const Social:FC<Props> = ({sizeFont}) => {
    return (
        <Box display='flex' justifyContent='center' sx={{ml:7}}>
            <NextLink href='https://www.instagram.com/royerstore.ar/' passHref>
                <Link>
                    <Button>  <InstagramIcon sx={{ mr: 4, ml: 4, mb: 2, fontSize:sizeFont }} /></Button>

                </Link>
            </NextLink>
            <NextLink href='https://twitter.com/StoreRoyer' passHref>
                <Link>
                    <Button> <TwitterIcon sx={{ mr: 4, ml: 4, mb: 2,fontSize:sizeFont  }} /></Button>

                </Link>
            </NextLink>
            <NextLink href='https://walink.co/40c03f' passHref>
                <Link>
                    <Button> <WhatsAppIcon sx={{ mr: 4, ml: 4, mb: 2,fontSize:sizeFont  }} /></Button>

                </Link>
            </NextLink>
            <NextLink href="mailto:royerstorearg@gmail.com" passHref>
                <Link>
                    <Button> <MailIcon sx={{ mr: 4, ml: 4, mb: 2,fontSize:sizeFont  }} /></Button>

                </Link>
            </NextLink>

        </Box>
    )
}

export default Social