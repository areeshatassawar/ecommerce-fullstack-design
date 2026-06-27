
 import { Link } from 'react-router-dom'
 import { useState } from 'react'
 import { object } from '../assets/assets'
 
 function Footer() {
   const [menuOpen, setMenuOpen] = useState(false)
 
   return (
     <>  

 <footer className="bg-white border-t border-gray-300 mt-4">
  <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-5 gap-8">

    {/* Brand */}
    <div>
      <div className="mb-4">
        <img src={object.chicbazaar} className="w-48 h-auto" />
      </div>
      <p className="text-sm text-gray-500 mb-4 max-w-xs">Best information about the company goes here but now lorem ipsum is</p>
      <div className="flex gap-3">
        {/* Facebook */}
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
        {/* Twitter */}
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </div>
        {/* LinkedIn */}
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </div>
        {/* Instagram */}
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.315 1.347 20.646.935 19.856.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
          </svg>
        </div>
        {/* YouTube */}
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </div>
      </div>
    </div>

    {/* About */}
    <div>
      <h4 className="font-semibold text-gray-800 mb-3">About</h4>
      <ul className="text-sm text-gray-500 space-y-2">
        <li className="hover:text-blue-600 cursor-pointer">About Us</li>
        <li className="hover:text-blue-600 cursor-pointer">Find store</li>
        <li className="hover:text-blue-600 cursor-pointer">Categories</li>
        <li className="hover:text-blue-600 cursor-pointer">Blogs</li>
      </ul>
    </div>

    {/* Partnership */}
    <div>
      <h4 className="font-semibold text-gray-800 mb-3">Partnership</h4>
      <ul className="text-sm text-gray-500 space-y-2">
        <li className="hover:text-blue-600 cursor-pointer">About Us</li>
        <li className="hover:text-blue-600 cursor-pointer">Find store</li>
        <li className="hover:text-blue-600 cursor-pointer">Categories</li>
        <li className="hover:text-blue-600 cursor-pointer">Blogs</li>
      </ul>
    </div>

    {/* Information */}
    <div>
      <h4 className="font-semibold text-gray-800 mb-3">Information</h4>
      <ul className="text-sm text-gray-500 space-y-2">
        <li className="hover:text-blue-600 cursor-pointer">Help Center</li>
        <li className="hover:text-blue-600 cursor-pointer">Money Refund</li>
        <li className="hover:text-blue-600 cursor-pointer">Shipping</li>
        <li className="hover:text-blue-600 cursor-pointer">Contact us</li>
      </ul>
    </div>

    {/* For users + Get app */}
    <div>
      <h4 className="font-semibold text-gray-800 mb-3">For users</h4>
      <ul className="text-sm text-gray-500 space-y-2 mb-4">
        <li className="hover:text-blue-600 cursor-pointer">Login</li>
        <li className="hover:text-blue-600 cursor-pointer">Register</li>
        <li className="hover:text-blue-600 cursor-pointer">Settings</li>
        <li className="hover:text-blue-600 cursor-pointer">My Orders</li>
      </ul>
      <h4 className="font-semibold text-gray-800 mb-2">Get app</h4>
      <div className="flex flex-col gap-2">
        {/* App Store Button */}
        <button className="bg-black text-white rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-gray-800 transition w-32">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.275 12.775c0-2.475 2.025-4.125 2.125-4.25-1.15-1.675-2.95-1.9-3.575-1.925-1.525-.15-2.975.9-3.75.9-.8 0-2.025-.875-3.325-.85-1.7.025-3.275 1-4.15 2.525-1.775 3.075-.45 7.625 1.275 10.125.85 1.225 1.85 2.6 3.175 2.55 1.275-.05 1.75-.825 3.3-.825 1.525 0 1.95.825 3.275.8 1.35-.025 2.225-1.25 3.05-2.475.95-1.4 1.35-2.75 1.35-2.825-.025 0-2.55-.975-2.55-3.725zM14.75 4.5c.675-.825 1.125-1.975.975-3.125-.95.05-2.1.65-2.775 1.45-.625.7-1.15 1.85-1.025 2.95 1.075.075 2.15-.55 2.825-1.275z"/>
          </svg>
          <div className="flex flex-col items-start">
            <span className="text-[10px] leading-none">Download on </span>
            <span className="text-sm font-semibold leading-none">App Store</span>
          </div>
        </button>
        
        {/* Google Play Button */}
        <button className="bg-black text-white rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-gray-800 transition w-32">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.609 1.814L13.792 12 3.61 22.186a1.002 1.002 0 01-1.61-.804V2.618c0-.89 1.077-1.333 1.609-.804zm13.638 3.632l-2.339 2.339 2.339 2.339 4.224-4.225c.49-.49.27-1.322-.383-1.48-1.275-.31-2.656-.327-3.841-.017.009 0 0 0 0 0zm-3.005 3.005l-2.358 2.359 8.59 8.59c.483.482 1.282.264 1.445-.387.313-1.252.333-2.605.017-3.769l-7.694-6.793zM3.27 19.046l9.987-9.987-2.344-2.344L3.608 4.958c-.565.134-1.207.475-1.207.918v13.243c0 1.12 2.001.8 2.001.8l.283-.874z"/>
          </svg>
          <div className="flex flex-col items-start">
            <span className="text-[10px] leading-none">Get it on </span>
            <span className="text-sm font-semibold leading-none">Google Play</span>
          </div>
        </button>
      </div>
    </div>

  </div>

  {/* Bottom bar */}
  <div className="border-t border-gray-300 py-4 px-4">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-2">
      <span>© 2023 Ecommerce.</span>
      <div className="flex items-center gap-2">
        <span>🇺🇸</span>
        <span>English</span>
      </div>
    </div>
  </div>
</footer>
 </>
  )
}

export default Footer 
