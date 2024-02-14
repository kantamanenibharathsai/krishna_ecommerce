import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/Store';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { cartDecrement, cartIncrement, removeCartItem } from '../../redux/features/CartSlice';
import CheckoutFooter from '../../components/checkoutFooter/CheckoutFooter';
import Header from '../../components/header/Header';
import { CartStyles } from './Styles';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate()
    const cartItems = useSelector((state: RootState) => state.cartSlice.cartProducts)
    const dispatch = useDispatch<AppDispatch>()
    const emptyCartView = () => <Stack height={'90vh'} spacing={6} alignItems={'center'} justifyContent={'center'}><Typography variant='h4'>Sorry There is Nothing to Show Here</Typography>
        <Button variant='contained' color='secondary' onClick={() => navigate('/')}>Shop Now</Button></Stack>
    const desktopView = () => {
        return (
            <TableContainer component={Paper}>
                <Table sx={CartStyles.minWidth} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell align='center' sx={CartStyles.bolderText}>Product</TableCell>
                            <TableCell align="right" sx={CartStyles.bolderText}>Price</TableCell>
                            <TableCell align="right" sx={CartStyles.bolderText}>Quantity</TableCell>
                            <TableCell align="right" sx={CartStyles.bolderText}>Unit Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={CartStyles.tableRow}
                            >
                                <TableCell component="th" scope="row">
                                    <Stack direction={'row'} spacing={5} alignItems={'center'}>
                                        <IconButton onClick={() => dispatch(removeCartItem(row.id))}>
                                            <CloseIcon color='warning' />
                                        </IconButton>
                                        <Paper elevation={5}>
                                            <Box m={1} component={'img'} src={row.image} sx={CartStyles.cartImage}></Box>
                                        </Paper>
                                        <Typography>{row.title}</Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell align="right">₹{(row.price * 10 * row.quantity).toFixed(2)}</TableCell>
                                <TableCell align="right" >
                                    <Box sx={CartStyles.buttonContainer} bgcolor={'#9c27b0'} borderRadius={'10px'} color={'whitesmoke'}>
                                        <IconButton color='inherit' onClick={() => dispatch(cartDecrement(row.id))} disabled={row.quantity === 1}>
                                            <RemoveOutlinedIcon />
                                        </IconButton>
                                        <Typography>{row.quantity}</Typography>
                                        <IconButton color='inherit' onClick={() => dispatch(cartIncrement(row.id))}>
                                            <AddOutlinedIcon />
                                        </IconButton>
                                    </Box></TableCell>
                                <TableCell align="right">₹{(row.price * 10).toFixed()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
    const mobileView = () => {
        return (
            <Stack spacing={2}>
                {cartItems.map(each =>
                    <Paper elevation={5} key={each.id} >
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} px={2}>
                            <Box m={1} component={'img'} src={each.image} sx={CartStyles.cartImage} />
                            <Typography fontWeight={'bolder'}>{each.title}</Typography>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'space-around'}>
                            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                <IconButton color='inherit' onClick={() => dispatch(cartDecrement(each.id))} disabled={each.quantity === 1}>
                                    <RemoveOutlinedIcon />
                                </IconButton>
                                <Typography>{each.quantity}</Typography>
                                <IconButton color='inherit' onClick={() => dispatch(cartIncrement(each.id))}>
                                    <AddOutlinedIcon />
                                </IconButton>
                            </Stack>
                            <IconButton onClick={() => dispatch(removeCartItem(each.id))}>
                                <CloseIcon color='warning' />
                            </IconButton>
                        </Stack>
                    </Paper>)
                }
            </Stack>
        )
    }
    return (
        <Stack>
            <Header />
            {cartItems.length === 0 ? emptyCartView() :
                <>
                    <Box sx={CartStyles.destopView}>
                        {desktopView()}
                    </Box>
                    <Box sx={CartStyles.mobileView}>
                        {mobileView()}
                    </Box>
                    <CheckoutFooter />
                </>
            }

        </Stack>
    );
}

export default Cart