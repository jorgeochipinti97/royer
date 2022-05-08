import { ShopLayout } from "../../components/layouts"
import FormQuery from "../../components/ui/FormQuery"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail';
import { Box, Divider, Link } from "@mui/material";
import NextLink from 'next/link';

const index = () => {
  return (
    <ShopLayout title='Contact Us' pageDescription="page contact">
      <FormQuery product_="" />
      <Box display='flex' justifyContent='center' >
        <Box display='flex' justifyContent='space-around' sx={{ mt: 5, width: 500 }}>
          <Divider sx={{my:1}}/>
          <NextLink href='/' passHref>
            <Link>
              <WhatsAppIcon sx={{ fontSize: 50 }} />
            </Link>
          </NextLink>
          <NextLink href='/' passHref>
            <Link>
              <MailIcon sx={{ fontSize: 50 }} />
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  )
}

export default index