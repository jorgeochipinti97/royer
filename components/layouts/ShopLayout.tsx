import { FC } from 'react';
import Head from 'next/head';

import { Footer, Navbar, SideMenu } from '../ui';
import { Box } from '@mui/system';


interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
}

export const ShopLayout: FC<Props> = ({children, title, pageDescription, imageFullUrl }) => {
    return (
        <>
            <Head>
                <title>{title}</title>

                <meta name="description" content={pageDescription} />
                <meta property="og:image" content="https://res.cloudinary.com/djk4q3tys/image/upload/v1649880523/rgxxqk3chzfrtaqq2j9d.png" />


                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />

                {
                    imageFullUrl && (
                        <meta name="og:image" content={imageFullUrl} />
                    )
                }

            </Head>

            <nav>
                <Navbar />
            </nav>

            <SideMenu />
            {/* <Box display='flex' jusitfyContent='center'> */}

                <main style={{
                    margin: '80px auto',
                    minHeight:'60vh',
                    maxWidth: '1440px',
                    padding: '0px 0px'
    
                }}>
                    {children}
                </main>
            {/* </Box > */}

            {/* Footer */}
            <Footer />

        </>
    )
}


