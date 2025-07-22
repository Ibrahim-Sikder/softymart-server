export interface ICategory {
  name: string;
  slug: string; // URL-friendly name
  description?: string;
  parentCategory?: string; // parent category ID (for nested categories)
  isActive: boolean;
}
