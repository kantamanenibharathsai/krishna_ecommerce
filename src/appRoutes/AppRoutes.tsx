
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/homePage/Home'
import NotFound from '../pages/notFound/NotFound'
import Cart from '../pages/cartPage/Cart'

const AppRoutes = () => {
    return (
        <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes