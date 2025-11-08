const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, default: 0 },
    description: { type: String, required: true },
    images: { type: [String], required: true }, // ✅ spelling fixed (was 'iamges')
    stock: { type: Number, default: 0 },
    sale: { type: Number, default: 0 },
  },
  { timestamps: true } // ✅ Adds createdAt & updatedAt automatically
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
