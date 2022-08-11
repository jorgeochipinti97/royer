import { useContext, useState } from 'react';

import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, SearchOutlined, DashboardOutlined, LoginOutlined, VpnKeyOutlined } from "@mui/icons-material"
import GradeIcon from '@mui/icons-material/Grade';
import { UiContext, AuthContext } from '../../context';
import { useRouter } from 'next/router';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import QuizIcon from '@mui/icons-material/Quiz';
import ContentPasteSearchSharpIcon from '@mui/icons-material/ContentPasteSearchSharp';
import NotListedLocationSharpIcon from '@mui/icons-material/NotListedLocationSharp';
export const SideMenu = () => {

    const router = useRouter();
    const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
    const { user, isLoggedIn, logout } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;
        navigateTo(`/search/${searchTerm}`);
    }


    const navigateTo = (url: string) => {
        toggleSideMenu();
        router.push(url);
    }


    return (
        <Drawer
            open={isMenuOpen}
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={toggleSideMenu}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>

                <List>

                    <ListItem sx={{ display: router.asPath.includes('search') || router.asPath.includes('products')   ? 'none' : '' }}>
                        <Input
                            /*TODO: sacar autofocus */
                            // autoFocus
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                            type='text'
                            placeholder="Search..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={onSearchTerm}
                                    >
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>
                    {/* 
                    {
                        isLoggedIn && (
                            <>
                                <ListItem button>
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'My orders'}
                                        onClick={() => navigateTo('/orders/history')}
                                    />
                                </ListItem>
                            </>
                        )
                    }




                    {
                        isLoggedIn
                            ? (
                                <ListItem button onClick={logout}>
                                    <ListItemIcon>
                                        <LoginOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Logout'} />
                                </ListItem>
                            )
                            : (
                                <ListItem
                                    button
                                    onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
                                >
                                    <ListItemIcon>
                                        <VpnKeyOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Login'} />
                                </ListItem>
                            )
                    } */}
                    <ListItem
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo('/products')}
                    >
                        <ListItemIcon>
                            <StorefrontOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Products'} />
                    </ListItem>
                    <ListItem
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo('/find')}
                    >
                        <ListItemIcon>
                            <ContentPasteSearchSharpIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Find My Order'} />
                    </ListItem>

                    <ListItem
                        sx={{ display: { xs: '', sm: 'none' } }}
                        button
                        onClick={() => navigateTo('/contact')}>
                        <ListItemIcon>
                            <ConnectWithoutContactIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Contact Us'} />
                    </ListItem>
                    <ListItem
                        sx={{ display: { xs: '', sm: 'none' } }}
                        button
                        onClick={() => navigateTo('/faqs')}>
                        <ListItemIcon>
                            <QuizIcon />
                        </ListItemIcon>
                        <ListItemText primary={'FAQS'} />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => navigateTo('/favorites')}>
                        <ListItemIcon>
                            <GradeIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Favorites'} />
                    </ListItem>

                    {/* Admin */}
                    {
                        user?.role === 'admin' && (
                            <>
                                <Divider />
                                <ListSubheader>Admin Panel</ListSubheader>
                                <ListItem
                                    button
                                    onClick={() => navigateTo('/admin/')}>
                                    <ListItemIcon>
                                        <DashboardOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Dashboard'} />
                                </ListItem>

                                <ListItem button
                                    onClick={() => navigateTo('/admin/crypto')}>

                                    <ListItemIcon>
                                        <CurrencyBitcoinIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Crypto Orders'} />
                                </ListItem>
                                <ListItem button
                                    onClick={() => navigateTo('/admin/products')}>
                                    <ListItemIcon>
                                        <CategoryOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Products'} />
                                </ListItem>
                                <ListItem button
                                    onClick={() => navigateTo('/admin/orders')}
                                >
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Orders'} />
                                </ListItem>

                                <ListItem button
                                    onClick={() => navigateTo('/admin/users')}>

                                    <ListItemIcon>
                                        <AdminPanelSettings />
                                    </ListItemIcon>
                                    <ListItemText primary={'Users'} />
                                </ListItem>
                                <ListItem button
                                    onClick={() => navigateTo('/admin/queries')}>

                                    <ListItemIcon>
                                        <NotListedLocationSharpIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Queries'} />
                                </ListItem>


                            </>
                        )
                    }
                </List>
            </Box>
        </Drawer>
    )
}