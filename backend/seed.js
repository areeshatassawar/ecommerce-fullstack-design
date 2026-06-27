import mongoose from 'mongoose';
import dns from 'dns';
import 'dotenv/config';
import Product from './models/Product.js';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const products = [
  {
    name: 'Canon EOS 2000D DSLR Camera with 18-55mm Lens',
    price: 499.00,
    oldPrice: 599.00,
    rating: 4.7,
    reviews: 234,
    orders: 154,
    shipping: 'Free Shipping',
    image: 'https://i.pinimg.com/736x/36/57/b8/3657b889f5ca985938227b388c691abc.jpg',
    description: 'The Canon EOS 2000D is an entry-level DSLR camera perfect for beginners. Features a 24.1MP sensor, Full HD video recording, and built-in Wi-Fi for easy sharing.',
    category: 'Electronics',
    brand: 'Canon',
    inStock: true,
    stock: 25,
    specs: { model: 'EOS 2000D', productType: 'DSLR Camera', material: 'Plastic body with metal mount', design: 'Classic DSLR design', customization: 'Customized logo available', warranty: '2 years full warranty' },
    pricingTiers: [{ price: '$499.00', range: '1-10 pcs', highlight: true }, { price: '$459.00', range: '11-50 pcs', highlight: false }, { price: '$429.00', range: '51+ pcs', highlight: false }],
  },
  {
    name: 'GoPro HERO9 Black - Waterproof Action Camera',
    price: 349.00,
    oldPrice: 399.00,
    rating: 4.8,
    reviews: 189,
    orders: 210,
    shipping: 'Free Shipping',
    image: 'https://i.pinimg.com/736x/99/c2/8e/99c28e310363f5916c13bbb5a18b0293.jpg',
    description: 'The GoPro HERO9 Black features 5K video, 20MP photos, and a front-facing display for vlogging. Waterproof to 33ft and includes HyperSmooth 3.0 stabilization.',
    category: 'Electronics',
    brand: 'GoPro',
    inStock: true,
    stock: 30,
    specs: { model: 'HERO9 Black', productType: 'Action Camera', material: 'Waterproof plastic', design: 'Compact action camera', customization: 'Custom branding available', warranty: '1 year full warranty' },
    pricingTiers: [{ price: '$349.00', range: '1-20 pcs', highlight: true }, { price: '$325.00', range: '21-100 pcs', highlight: false }, { price: '$299.00', range: '101+ pcs', highlight: false }],
  },
  {
    name: 'Samsung Galaxy S23 Ultra 5G Smartphone',
    price: 1199.00,
    oldPrice: 1299.00,
    rating: 4.9,
    reviews: 456,
    orders: 320,
    shipping: 'Free Shipping',
    image: 'https://i.pinimg.com/736x/80/e3/6e/80e36e14b125b52e77462d999b8d639e.jpg',
    description: 'The Samsung Galaxy S23 Ultra features a 200MP camera, S Pen support, and a powerful Snapdragon 8 Gen 2 processor.',
    category: 'Smartphones',
    brand: 'Samsung',
    inStock: true,
    stock: 15,
    specs: { model: 'SM-S918B', productType: 'Smartphone', material: 'Glass and aluminum', design: 'Modern sleek design', customization: 'Custom packaging available', warranty: '2 years full warranty' },
    pricingTiers: [{ price: '$1199.00', range: '1-5 pcs', highlight: true }, { price: '$1159.00', range: '6-20 pcs', highlight: false }, { price: '$1099.00', range: '21+ pcs', highlight: false }],
  },
  {
    name: 'Apple MacBook Air M2 - 13.6" Laptop',
    price: 1199.00,
    oldPrice: 1299.00,
    rating: 4.9,
    reviews: 312,
    orders: 178,
    shipping: 'Free Shipping',
    image: 'https://i.pinimg.com/1200x/e0/c3/c0/e0c3c0d0c8d6f72d879004baeaa34d24.jpg',
    description: 'Apple MacBook Air with M2 chip features a 13.6-inch Liquid Retina display, 18-hour battery life, and a fanless design.',
    category: 'Laptops',
    brand: 'Apple',
    inStock: true,
    stock: 20,
    specs: { model: 'MacBook Air M2', productType: 'Laptop', material: 'Aluminum body', design: 'Slim and lightweight', customization: 'Custom engraving available', warranty: '1 year full warranty' },
    pricingTiers: [{ price: '$1199.00', range: '1-10 pcs', highlight: true }, { price: '$1149.00', range: '11-30 pcs', highlight: false }, { price: '$1099.00', range: '31+ pcs', highlight: false }],
  },
  {
    name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    price: 398.00,
    oldPrice: 449.00,
    rating: 4.7,
    reviews: 278,
    orders: 195,
    shipping: 'Free Shipping',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop',
    description: 'Sony WH-1000XM5 headphones deliver industry-leading noise cancellation with exceptional sound quality. Features 30-hour battery life.',
    category: 'Electronics',
    brand: 'Sony',
    inStock: true,
    stock: 40,
    specs: { model: 'WH-1000XM5', productType: 'Over-Ear Headphones', material: 'Plastic with soft leather ear pads', design: 'Foldable and compact', customization: 'Custom branding available', warranty: '2 years full warranty' },
    pricingTiers: [{ price: '$398.00', range: '1-20 pcs', highlight: true }, { price: '$379.00', range: '21-50 pcs', highlight: false }, { price: '$359.00', range: '51+ pcs', highlight: false }],
  },
  {
    name: 'Dell XPS 15 - 15.6" 4K Touchscreen Laptop',
    price: 1499.00,
    oldPrice: 1699.00,
    rating: 4.6,
    reviews: 189,
    orders: 92,
    shipping: 'Free Shipping',
    image: 'https://i.pinimg.com/736x/8e/b3/5b/8eb35b8e3795cdb30227f2711e124f11.jpg',
    description: 'Dell XPS 15 features a stunning 4K touchscreen display, Intel Core i7 processor, and NVIDIA GeForce RTX graphics.',
    category: 'Laptops',
    brand: 'Dell',
    inStock: true,
    stock: 10,
    specs: { model: 'XPS 15', type: 'Laptop', material: 'Aluminum and carbon fiber', design: 'Premium build quality', customization: 'Custom configuration available', warranty: '3 years full warranty' },
    pricingTiers: [{ price: '$1499.00', range: '1-10 pcs', highlight: true }, { price: '$1449.00', range: '11-25 pcs', highlight: false }, { price: '$1399.00', range: '26+ pcs', highlight: false }],
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Database seeded with', products.length, 'products');
  await mongoose.connection.close();
}

seed().catch(console.error);
