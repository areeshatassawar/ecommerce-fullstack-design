# E-Commerce Full-Stack Application

A fully functional eCommerce web application with React frontend, Express backend, MongoDB database, and JWT authentication.

## Tech Stack

**Frontend:** React 19, Vite 8, Tailwind CSS 4, React Router 7
**Backend:** Node.js, Express 5, Mongoose 9, JWT, bcrypt
**Database:** MongoDB Atlas
**Deployment:** Render / Vercel

## Features

- Responsive design (desktop + mobile)
- Product listing with search and filtering (category, brand, condition, rating)
- Product detail page with specs, pricing tiers, and related products
- Shopping cart with localStorage persistence
- Complete checkout flow (shipping form, order creation)
- User authentication (register/login) with JWT
- Admin panel with product CRUD and order management
- Newsletter subscription
- Featured products on homepage

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Installation

1. Clone the repo
```
git clone https://github.com/yourusername/ecommerce-fullstack-design.git
cd ecommerce-fullstack-design
```

2. Install frontend dependencies
```
npm install
```

3. Install backend dependencies
```
cd backend
npm install
cd ..
```

4. Create `backend/.env`:
```
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_API_KEY=your_key
CLOUDINARY_SECRET_KEY=your_secret
CLOUD_NAME=your_cloud_name
```

5. Seed the database
```
cd backend
node seed.js
node seedAdmin.js
cd ..
```

6. Start both servers
```
npm run dev
```

### Admin Login

- **Email:** admin@shop.com
- **Password:** admin123

## Project Structure

```
├── backend/
│   ├── config/          # DB and Cloudinary config
│   ├── controllers/     # Route handlers
│   ├── middleware/       # Auth middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routes
│   ├── server.js        # Entry point
│   ├── seed.js          # Product seeder
│   └── seedAdmin.js     # Admin seeder
├── src/
│   ├── admin/           # Admin panel
│   ├── assets/          # Images and static data
│   ├── components/      # Reusable components
│   ├── context/         # Auth context
│   ├── pages/           # Page components
│   ├── api.js           # API helper functions
│   ├── App.jsx          # Routes
│   └── main.jsx         # Entry point
├── render.yaml          # Render deployment config
└── vercel.json          # Vercel deployment config
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/products | No | List products (search, category) |
| GET | /api/products/:id | No | Get single product |
| POST | /api/products | Admin | Create product |
| PUT | /api/products/:id | Admin | Update product |
| DELETE | /api/products/:id | Admin | Delete product |
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login |
| POST | /api/orders | User | Create order |
| GET | /api/orders | Admin | List all orders |
| GET | /api/orders/my | User | Get user orders |
| PUT | /api/orders/:id/status | Admin | Update order status |
| POST | /api/newsletter | No | Subscribe to newsletter |

## Deployment

### Backend (Render)
1. Push to GitHub
2. Create new Web Service on Render
3. Connect repo, set build command: `cd backend && npm install`, start command: `cd backend && node server.js`
4. Add environment variables in Render dashboard

### Frontend (Vercel)
1. Push to GitHub
2. Import project in Vercel
3. Set build command: `npm run build`, output: `dist`
4. Set `vercel.json` rewrites for SPA routing
