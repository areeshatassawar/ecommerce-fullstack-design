import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchProduct, fetchProducts } from '../api'
import { useCart } from '../context/CartContext'

function ProductDetail() {
  const { addToCart } = useCart()
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const [qty, setQty] = useState(1)

  useEffect(() => {
    setLoading(true)
    fetchProduct(id).then(data => {
      setProduct(data)
      setLoading(false)
      return fetchProducts('', data.category)
    }).then(products => {
      setRelated((products || []).filter(p => p._id !== id).slice(0, 5))
    }).catch(() => setLoading(false))
  }, [id])

  const handleAddToCart = () => {
    addToCart(product, qty)
    alert('Added to cart!')
  }

  if (loading) return <div className="bg-gray-100 min-h-screen flex items-center justify-center"><p>Loading...</p></div>

  if (!product) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">Sorry, the product you're looking for doesn't exist.</p>
          <Link to="/products" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 inline-block">Back to Products</Link>
        </div>
      </div>
    )
  }

  const thumbnails = [product.image]
  const specs = product.specs || {}

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="text-sm text-gray-500 mb-4 flex items-center gap-1">
          <Link to="/" className="hover:text-blue-600">Home</Link><span>›</span>
          <Link to="/products" className="hover:text-blue-600">Products</Link><span>›</span>
          <span className="text-gray-800">{product.category}</span>
        </div>

        <div className="bg-white rounded p-6 flex flex-col md:flex-row gap-6 mb-4">
          <div className="md:w-72 shrink-0">
            <div className="bg-gray-50 rounded flex items-center justify-center h-64 mb-3 overflow-hidden">
              <img src={thumbnails[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {thumbnails.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`w-12 h-12 rounded border-2 flex items-center justify-center overflow-hidden shrink-0 ${selectedImage === i ? 'border-blue-600' : 'border-gray-200'}`}>
                  <img src={img} alt={`Thumbnail ${i+1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <p className={`text-sm font-medium mb-1 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? '✓ In stock' : '✗ Out of stock'}
            </p>
            <h1 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4 flex-wrap">
              <span className="text-yellow-400">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
              <span className="font-medium text-gray-700">{product.rating}</span><span>•</span>
              <span>💬 {product.reviews} reviews</span><span>•</span>
              <span>🛡 {product.orders} sold</span>
            </div>

            {product.pricingTiers && (
              <div className="flex flex-wrap gap-3 mb-4">
                {product.pricingTiers.map(tier => (
                  <div key={tier.range} className={`border rounded px-4 py-2 text-center ${tier.highlight ? 'border-orange-400 bg-orange-50' : ''}`}>
                    <p className={`font-bold ${tier.highlight ? 'text-orange-500' : 'text-gray-800'}`}>{tier.price}</p>
                    <p className="text-xs text-gray-500">{tier.range}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="text-sm text-gray-600 space-y-2 border-t border-gray-300 pt-4">
              {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="flex gap-4">
                  <span className="text-gray-400 w-32 shrink-0 capitalize">{key}:</span>
                  <span className="text-gray-700">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-52 shrink-0">
            <div className="border border-gray-300 rounded p-4 mb-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-teal-100 rounded flex items-center justify-center text-teal-600 font-bold">
                  {product.brand ? product.brand[0] : 'B'}
                </div>
                <div><p className="text-xs text-gray-500">Brand</p><p className="text-sm font-medium">{product.brand || 'N/A'}</p></div>
              </div>
              <div className="text-xs text-gray-600 space-y-1 mb-4">
                <p>🌐 Worldwide shipping</p><p>✓ Verified Seller</p><p>🔒 Secure payment</p>
              </div>
              <div className="mb-3">
                <label className="text-xs text-gray-600 mb-1 block">Quantity</label>
                <select value={qty} onChange={e => setQty(parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <button onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 mb-2">Add to Cart</button>
              <button className="w-full border border-blue-600 text-blue-600 py-2 rounded text-sm hover:bg-blue-50">Seller's profile</button>
            </div>
            <button className="text-sm text-blue-600 flex items-center gap-1 hover:underline">♡ Save for later</button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="bg-white rounded p-6 flex-1">
            <div className="flex gap-6 border-b border-gray-300 mb-4 overflow-x-auto">
              {['description', 'reviews', 'shipping', 'about seller'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm capitalize border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-600 leading-relaxed mb-4">
              <p className="mb-3">{product.description}</p>
            </div>
            {Object.keys(specs).length > 0 && (
              <table className="w-full text-sm mb-4 border border-gray-300 rounded overflow-hidden">
                <tbody>
                  {Object.entries(specs).map(([key, val], i) => (
                    <tr key={key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-2 text-gray-500 w-40 capitalize">{key}</td>
                      <td className="px-4 py-2 text-gray-700">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {related.length > 0 && (
            <div className="md:w-52 shrink-0">
              <div className="bg-white rounded p-4">
                <h4 className="font-semibold text-gray-800 mb-3">You may like</h4>
                <div className="flex flex-col gap-3">
                  {related.slice(0, 5).map(item => (
                    <Link to={`/products/${item._id}`} key={item._id} className="flex gap-2 hover:bg-gray-50 cursor-pointer rounded p-1">
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-700 leading-snug">{item.name.substring(0, 30)}...</p>
                        <p className="text-xs text-gray-400 mt-0.5">${item.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
