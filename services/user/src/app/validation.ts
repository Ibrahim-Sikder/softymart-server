import { z } from "zod";
import mongoose from "mongoose";

const objectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

export const createProductValidation = z.object({
  body: z.object({
    name: z.string().min(2, "Name is required"),
    slug: z.string().min(2, "Slug is required"),
    brand: objectId,
    mainCategory: objectId,
    category: objectId,
    price: z.number().min(0),
    discount_price: z.number().optional(),
    description: z.string().min(5),
    short_description: z.string().optional(),
    thumbnail: z.string(),
    images: z.array(z.string()).nonempty(),
    supplier: objectId.optional(),
    stock: z.number().min(0),
    is_available: z.boolean().optional(),
    is_active: z.boolean().optional(),
    variants: z
      .array(
        z.object({
          name: z.string(),
          values: z.array(
            z.object({
              name: z.string(),
              value: z.string(),
              quantity: z.number().optional(),
            })
          ),
        })
      )
      .optional(),
    hasVariants: z.boolean(),
    size_chart: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});
