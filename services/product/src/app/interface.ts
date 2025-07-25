/* eslint-disable no-unused-vars */
import { Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  brand: Types.ObjectId;      
  mainCategory: Types.ObjectId; 
  category: Types.ObjectId;    
  price: number;
  discount_price?: number;
  description: string;
  short_description?: string;
  thumbnail: string;
  images: string[];
  supplier?: Types.ObjectId;   
  stock: number;
  is_available: boolean;
  is_active: boolean;
  variants?: {
    name: string;              
    values: {
      name: string;             
      value: string;           
      quantity?: number;
    }[];
  }[];
  hasVariants: boolean;
  size_chart?: string;          
  tags?: string[];
  rating?: number;
  total_sale?: number;
  createdAt: Date;
  updatedAt: Date;
}
