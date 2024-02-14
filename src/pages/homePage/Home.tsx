import React, { ChangeEvent, useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import { Box, CircularProgress, Grid, Pagination, Stack, TextField, Typography } from '@mui/material'
import EachProductCard from '../../components/eachProductCard/EachProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store/Store'
import { gettingProducts } from '../../redux/features/ProductsSlice'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

interface IState {
    activePage: number,
    searchInput: string
}


const Home = () => {
    const products = useSelector((state: RootState) => state.productsSlice.products)
    const apiStatus = useSelector((state: RootState) => state.productsSlice.apiStatus)
    const dispatch = useDispatch<AppDispatch>()
    const [activePage, setActivePage] = useState<IState['activePage']>(1)
    const [searchInput, setSearchInput] = useState<IState['searchInput']>('')
    useEffect(() => {
        products.length === 0 && dispatch(gettingProducts())
    }, [])

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => { setActivePage(1); setSearchInput(event.target.value) }
    const filteredProducts = products.filter(eachProduct => eachProduct.title.toUpperCase().includes(searchInput.toUpperCase()))
    const handlePagination = (_: React.ChangeEvent<unknown>, value: number) => setActivePage(value)

    const rederingSuitableview = () => {
        switch (apiStatus) {
            case 'SUCCESS':
                return (
                    <Grid container rowGap={2} justifyContent={'center'}>
                        {filteredProducts.slice(4 * (activePage - 1), 4 * activePage).map((eachItem) => {
                            return <Grid item xs={12} sm={6} md={4} lg={3} key={eachItem.id}>
                                <EachProductCard productDetails={eachItem} />
                            </Grid>
                        })}
                    </Grid>
                )
            case 'PENDING':
                return <CircularProgress color="secondary" />
            default:
                return <Typography variant='h3'>Something Went Wrong</Typography>
        }

    }


    return (
        <Stack alignItems={'center'} justifyContent={'space-between'} width={'100%'} minHeight={'100vh'}>
            <Header />
            <Box m={2}>
                <TextField onChange={searchHandler} color='secondary' value={searchInput} autoComplete='off' placeholder='Search Here...' InputProps={{ endAdornment: <SearchOutlinedIcon /> }} />
            </Box>
            <Stack justifyContent={'center'} minHeight={'80vh'} spacing={5} width={'100%'} px={2} alignItems={'center'}>
                {rederingSuitableview()}
                {filteredProducts.length >= 5 && <Stack alignSelf={'center'} bottom={2}>
                    <Pagination count={Math.ceil(filteredProducts.length / 4)} color='secondary' onChange={handlePagination} page={activePage} />
                </Stack>}
                {filteredProducts.length === 0 && apiStatus === 'SUCCESS' && <Typography variant='h6'>Your Product is Not Found! Try With other Product</Typography>}
            </Stack>
        </Stack>
    )
}

export default Home