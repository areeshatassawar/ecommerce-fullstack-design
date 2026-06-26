import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { object } from '../assets/assets'
import { fetchProducts } from '../api'
import { useAuth } from '../context/AuthContext'
import Newsletter from '../components/Newsletter'

function Home() {
  const { user } = useAuth()
  const [allProducts, setAllProducts] = useState([])
  const [electronics, setElectronics] = useState([])

  useEffect(() => {
    fetchProducts().then(data => {
      setAllProducts(data)
      setElectronics(data.filter(p => ['Electronics', 'Smartphones', 'Laptops'].includes(p.category)).slice(0, 8))
    }).catch(() => {})
  }, [])
  return (
    <main className="bg-gray-100 min-h-screen">
      <section className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-3">
        <div className="bg-white md:w-48 shrink-0 rounded p-3 hidden md:block">
          <ul className="text-sm text-gray-700 space-y-3">
            <li className="hover:bg-blue-100 cursor-pointer">Automobiles</li>
            <li className="hover:bg-blue-100 cursor-pointer">Clothes and wear</li>
            <li className="hover:bg-blue-100 cursor-pointer">Home interiors</li>
            <li className="hover:bg-blue-100 cursor-pointer">Computer and tech</li>
            <li className="hover:bg-blue-100 cursor-pointer">Tools, equipments</li>
            <li className="hover:bg-blue-100 cursor-pointer">Sports and outdoor</li>
            <li className="hover:bg-blue-100 cursor-pointer">Animal and pets</li>
            <li className="hover:bg-blue-100 cursor-pointer">Machinery tools</li>
            <li className="hover:bg-blue-100 cursor-pointer">More category</li>
          </ul>
        </div>

        <div className="flex-1 rounded p-8 flex items-center justify-between relative overflow-hidden"
          style={{ backgroundImage: `url(${object.maskgroup})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 text-white">
            <p className="text-sm mb-1">Latest trending</p>
            <h2 className="text-3xl font-bold mb-4">Electronic items</h2>
            <Link to="/products"><button className="bg-white text-gray-800 px-5 py-2 rounded text-sm font-medium">Learn more</button></Link>
          </div>
        </div>

        <div className="md:w-44 shrink-0 flex flex-col gap-3 hidden md:flex">
          <div className="bg-white rounded p-4 text-sm text-center">
            <div className="flex justify-center mb-2"><img src={object.profile} /></div>
            {user ? (
              <>
                <p className="text-gray-800 font-medium mb-1">{user.name}</p>
                <p className="text-gray-400 text-xs mb-3">{user.email}</p>
                {user.isAdmin ? (
                  <Link to="/admin" className="block w-full bg-purple-600 text-white py-1.5 rounded text-sm mb-2 hover:bg-purple-700">Admin Panel</Link>
                ) : (
                  <Link to="/" className="block w-full bg-blue-600 text-white py-1.5 rounded text-sm mb-2 hover:bg-blue-700">My Account</Link>
                )}
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-3">Hi, user<br/>let's get started</p>
                <Link to="/login" className="block w-full bg-blue-600 text-white py-1.5 rounded text-sm mb-2 hover:bg-blue-700">Join now</Link>
                <Link to="/login" className="block w-full border border-gray-300 py-1.5 rounded text-sm hover:bg-gray-50">Log in</Link>
              </>
            )}
          </div>
          <div className="bg-orange-400 rounded p-3 text-white text-xs">
            <p className="font-medium">Get US $10 off with a new supplier</p>
          </div>
          <div className="bg-teal-500 rounded p-3 text-white text-xs">
            <p className="font-medium">Send quotes with supplier preferences</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded p-4 flex gap-4 items-center">
          <div className="shrink-0 w-36">
            <h3 className="font-semibold text-gray-800">Deals and offers</h3>
            <p className="text-xs text-gray-500 mb-3">Hygiene equipments</p>
            <div className="flex gap-1">
              {[['04','Days'],['13','Hour'],['34','Min'],['56','Sec']].map(([num, label]) => (
                <div key={label} className="bg-gray-800 text-white rounded text-center px-1.5 py-1">
                  <div className="text-sm font-bold">{num}</div>
                  <div className="text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-px bg-gray-200 self-stretch"></div>
          <div className="flex gap-15 overflow-x-auto flex-1 pb-2">
            {allProducts.length > 0 ? allProducts.slice(0, 5).map((p, i) => (
              <Link key={p._id} to={`/products/${p._id}`} className="flex flex-col items-center shrink-0 w-37">
                <div className="mb-2"><img src={p.image} className="w-12 h-12 object-contain" /></div>
                <p className="text-sm text-gray-700 text-center mb-1">{p.name.substring(0, 15)}</p>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">{['-25%','-15%','-40%','-25%','-25%'][i]}</span>
              </Link>
            )) : <p className="text-gray-400 text-sm">Loading deals...</p>}
          </div>
        </div>
      </section>

      {allProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Featured Products</h3>
            <Link to="/products" className="text-sm text-blue-600 hover:underline">View all →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {allProducts.slice(0, 6).map(p => (
              <Link key={p._id} to={`/products/${p._id}`} className="bg-white rounded p-3 flex flex-col items-center text-center hover:shadow transition">
                <div className="h-24 flex items-center justify-center mb-2 overflow-hidden">
                  <img src={p.image} className="w-full h-full object-cover rounded" />
                </div>
                <p className="text-xs font-medium text-gray-700 leading-snug mb-1">{p.name.substring(0, 30)}...</p>
                <p className="text-sm font-bold text-blue-600">${p.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 bg-cover bg-center rounded p-6 flex flex-col justify-between min-h-[200px]"
            style={{ backgroundImage: `url(${object.outdoor})` }}>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Outdoor</h3>
              <p className="text-sm text-gray-500">Lorem ipsum dolor</p>
            </div>
            <button className="border border-gray-100 bg-white text-sm px-4 py-1.5 rounded hover:bg-gray-100 cursor-pointer w-fit mt-4">Source now</button>
          </div>
          <div className="md:w-3/4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {[
              { name: 'Soft chairs', price: 'USD 19', img: object.sofa },
              { name: 'Sofa & chair', price: 'USD 19', img: object.dish },
              { name: 'Kitchen dishes', price: 'USD 19', img: object.mixer },
              { name: 'Smart watches', price: 'USD 19', img: object.sw },
              { name: 'Kitchen mixer', price: 'USD 100', img: object.blender },
              { name: 'Blenders', price: 'USD 39', img: object.lamp },
              { name: 'Home appliance', price: 'USD 19', img: object.lamp },
              { name: 'Coffee maker', price: 'USD 10', img: object.blender },
            ].map((item) => (
              <div key={item.name} className="bg-white border border-gray-200 p-3 flex flex-col items-center justify-center text-center hover:shadow cursor-pointer h-32">
                <div className="h-10 flex items-center justify-center mb-2"><img src={item.img} className="w-10 h-10 object-contain" /></div>
                <p className="text-xs font-medium text-gray-700">{item.name}</p>
                <p className="text-xs text-gray-400">{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 bg-cover bg-center rounded p-6 flex flex-col justify-between min-h-[200px]"
            style={{ backgroundImage: `url(${object.electronics})` }}>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Consumer electronics and gadgets</h3>
            <button className="border border-gray-100 bg-white text-sm px-4 py-1.5 rounded hover:bg-gray-100 cursor-pointer w-fit mt-4">Source now</button>
          </div>
          <div className="md:w-3/4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {electronics.length > 0 ? electronics.map(p => (
              <Link key={p._id} to={`/products/${p._id}`} className="bg-white border border-gray-200 p-3 flex flex-col items-center justify-center text-center hover:shadow cursor-pointer h-32">
                <div className="h-10 flex items-center justify-center mb-2"><img src={p.image} className="w-10 h-10 object-contain" /></div>
                <p className="text-xs font-medium text-gray-700">{p.name.substring(0, 20)}</p>
                <p className="text-xs text-gray-400">${p.price.toFixed(2)}</p>
              </Link>
            )) : <p className="col-span-4 text-center text-gray-400 text-sm py-8">No products found</p>}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-[#2C7CF1] rounded p-8 flex items-center justify-between">
          <div className="text-white max-w-xs">
            <h3 className="text-xl font-bold mb-2">An easy way to send requests to all suppliers</h3>
            <p className="text-sm opacity-80">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
          </div>
          <div className="bg-white rounded p-6 w-72 text-sm">
            <p className="font-medium mb-3">Send quote to suppliers</p>
            <input className="w-full border border-gray-300 rounded px-3 py-2 mb-2 text-sm focus:outline-none" placeholder="What item you need?" />
            <textarea className="w-full border border-gray-300 rounded px-3 py-2 mb-2 text-sm focus:outline-none" rows="2" placeholder="Type more details"></textarea>
            <div className="flex gap-2 mb-3">
              <input className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none" placeholder="Quantity" />
              <select className="border border-gray-300 rounded px-2 py-2 text-sm"><option>Pcs</option></select>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Send inquiry</button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-4">
        <h3 className="font-semibold text-gray-800 mb-4">Our extra services</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { title: 'Source from Industry Hubs', bgImage: object.image1 },
            { title: 'Customize Your Products', bgImage: object.customize },
            { title: 'Fast, reliable shipping by ocean or air', bgImage: object.shipping },
            { title: 'Product monitoring and inspection', bgImage: object.monitor },
          ].map((service) => (
            <div key={service.title} className="rounded p-4 h-32 flex flex-col justify-end hover:shadow cursor-pointer relative overflow-hidden"
              style={{ backgroundImage: `url(${service.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative z-10"><p className="text-sm font-medium text-white">{service.title}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Suppliers by region</h3>
          <div className="grid grid-cols-5 gap-3 text-sm">
            {[['Arabic Emirates','🇦🇪','shopname.ae'],['Australia','🇦🇺','shopname.com.au'],['United States','🇺🇸','shopname.com'],['Russia','🇷🇺','shopname.ru'],['Italy','🇮🇹','shopname.it'],['Denmark','🇩🇰','denmark.com.dk'],['France','🇫🇷','shopname.com.fr'],['Arabic Emirates','🇦🇪','shopname.ae'],['China','🇨🇳','shopname.ae'],['Great Britain','🇬🇧','shopname.co.uk']].map(([country, flag, url], i) => (
              <div key={i} className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
                <span className="text-xl">{flag}</span>
                <div><p className="font-medium text-gray-800">{country}</p><p className="text-xs text-gray-400">{url}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4"><Newsletter /></section>
    </main>
  )
}

export default Home
