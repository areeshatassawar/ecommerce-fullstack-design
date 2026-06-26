import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { fetchProducts, fetchOrders, updateOrderStatus } from '../api'

function Admin() {
  const { user, logout } = useAuth()
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [tab, setTab] = useState('products')
  const [form, setForm] = useState({ name: '', price: '', oldPrice: '', image: '', description: '', category: '', brand: '', stock: '' })
  const [specs, setSpecs] = useState([{ key: '', value: '' }])

  const token = localStorage.getItem('token')
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

  const loadProducts = async () => {
    setLoading(true)
    const data = await fetchProducts()
    setProducts(data)
    setLoading(false)
  }

  const loadOrders = async () => {
    setLoading(true)
    try {
      const data = await fetchOrders()
      setOrders(data)
    } catch (e) { setOrders([]) }
    setLoading(false)
  }

  useEffect(() => {
    if (tab === 'products') loadProducts()
    else loadOrders()
  }, [tab])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = editing ? `/api/products/${editing}` : '/api/products'
    const method = editing ? 'PUT' : 'POST'
    const specsObj = specs.filter(s => s.key.trim()).reduce((acc, s) => { acc[s.key.trim()] = s.value.trim(); return acc }, {})
    const body = { ...form, specs: specsObj, price: Number(form.price), oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined, stock: Number(form.stock) }
    await fetch(url, { method, headers, body: JSON.stringify(body) })
    setEditing(null)
    setForm({ name: '', price: '', oldPrice: '', image: '', description: '', category: '', brand: '', stock: '' })
    setSpecs([{ key: '', value: '' }])
    loadProducts()
  }

  const edit = (p) => {
    setEditing(p._id)
    setForm({ name: p.name, price: String(p.price), oldPrice: p.oldPrice ? String(p.oldPrice) : '', image: p.image, description: p.description, category: p.category, brand: p.brand || '', stock: String(p.stock) })
    const s = p.specs ? Object.entries(p.specs).map(([key, value]) => ({ key, value: String(value) })) : [{ key: '', value: '' }]
    setSpecs(s.length ? s : [{ key: '', value: '' }])
  }

  const addSpec = () => setSpecs([...specs, { key: '', value: '' }])
  const removeSpec = (i) => setSpecs(specs.filter((_, idx) => idx !== i))
  const updateSpec = (i, field, val) => setSpecs(specs.map((s, idx) => idx === i ? { ...s, [field]: val } : s))

  const remove = async (id) => {
    if (!confirm('Delete this product?')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE', headers })
    loadProducts()
  }

  const statusColors = { pending: 'bg-yellow-100 text-yellow-800', confirmed: 'bg-blue-100 text-blue-800', shipped: 'bg-purple-100 text-purple-800', delivered: 'bg-green-100 text-green-800', cancelled: 'bg-red-100 text-red-800' }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-56 bg-white border-r border-gray-300 p-4 hidden md:flex flex-col gap-2">
        <h2 className="font-bold text-gray-800 mb-4">Admin Panel</h2>
        <button onClick={() => setTab('products')} className={`text-sm text-left px-3 py-2 rounded ${tab === 'products' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>Products</button>
        <button onClick={() => setTab('orders')} className={`text-sm text-left px-3 py-2 rounded ${tab === 'orders' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>Orders</button>
        <div className="mt-auto pt-4 border-t border-gray-300">
          <p className="text-xs text-gray-400 mb-2">{user?.name} ({user?.email})</p>
          <Link to="/" className="text-sm text-blue-600 hover:underline block mb-1">← Back to store</Link>
          <button onClick={logout} className="text-sm text-red-500 hover:underline">Logout</button>
        </div>
      </div>

      <div className="flex-1 p-6">
        {tab === 'products' && (
          <>
            <h1 className="text-xl font-bold text-gray-800 mb-4">Product Management</h1>
            <form onSubmit={handleSubmit} className="bg-white rounded p-4 mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border rounded px-3 py-2 text-sm focus:outline-none" required />
              <input placeholder="Price" type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="border rounded px-3 py-2 text-sm focus:outline-none" required />
              <input placeholder="Old Price" type="number" step="0.01" value={form.oldPrice} onChange={e => setForm({ ...form, oldPrice: e.target.value })} className="border rounded px-3 py-2 text-sm focus:outline-none" />
              <input placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="border rounded px-3 py-2 text-sm focus:outline-none" required />
              <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="border rounded px-3 py-2 text-sm focus:outline-none" required />
              <input placeholder="Brand" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} className="border rounded px-3 py-2 text-sm focus:outline-none" />
              <input placeholder="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} className="border rounded px-3 py-2 text-sm focus:outline-none" required />
              <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="border rounded px-3 py-2 text-sm focus:outline-none col-span-2 md:col-span-4" required />
              <div className="col-span-2 md:col-span-4 border-t border-gray-300 pt-3">
                <p className="text-xs font-medium text-gray-500 mb-2">Specifications (key-value pairs)</p>
                {specs.map((s, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input placeholder="Key (e.g. type)" value={s.key} onChange={e => updateSpec(i, 'key', e.target.value)} className="border rounded px-3 py-2 text-sm focus:outline-none w-1/2" />
                    <input placeholder="Value (e.g. Laptop)" value={s.value} onChange={e => updateSpec(i, 'value', e.target.value)} className="border rounded px-3 py-2 text-sm focus:outline-none w-1/2" />
                    <button type="button" onClick={() => removeSpec(i)} className="text-red-500 text-lg px-2 hover:bg-red-50 rounded">&times;</button>
                  </div>
                ))}
                <button type="button" onClick={addSpec} className="text-blue-600 text-xs hover:underline">+ Add spec</button>
              </div>
              <div className="col-span-2 md:col-span-4 flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">{editing ? 'Update Product' : 'Add Product'}</button>
                {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: '', price: '', oldPrice: '', image: '', description: '', category: '', brand: '', stock: '' }); setSpecs([{ key: '', value: '' }]) }} className="bg-gray-400 text-white px-4 py-2 rounded text-sm hover:bg-gray-500">Cancel</button>}
              </div>
            </form>

            {loading ? <p className="text-center text-gray-500">Loading...</p> : (
              <div className="bg-white rounded overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-left">
                    <tr><th className="px-4 py-2">Image</th><th className="px-4 py-2">Name</th><th className="px-4 py-2">Price</th><th className="px-4 py-2">Category</th><th className="px-4 py-2">Stock</th><th className="px-4 py-2">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    {products.map(p => (
                      <tr key={p._id} className="hover:bg-gray-50">
                        <td className="px-4 py-2"><img src={p.image} className="w-10 h-10 object-cover rounded" /></td>
                        <td className="px-4 py-2">{p.name.substring(0, 40)}...</td>
                        <td className="px-4 py-2">${p.price.toFixed(2)}</td>
                        <td className="px-4 py-2">{p.category}</td>
                        <td className="px-4 py-2">{p.stock}</td>
                        <td className="px-4 py-2 flex gap-2">
                          <button onClick={() => edit(p)} className="text-blue-600 hover:underline text-xs">Edit</button>
                          <button onClick={() => remove(p._id)} className="text-red-500 hover:underline text-xs">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {tab === 'orders' && (
          <>
            <h1 className="text-xl font-bold text-gray-800 mb-4">Order Management</h1>
            {loading ? <p className="text-center text-gray-500">Loading...</p> : (
              <div className="bg-white rounded overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-left">
                    <tr><th className="px-4 py-2">Order ID</th><th className="px-4 py-2">Customer</th><th className="px-4 py-2">Items</th><th className="px-4 py-2">Total</th><th className="px-4 py-2">Date</th><th className="px-4 py-2">Status</th><th className="px-4 py-2">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    {orders.length === 0 ? (
                      <tr><td colSpan="7" className="px-4 py-8 text-center text-gray-500">No orders yet</td></tr>
                    ) : orders.map(order => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-xs font-mono">{order._id.substring(0, 8)}...</td>
                        <td className="px-4 py-2">
                          <p className="font-medium">{order.shippingAddress?.fullName || 'N/A'}</p>
                          <p className="text-xs text-gray-400">{order.shippingAddress?.phone}</p>
                        </td>
                        <td className="px-4 py-2">{order.items?.length} item(s)</td>
                        <td className="px-4 py-2 font-medium">${order.total?.toFixed(2)}</td>
                        <td className="px-4 py-2 text-xs">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-2"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>{order.status}</span></td>
                        <td className="px-4 py-2">
                          <select value={order.status} onChange={async (e) => { await updateOrderStatus(order._id, e.target.value); loadOrders() }}
                            className="border rounded px-2 py-1 text-xs focus:outline-none">
                            {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Admin