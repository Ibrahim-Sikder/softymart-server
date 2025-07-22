import { z } from "zod";

export const createCategoryValidation = z.object({
  body: z.object({
    name: z.string().min(3, "Category name must be at least 3 characters"),
    slug: z.string().min(3),
    description: z.string().optional(),
    parentCategory: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const updateCategoryValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    parentCategory: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});
