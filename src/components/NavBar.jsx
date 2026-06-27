import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { object } from '../assets/assets'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [langOpen, setLangOpen] = useState(false)
  const [shipOpen, setShipOpen] = useState(false)
  const [lang, setLang] = useState('English, USD')
  const [ship, setShip] = useState({ flag: '🇩🇪', name: 'Germany' })
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { cartItems } = useCart()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`)
    else navigate('/products')
  }

  return (
    <>
      <header className="w-full sticky top-0 z-50">
        <div className="bg-white border-b border-gray-300 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-2 md:gap-10">
            <Link to="/" className="shrink-0">
              <img src={object.chicbazaar} className="w-28 md:w-34 h-auto" />
            </Link>

            <form onSubmit={handleSearch} className="hidden md:flex flex-1 ml-2">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                type="text" placeholder="Search"
                className="border border-gray-300 px-3 py-1.5 flex-1 rounded-l-sm focus:outline-none text-sm min-w-0"
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-1.5 rounded-r-sm hover:bg-blue-700 text-sm shrink-0">Search</button>
            </form>

            <div className="hidden md:flex items-center gap-5 ml-2 text-gray-600 shrink-0">
              {user?.isAdmin && (
              <Link to="/admin" className="flex flex-col items-center text-xs hover:text-blue-600">
                <span className="w-6 h-6 flex items-center justify-center"><img src={object.set} className="w-full h-full object-contain" /></span>
                <span className="mt-0.5">Admin</span>
              </Link>
            )}
            {user ? (
              <button onClick={logout} className="flex flex-col items-center text-xs hover:text-blue-600">
                <span className="w-6 h-6 flex items-center justify-center"><img src={object.profile} className="w-full h-full object-contain" /></span>
                <span className="mt-0.5">Logout</span>
              </button>
            ) : (
              <Link to="/login" className="flex flex-col items-center text-xs hover:text-blue-600">
                <span className="w-6 h-6 flex items-center justify-center"><img src={object.profile} className="w-full h-full object-contain" /></span>
                <span className="mt-0.5">Sign In</span>
              </Link>
            )}
            <Link to="/cart" className="flex flex-col items-center text-xs hover:text-blue-600 relative">
              <span className="w-6 h-6 flex items-center justify-center relative">
                <img src={object.cart} className="w-full h-full object-contain" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {cartItems.reduce((sum, i) => sum + i.qty, 0)}
                  </span>
                )}
              </span>
              <span className="mt-0.5">My cart</span>
            </Link>
            </div>

            <div className="flex md:hidden items-center gap-2 ml-auto">
              <Link to="/cart" className="relative text-gray-600">
                <img src={object.cart} className="w-6 h-6 object-contain" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {cartItems.reduce((sum, i) => sum + i.qty, 0)}
                  </span>
                )}
              </Link>
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 text-2xl leading-none p-1">☰</button>
            </div>
          </div>
          <form onSubmit={handleSearch} className="flex md:hidden px-4 pb-2 gap-1">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              type="text" placeholder="Search"
              className="border border-gray-300 px-3 py-1.5 flex-1 rounded-l-sm focus:outline-none text-sm min-w-0"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-1.5 rounded-r-sm hover:bg-blue-700 text-sm shrink-0">Search</button>
          </form>
        </div>

        {menuOpen && (
          <div className="bg-white border-b border-gray-300 px-4 py-3 flex flex-col gap-3 md:hidden text-sm text-gray-700 shadow">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Home</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Products</Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Cart</Link>
            {user?.isAdmin && <Link to="/admin" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Admin</Link>}
            {user ? (
              <button onClick={() => { logout(); setMenuOpen(false) }} className="text-left hover:text-blue-600">Logout</button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Sign In</Link>
            )}
          </div>
        )}

        <div className="bg-white border-b border-gray-300 hidden md:block">
          <div className="max-w-5xl mx-auto px-4 py-1.5 flex items-center gap-5 text-sm text-gray-700">
            <button className="flex items-center gap-1 font-medium hover:text-blue-600">☰ All category</button>
            {['Hot offers', 'Gift boxes', 'Projects', 'Menu item'].map(item => (
              <Link key={item} to="#" className="hover:text-blue-600">{item}</Link>
            ))}
            <div className="ml-auto flex items-center gap-4 text-gray-500 text-xs relative">
              <div className="relative">
                <button onClick={() => { setLangOpen(!langOpen); setShipOpen(false) }} className="cursor-pointer hover:text-blue-600">{lang} ▾</button>
                {langOpen && (
                  <div className="absolute top-5 right-0 bg-white border rounded shadow-lg z-50 w-36">
                    {['English, USD', 'Spanish, EUR', 'French, EUR', 'German, EUR'].map(opt => (
                      <button key={opt} onClick={() => { setLang(opt); setLangOpen(false) }} className="block w-full text-left px-3 py-1.5 hover:bg-gray-100 text-xs">{opt}</button>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <button onClick={() => { setShipOpen(!shipOpen); setLangOpen(false) }} className="cursor-pointer hover:text-blue-600">Ship to {ship.flag} ▾</button>
                {shipOpen && (
                  <div className="absolute top-5 right-0 bg-white border rounded shadow-lg z-50 w-36">
                    {[{ flag: '🇩🇪', name: 'Germany' }, { flag: '🇺🇸', name: 'United States' }, { flag: '🇬🇧', name: 'United Kingdom' }, { flag: '🇫🇷', name: 'France' }, { flag: '🇦🇪', name: 'UAE' }].map(c => (
                      <button key={c.name} onClick={() => { setShip(c); setShipOpen(false) }} className="block w-full text-left px-3 py-1.5 hover:bg-gray-100 text-xs">{c.flag} {c.name}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default NavBar
