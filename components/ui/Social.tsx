import React from 'react'
import NextLink from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail';
import { Box, Button, Divider, Link, TextField, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
    sizeFont: number
}

const Social: FC<Props> = ({ sizeFont }) => {
    return (
        <Box display='flex' justifyContent='center'>
            <NextLink href='https://www.instagram.com/royerstore.ar/' passHref>
                <Link>
                    <Button>  <InstagramIcon sx={{ fontSize: sizeFont }} /></Button>
                </Link>
            </NextLink>
            <NextLink href='https://walink.co/40c03f' passHref>
                <Link>
                    <Button> <WhatsAppIcon sx={{ fontSize: sizeFont }} /></Button>
                </Link>
            </NextLink>
            <NextLink href="mailto:info@royer.store" passHref>
                <Link>
                    <Button> <MailIcon sx={{ fontSize: sizeFont }} /></Button>
                </Link>
            </NextLink>

        </Box>
    )
}

export default Social