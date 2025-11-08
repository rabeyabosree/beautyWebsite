import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import ContactPage from './pages/ContactPage'
import CartPage from './pages/CartPage'
import ComponentLayout from './components/ComponentLayout'
import ProductProvider from './context/ProductContext'
import Productdetails from './pages/Productdetails';
import CartProvider from './context/CartProvider'
import CheckOut from './pages/CheckOut'
import AdminDashbord from './admin/AdminDashbord'

function App() {

  return (
    <CartProvider>
      <ProductProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/admin' element={<AdminDashbord />} />

            <Route element={<ComponentLayout />}>
              <Route path='/products' element={<Products />} />
              <Route path='/products/:id' element={<Productdetails />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<ContactPage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/checkout' element={<CheckOut />} />
            </Route>
          </Routes>
        </Router>
      </ProductProvider>
    </CartProvider>
  )
}

export default App
