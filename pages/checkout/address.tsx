import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";

import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context';
import { isValidEmail } from '../../utils/validations';
import { countries } from '../../utils';


type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
    taxId: string;
    email: string;
}


const getAddressFromCookies = (): FormData => {
    return {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
        taxId: Cookies.get('taxid') || '',
        email: Cookies.get('email') || '',
    }
}




const AddressPage = () => {
    const [countriesSort, setcountriesSort] = useState<String[]>(countries)
    const [isUsa, setIsUsa] = useState(false)
    const router = useRouter();
    const { updateAddress } = useContext(CartContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: getAddressFromCookies()

    });
    const [_email, setEmail] = useState('')
    const [_emailVerify, setEmailVerify] = useState('')



    // TODO : OPTIMIZAR ESTO POR FAVORRRRR!!!!
    
    const onSubmitAddress = async (data: FormData) => {
        const a = Cookies.get('email')

        if (_email.toLowerCase() === _emailVerify.toLowerCase() || a != undefined && a.toLowerCase() == _emailVerify.toLowerCase()) {
            if (isValidEmail(_email) || a != undefined && isValidEmail(a)) {
                updateAddress(data);
                await router.push('/checkout/summary');
            }
        } else {
            alert('error please check your email')
        }
    }


    return (
        <ShopLayout title="Royer Shop - Address" pageDescription="Confirmar dirección del destino">
            <form onSubmit={handleSubmit(onSubmitAddress)}>

                <Box display='flex' justifyContent='center'>
                    <Typography variant="h1" component='h1'>Address</Typography>
                </Box>

                <Grid container spacing={2} sx={{ mt: 2 }}>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Name'
                            variant="filled"
                            fullWidth
                            {...register('firstName', {
                                required: 'This field is required'
                            })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Last Name'
                            variant="filled"
                            fullWidth
                            {...register('lastName', {
                                required: 'This field is required'
                            })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Email'
                            variant="filled"
                            fullWidth
                            {...register('email', {
                                required: 'This field is required'
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Veriy Email'
                            variant="filled"
                            fullWidth
                            onChange={(e) => setEmailVerify(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Address'
                            variant="filled"
                            fullWidth
                            {...register('address', {
                                required: 'This field is required'
                            })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Address 2 (optional)'
                            variant="filled"
                            fullWidth
                            {...register('address2')}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Zip code'
                            variant="filled"
                            fullWidth
                            {...register('zip', {
                                required: 'This field is required'
                            })}
                            error={!!errors.zip}
                            helperText={errors.zip?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='City'
                            variant="filled"
                            fullWidth
                            {...register('city', {
                                required: 'This field is required'
                            })}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                select
                                variant="filled"
                                label="country"
                                defaultValue={countriesSort[0]}
                                {...register('country', {
                                    required: 'This field is required'
                                })}
                                error={!!errors.country}
                                onChange={(e) => e.target.value == 'United States' ? setIsUsa(true) : setIsUsa(false)}
                            >
                                {
                                    countriesSort.map((country: any) => (
                                        <MenuItem
                                            key={country}
                                            value={country}
                                        >{country}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Phone'
                            variant="filled"
                            fullWidth
                            {...register('phone', {
                                required: 'This field is required'
                            })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>
                    {isUsa ? null : <Grid item xs={12} sm={6}>
                        <TextField
                            label='Tax ID'
                            variant="filled"
                            fullWidth
                            {...register('taxId', {
                                required: 'This field is required'
                            })}
                            error={!!errors.taxId}
                            helperText={errors.taxId?.message}
                        />
                    </Grid>}

                </Grid>


                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Button type="submit" color="secondary" className="circular-btn" size="large">
                        Review order
                    </Button>
                </Box>

            </form>
        </ShopLayout>
    )
}



export default AddressPage