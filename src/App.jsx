import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider, useCart } from './context/CartContext'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Admin from './admin/Admin'
import Footer from "./components/Footer"
import { ProtectedRoute } from './components/ProtectedRoute'

function CartSync() {
  const { user } = useAuth()
  const { initCart } = useCart()
  useEffect(() => { initCart() }, [user, initCart])
  return null
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <CartSync />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
      </Routes>
      <Footer />
      </CartProvider>
    </AuthProvider>
  )
}

export default App
