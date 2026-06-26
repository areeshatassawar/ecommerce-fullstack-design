const BASE = import.meta.env.VITE_API_URL || ''
const API = `${BASE}/api/products`;

export const fetchProducts = async (search = '', category = '') => {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (category) params.set('category', category);
  const qs = params.toString();
  const res = await fetch(`${API}${qs ? '?' + qs : ''}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const fetchProduct = async (id) => {
  const res = await fetch(`${API}/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
};

const authHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } : { 'Content-Type': 'application/json' };
};

export const createOrder = async (orderData) => {
  const res = await fetch(`${BASE}/api/orders`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(orderData) });
  if (!res.ok) { const err = await res.json(); throw new Error(err.message); }
  return res.json();
};

export const fetchOrders = async () => {
  const res = await fetch(`${BASE}/api/orders`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
};

export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${BASE}/api/orders/${id}/status`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify({ status }) });
  if (!res.ok) throw new Error('Failed to update order');
  return res.json();
};

export const subscribeNewsletter = async (email) => {
  const res = await fetch(`${BASE}/api/newsletter`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
  if (!res.ok) throw new Error('Subscription failed');
  return res.json();
};
