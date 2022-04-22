import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { useState } from 'react';
import { ConstructionOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { tesloApi } from '../../api';
import { IOrder } from '../../interfaces';

export default function Find() {
    const router = useRouter()
    const [idOrder, setIdOrder] = useState<string>()

    const onClickFind = async () => {
        try {
            const a = await tesloApi.get('/orders')
            let b: boolean = false
            a.data.map((e: { _id: string | undefined; }) => {
                if (e._id == idOrder) {
                    b = true
                } else {
                    b = false
                }
            })
            if (b) {
                return router.push(`/orders/${idOrder}`)
            } else {
                return alert('Your order was not found')
            }
        } catch (er) {
            console.log(er)
        }
    }


    const handleChange = (e: string) => {
        setIdOrder(e)
    }
    return (
        <ShopLayout title='Find Orders' pageDescription='find orders'>
            <Box>
                <Box display='flex' justifyContent='center' sx={{ pt: 10 }}>
                    <Box display='flex' flexDirection='column'>
                        <Box display='flex' justifyContent='center'>
                            <Typography sx={{ mb: 2 }} variant='h2'>Write your Order ID</Typography>
                        </Box>
                        <TextField onChange={(e) => handleChange(e.target.value)} id="filled-basic" variant="filled" size='small' sx={{ width: 300 }} />
                    </Box>
                </Box>
                <Box display='flex' justifyContent='center' sx={{ mt: 3 }} >
                    <Button onClick={() => onClickFind()} color='success' size="large">Find</Button>
                </Box>
            </Box>


        </ShopLayout>
    )
}

