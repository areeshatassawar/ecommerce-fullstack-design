import { Link, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchProducts } from '../api'

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const search = searchParams.get('search') || ''
  const categoryFilter = searchParams.get('category') || ''

  useEffect(() => {
    setLoading(true)
    fetchProducts(search, categoryFilter).then(data => {
      setProducts(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [search, categoryFilter])

  const setSearch = (value) => {
    const params = new URLSearchParams(searchParams)
    if (value) params.set('search', value)
    else params.delete('search')
    setSearchParams(params)
  }

  const setCategory = (cat) => {
    const params = new URLSearchParams(searchParams)
    if (cat && cat !== categoryFilter) params.set('category', cat)
    else params.delete('category')
    setSearchParams(params)
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="text-sm text-gray-500 mb-4 flex items-center gap-1 flex-wrap">
          <Link to="/" className="hover:text-blue-600">Home</Link><span>›</span>
          <span className="hover:text-blue-600 cursor-pointer">Products</span><span>›</span>
          <span className="text-gray-800">{categoryFilter || 'All Products'}</span>
        </div>

        <div className="mb-4 flex gap-2">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products by name or category..."
            className="border border-gray-300 rounded px-3 py-2 text-sm flex-1 focus:outline-none"
          />
          <select
            value={categoryFilter}
            onChange={e => setCategory(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
          >
            <option value="">All categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Smartphones">Smartphones</option>
            <option value="Laptops">Laptops</option>
          </select>
        </div>

        <button onClick={() => setShowFilters(!showFilters)}
          className="md:hidden w-full bg-white border border-gray-300 rounded px-4 py-2 text-sm font-medium text-gray-700 mb-3 flex items-center justify-between">
          <span>🔽 Filter products</span>
          <span>{showFilters ? '▲ Hide' : '▼ Show'}</span>
        </button>

        {showFilters && <div className="md:hidden mb-4"><FilterSidebar setCategory={setCategory} /></div>}

        <div className="flex gap-4">
          <div className="hidden md:block w-52 shrink-0"><FilterSidebar setCategory={setCategory} /></div>
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded p-3 mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">{products.length} items</span> in <strong>{categoryFilter || 'All Products'}</strong>
                {search && <span> for &quot;{search}&quot;</span>}
              </p>
            </div>

            {loading ? (
              <p className="text-center text-gray-500 py-8">Loading products...</p>
            ) : products.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No products found</p>
            ) : (
              <div className="flex flex-col gap-3">
                {products.map(product => (
                  <div key={product._id} className="bg-white rounded p-4 flex gap-4 hover:shadow transition-shadow">
                    <div className="w-20 md:w-32 h-20 md:h-32 shrink-0 bg-gray-50 rounded overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-medium text-gray-800 text-sm md:text-base">{product.name}</h3>
                        <button className="text-gray-300 hover:text-red-400 text-xl shrink-0">♡</button>
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-lg md:text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        {product.oldPrice && <span className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>}
                      </div>
                      <div className="flex items-center gap-1 md:gap-2 mt-1 text-xs md:text-sm text-gray-500 flex-wrap">
                        <span className="text-yellow-400">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
                        <span>{product.rating}</span><span>•</span>
                        <span>{product.orders} orders</span><span>•</span>
                        <span className="text-green-600 font-medium">{product.shipping}</span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
                      <Link to={`/products/${product._id}`} className="text-blue-600 text-sm mt-2 inline-block hover:underline">View details</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterSidebar({ setCategory }) {
  const [catOpen, setCatOpen] = useState(true)
  const [brandOpen, setBrandOpen] = useState(true)
  const [condOpen, setCondOpen] = useState(true)
  const [ratingOpen, setRatingOpen] = useState(true)

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded p-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-gray-800">Category</h4>
          <button onClick={() => setCatOpen(!catOpen)} className="text-gray-400 cursor-pointer">{catOpen ? '∧' : '∨'}</button>
        </div>
        {catOpen && (
          <ul className="text-sm text-gray-600 space-y-2">
            {['Electronics', 'Smartphones', 'Laptops', 'Watches', 'Accessories'].map(cat => (
              <li key={cat} onClick={() => setCategory(cat)} className="hover:text-blue-600 cursor-pointer">{cat}</li>
            ))}
            <li onClick={() => setCategory('')} className="text-blue-600 cursor-pointer font-medium">All</li>
          </ul>
        )}
      </div>

      <div className="bg-white rounded p-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-gray-800">Brands</h4>
          <button onClick={() => setBrandOpen(!brandOpen)} className="text-gray-400 cursor-pointer">{brandOpen ? '∧' : '∨'}</button>
        </div>
        {brandOpen && (
          <ul className="text-sm text-gray-600 space-y-2">
            {['Sony', 'Dell', 'HP', 'Samsung', 'Apple', 'Canon', 'GoPro'].map(brand => (
              <li key={brand} className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="hover:text-blue-600 cursor-pointer">{brand}</span>
              </li>
            ))}
            <li className="text-blue-600 cursor-pointer font-medium">See all</li>
          </ul>
        )}
      </div>

      <div className="bg-white rounded p-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-gray-800">Condition</h4>
          <button onClick={() => setCondOpen(!condOpen)} className="text-gray-400 cursor-pointer">{condOpen ? '∧' : '∨'}</button>
        </div>
        {condOpen && (
          <ul className="text-sm text-gray-600 space-y-2">
            {['Brand New', 'Refurbished', 'Old Items'].map(cond => (
              <li key={cond} className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="hover:text-blue-600 cursor-pointer">{cond}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded p-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-gray-800">Ratings</h4>
          <button onClick={() => setRatingOpen(!ratingOpen)} className="text-gray-400 cursor-pointer">{ratingOpen ? '∧' : '∨'}</button>
        </div>
        {ratingOpen && (
          <ul className="text-sm space-y-2">
            {[5, 4, 3, 2, 1].map(stars => (
              <li key={stars} className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-yellow-400">{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Products
