import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchProducts, createOrder } from '../api'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

function Cart() {
  const { user } = useAuth()
  const { cartItems, updateQty, removeItem, clearCart } = useCart()
  const [savedItems, setSavedItems] = useState([])
  const [coupon, setCoupon] = useState('')
  const [showCheckout, setShowCheckout] = useState(false)
  const [shipping, setShipping] = useState({ fullName: '', address: '', city: '', postalCode: '', country: '', phone: '' })
  const [orderStatus, setOrderStatus] = useState('')

  useEffect(() => {
    fetchProducts().then(products => setSavedItems(products.slice(0, 4))).catch(() => {})
  }, [])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const discount = cartItems.length > 0 ? 60 : 0
  const tax = parseFloat((subtotal * 0.1).toFixed(2))
  const total = Math.max(0, subtotal - discount + tax)

  const handleCheckout = async (e) => {
    e.preventDefault()
    setOrderStatus('')
    if (!user) { setOrderStatus('Please sign in to checkout'); return }
    try {
      const orderData = {
        items: cartItems.map(item => ({
          product: item._id, name: item.name, price: item.price, image: item.image, qty: item.qty
        })),
        shippingAddress: shipping,
        subtotal, tax, shipping: 0, total,
      }
      await createOrder(orderData)
      clearCart()
      setShowCheckout(false)
      setOrderStatus('Order placed successfully!')
    } catch (err) {
      setOrderStatus(err.message)
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">My cart ({cartItems.length})</h1>

        {orderStatus && (
          <div className={`mb-4 p-3 rounded text-sm ${orderStatus.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {orderStatus}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex-1">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded p-8 text-center">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Link to="/products" className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">Browse products</Link>
              </div>
            ) : (
              <>
                <div className="bg-white rounded divide-y divide-gray-300">
                  {cartItems.map(item => (
                    <div key={item._id} className="p-4 flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <Link to={`/products/${item._id}`} className="text-sm font-medium text-gray-800 hover:text-blue-600">{item.name}</Link>
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => removeItem(item._id)}
                            className="text-xs border border-red-300 text-red-500 px-2 py-0.5 rounded hover:bg-red-50">Remove</button>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-semibold text-gray-800">${(item.price * item.qty).toFixed(2)}</p>
                        <select className="mt-2 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
                          value={item.qty} onChange={e => updateQty(item._id, parseInt(e.target.value))}>
                          {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>Qty: {n}</option>)}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-3">
                  <Link to="/products" className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 flex items-center gap-2">← Back to shop</Link>
                  <button onClick={clearCart} className="text-blue-600 text-sm border border-blue-600 px-4 py-2 rounded hover:bg-blue-50">Remove all</button>
                </div>
              </>
            )}
          </div>

          <div className="w-64 shrink-0">
            <div className="bg-white rounded p-4">
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Have a coupon?</p>
                <div className="flex gap-2">
                  <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Add coupon"
                    className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none" />
                  <button className="text-blue-600 text-sm font-medium hover:underline">Apply</button>
                </div>
              </div>
              <div className="border-t border-gray-300 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Discount:</span><span className="text-red-500">- ${discount.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Tax (10%):</span><span className="text-green-600">+ ${tax.toFixed(2)}</span></div>
              </div>
              <div className="border-t border-gray-300 mt-3 pt-3 flex justify-between font-bold text-gray-800"><span>Total:</span><span>${total.toFixed(2)}</span></div>
              <button onClick={() => setShowCheckout(true)} disabled={cartItems.length === 0}
                className="w-full bg-green-500 text-white py-2.5 rounded mt-4 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

        {savedItems.length > 0 && (
          <div className="bg-white rounded p-6 mt-6">
            <h3 className="font-semibold text-gray-800 mb-4">You may also like</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {savedItems.map(item => (
                <Link key={item._id} to={`/products/${item._id}`} className="border border-gray-300 rounded p-3 flex flex-col hover:shadow">
                  <div className="h-24 flex items-center justify-center bg-gray-50 rounded mb-3 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">${item.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 mt-1 mb-3">{item.name.substring(0, 30)}...</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Shipping Details</h2>
              <button onClick={() => setShowCheckout(false)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
            </div>
            <form onSubmit={handleCheckout} className="space-y-3">
              <input placeholder="Full Name" value={shipping.fullName} onChange={e => setShipping({...shipping, fullName: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none" required />
              <input placeholder="Address" value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none" required />
              <div className="flex gap-2">
                <input placeholder="City" value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})} className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none" required />
                <input placeholder="Postal Code" value={shipping.postalCode} onChange={e => setShipping({...shipping, postalCode: e.target.value})} className="w-32 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none" required />
              </div>
              <input placeholder="Country" value={shipping.country} onChange={e => setShipping({...shipping, country: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none" required />
              <input placeholder="Phone" value={shipping.phone} onChange={e => setShipping({...shipping, phone: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none" required />
              <div className="border-t border-gray-300 pt-3 space-y-1 text-sm">
                <div className="flex justify-between"><span>Items:</span><span>{cartItems.length}</span></div>
                <div className="flex justify-between font-bold"><span>Total:</span><span>${total.toFixed(2)}</span></div>
                <p className="text-xs text-gray-400">Payment: Cash on Delivery</p>
              </div>
              <button type="submit" className="w-full bg-green-600 text-white py-2.5 rounded hover:bg-green-700 font-medium">Place Order — ${total.toFixed(2)}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart