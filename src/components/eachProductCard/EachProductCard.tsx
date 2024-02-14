import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { EachProductType } from '../../typeScript/GlobalTypes';
import { EachProductCardStyles } from './styles';
import { IconButton, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/Store';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { addToCart, cartDecrement, cartIncrement } from '../../redux/features/CartSlice';
import LinesEllipsis from 'react-lines-ellipsis'
interface IProps {
    productDetails: EachProductType
}


const EachProductCard = ({ productDetails }: IProps) => {
    const cartItems = useSelector((state: RootState) => state.cartSlice.cartProducts)
    const dispatch = useDispatch<AppDispatch>()
    const isAvailableInCart = cartItems.some(each => each.id === productDetails.id)

    const renderingSuitableButton = () => {
        if (isAvailableInCart) {
            const item = cartItems.filter(each => each.id === productDetails.id)[0]
            return <Stack direction={'row'} alignItems={'center'} justifyContent={'space-around'} width={'150px'} bgcolor={'#9c27b0'} borderRadius={'10px'} color={'whitesmoke'}>
                <IconButton color='inherit' onClick={() => dispatch(cartDecrement(productDetails.id))} disabled={item.quantity === 1}>
                    <RemoveOutlinedIcon />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton color='inherit' onClick={() => dispatch(cartIncrement(productDetails.id))}>
                    <AddOutlinedIcon />
                </IconButton>
            </Stack>
        }
        else {
            return (
                <Button variant='contained' color='secondary' sx={EachProductCardStyles.bolderText} onClick={() => dispatch(addToCart(productDetails))}>Add To Cart</Button>
            )
        }
    }

    return (
        <Card sx={EachProductCardStyles.maxWidth} elevation={5}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="350"
                image={productDetails.image}
            />
            <CardContent>
                <LinesEllipsis text={productDetails.title} component='h2' maxLine={2} trimRight basedOn='letters' />
                <LinesEllipsis text={productDetails.description} maxLine={2} trimRight basedOn='letters' />
            </CardContent>
            <Stack direction={'row'} justifyContent={'space-around'} alignItems={'center'} my={2}>
                <Typography variant='h6' fontWeight={'bolder'}>Price: ₹{(productDetails.price * 10).toFixed(2)}</Typography>
                {renderingSuitableButton()}
            </Stack>
        </Card>
    );
}

export default EachProductCard