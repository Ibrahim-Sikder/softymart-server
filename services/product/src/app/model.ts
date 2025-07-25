import mongoose, { Schema } from "mongoose";
import { IProduct } from "./interface";

export const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    brand: { type: Schema.Types.ObjectId, required: true },      
    mainCategory: { type: Schema.Types.ObjectId, required: true },
    category: { type: Schema.Types.ObjectId, required: true },
    price: { type: Number, required: true },
    discount_price: { type: Number, default: 0 },
    description: { type: String, required: true },
    short_description: { type: String },
    thumbnail: { type: String, required: true },
    images: [{ type: String, required: true }],
    supplier: { type: Schema.Types.ObjectId },
    stock: { type: Number, required: true },
    is_available: { type: Boolean, default: true },
    is_active: { type: Boolean, default: true },
    variants: [
      {
        name: { type: String, required: true },
        values: [
          {
            name: { type: String, required: true },
            value: { type: String, required: true },
            quantity: { type: Number, default: 0 }
          }
        ]
      }
    ],
    hasVariants: { type: Boolean, default: false },
    size_chart: { type: String },
    tags: [{ type: String }],
    rating: { type: Number, default: 0 },
    total_sale: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
