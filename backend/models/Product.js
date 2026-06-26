import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: Number,
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 50 },
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },
  orders: { type: Number, default: 0 },
  shipping: { type: String, default: 'Free Shipping' },
  brand: String,
  inStock: { type: Boolean, default: true },
  specs: { type: mongoose.Schema.Types.Mixed },
  pricingTiers: [{
    price: String,
    range: String,
    highlight: Boolean,
  }],
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
