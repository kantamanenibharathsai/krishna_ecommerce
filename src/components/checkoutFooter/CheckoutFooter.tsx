import { Button, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { checkoutStyles } from './checkoutStyles'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/Store'

const CheckoutFooter = () => {
    const [totalAmount, setTotalAmount] = useState(0)
    const cartItems = useSelector((state: RootState) => state.cartSlice.cartProducts)
    useEffect(() => {
        let tempAmount = 0
        cartItems.forEach(eachItem => {
            tempAmount += (eachItem.quantity * eachItem.price)
        })
        setTotalAmount(tempAmount)
    }, [cartItems])
    return (
        <Paper sx={checkoutStyles.mainContainer}>
            <Stack direction={'row'} justifyContent={'space-between'} m={1}>
                <Typography>Subtotal</Typography>
                <Typography>₹{(totalAmount * 10).toFixed(2)}</Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} m={1}>
                <Typography>Shipping</Typography>
                <Typography>₹20</Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} m={1}>
                <Typography variant='h4'>Total</Typography>
                <Typography variant='h4'>₹{(20 + (totalAmount * 10)).toFixed(2)}</Typography>
            </Stack>
            <Button variant='contained' fullWidth>CHECK OUT</Button>
        </Paper>
    )
}

export default CheckoutFooter