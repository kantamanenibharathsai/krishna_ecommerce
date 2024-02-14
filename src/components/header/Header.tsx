import { Badge, IconButton, Stack, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/Store';
import { Link } from 'react-router-dom';

const Header = () => {
    const cartItems = useSelector((state: RootState) => state.cartSlice.cartProducts)
    return (
        <Stack width={'100%'} direction={'row'} justifyContent={'space-between'} position={'sticky'} bottom={0} zIndex={2} alignItems={'center'} px={3} bgcolor={'#44195c'} height={'60px'} color={'whitesmoke'}>
            <Link to={'/'} style={{ textDecoration: 'none', color: "inherit" }}>
                <Typography variant='h5' fontWeight={'bolder'}> E - Commerce</Typography>
            </Link>
            <Link to={'/cart'} style={{ textDecoration: 'none', color: "inherit" }}>
                <Badge badgeContent={cartItems.length}>
                    <AddShoppingCartIcon fontSize='large' />
                </Badge>
            </Link>
        </Stack>
    )
}

export default Header