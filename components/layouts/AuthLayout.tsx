import { FC } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import { Navbar } from '../ui';

interface Props {
    title: string;
}

export const AuthLayout: FC<Props> = ({ children, title  }) => {
  return (
    <>
        <Head>
            <title>{ title }</title>
        </Head>

        <main>
            <Navbar/>
            <Box display='flex' justifyContent='center' alignItems='center' height="calc(100vh - 200px)">   
                { children }
            </Box>
        </main>
    
    </>
  )
}
