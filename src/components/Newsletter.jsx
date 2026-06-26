import { useState } from 'react'
import { subscribeNewsletter } from '../api'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (email) {
      try {
        await subscribeNewsletter(email)
        setIsSubscribed(true)
        setEmail('')
        setTimeout(() => setIsSubscribed(false), 3000)
      } catch (err) {
        setError(err.message)
      }
    }
  }

  return (
    <div className="text-center mt-8 py-6">
      <h3 className="font-semibold text-gray-800 mb-1">Subscribe on our newsletter</h3>
      <p className="text-sm text-gray-500 mb-4">
        {isSubscribed
          ? "Thank you for subscribing!"
          : "Get daily news on upcoming offers from many suppliers all over the world"}
      </p>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {!isSubscribed && (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-2">
          <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white gap-2">
            <input
              className="focus:outline-none text-sm w-full sm:w-52"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 text-sm transition-colors" >
            Subscribe
          </button>
        </form>
      )}

      {isSubscribed && (
        <div className="text-green-600 text-sm font-medium">
          ✓ You've been subscribed successfully!
        </div>
      )}
    </div>
  )
}

export default Newsletter