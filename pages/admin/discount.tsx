import router from 'next/router';
import React from 'react'
import { tesloApi } from '../../api';
import { NextPage } from 'next';
import { IDiscount } from '../../interfaces/discountCodes';
import { useEffect, useState } from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';
import { AdminLayout } from '../../components/layouts';
import useSWR from 'swr';


const Discount: NextPage = () => {
  const [name, setName] = useState('')
  const [percentage, setPercentage] = useState(0)
  const { data, error } = useSWR<IDiscount[]>('/api/discount');
  const codes = data && data
  const onSubmit = async (_name: string, _percentage: number) => {

    try {
      const { data } = await tesloApi({
        url: '/discount',
        method: 'POST',
        data: {
          name: _name.toUpperCase(),
          percentage: _percentage
        }
      });
      console.log({ data });
    } catch (error) {
      console.log(error);
    }

  }
  const onSubmitDelete = async (code_: IDiscount) => {

    try {
      const { data } = await tesloApi({
        url: '/discount',
        method: 'DELETE',
        data: code_
      });
      console.log({ data });
    } catch (error) {
      console.log(error);
    }

  }



  return (

    <>
      <AdminLayout title={'Admin - Discount Codes'} subTitle={''}>
        <Box display='flex' justifyContent='center'>
          <Box display='flex' flexDirection='column'>
            <TextField
              label="Name"
              sx={{ mt: 1 }}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              sx={{ mt: 1 }}
              label="Percentage - Max 30%"
              type='number'

              onChange={(e) => setPercentage(parseInt(e.target.value))}
            />
            <Box display='flex' justifyContent='center' sx={{ mt: 3 }}>
              <Button color='success'
                disabled={percentage > 30 ? true : false}
                onClick={() => onSubmit(name, percentage)}
              >
                crear
              </Button>
            </Box>
          </Box>
        </Box>
        {
          codes ?
            codes.map(e => (
              <Box key={e.name}>
                <Box>
                  <Typography>{e.name}</Typography>
                </Box>
                <Box>
                  <Typography>{e.percentage}%</Typography>
                </Box>
                <Button
                  onClick={() => onSubmitDelete(e)}
                >
                  Delete
                </Button>
              </Box>
            ))

            : <></>
        }
      </AdminLayout>
    </>

  )
}

export default Discount