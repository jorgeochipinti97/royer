
import CopyrightIcon from '@mui/icons-material/Copyright';
import { Box, Divider, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Social from './Social';
import CodeIcon from '@mui/icons-material/Code';
import NextLink from 'next/link';
export const Footer = () => {
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
                <NextLink href='/Terms'>
                    <Link>
                        <Box display='flex' justifyContent='center' sx={{ mt: 3 }} >
                            <Typography component='h5'><CopyrightIcon sx={{ fontSize: 14 }} />  Terms Of Service</Typography>
                        </Box>
                    </Link>
                </NextLink>
                <Box display='flex' justifyContent='center' sx={{ mt: 3 }} >
                    <Typography component='h5'> all rights reserved. Royer</Typography>
                </Box>
                <Box display='flex' justifyContent='center' sx={{ mt: 3, mb: 2 }} >
                    <CodeIcon sx={{ mr: 1 }} />
                    <Typography component='h5' fontWeight={650}> Development by Jorge Ochipinti</Typography>
                </Box>
            </Box>
        </footer>
    )
}

