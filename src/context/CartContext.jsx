import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

function cartKey() {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    return user?._id ? `cart_${user._id}` : 'cart_guest'
  } catch { return 'cart_guest' }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem(cartKey()) || '[]'))

  const save = (items) => localStorage.setItem(cartKey(), JSON.stringify(items))

  const initCart = () => {
    const items = JSON.parse(localStorage.getItem(cartKey()) || '[]')
    setCartItems(items)
  }

  const addToCart = (product, qty = 1) => {
    setCartItems(items => {
      const existing = items.find(item => item._id === product._id)
      const next = existing
        ? items.map(item => item._id === product._id ? { ...item, qty: item.qty + qty } : item)
        : [...items, { ...product, qty }]
      save(next)
      return next
    })
  }

  const updateQty = (id, qty) => {
    setCartItems(items => {
      const next = items.map(item => item._id === id ? { ...item, qty: Math.max(1, qty) } : item)
      save(next)
      return next
    })
  }

  const removeItem = (id) => {
    setCartItems(items => {
      const next = items.filter(item => item._id !== id)
      save(next)
      return next
    })
  }

  const clearCart = () => {
    setCartItems([])
    save([])
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeItem, clearCart, initCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
