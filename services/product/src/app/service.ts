import { Request } from 'express';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import { IProduct } from './interface';
import { getTenantInfo } from './utils/tenant';
import { getTenantConnection } from './utils/dbConnection';
import { productSchema } from './model';

async function getTenantProductModel(tenantId: string) {
  const tenant: any = await getTenantInfo(tenantId);

  if (!tenant?.dbUri) {
    throw new AppError(httpStatus.NOT_FOUND, 'Tenant database not found');
  }

  const tenantConn = await getTenantConnection(tenant.dbUri);
  return tenantConn.model<IProduct>('Product', productSchema);
}

// ✅ Create Product
export const createProduct = async (req: Request): Promise<IProduct | null> => {
  const tenantId = req.headers['x-tenant-id'] as string;
  const Product = await getTenantProductModel(tenantId);

  const newProduct = await Product.create([req.body]);
  return newProduct[0];
};

// ✅ Get All Products
export const getAllProduct = async (tenantId: string): Promise<any> => {
  const Product = await getTenantProductModel(tenantId);
  const result = await Product.find({ isDeleted: false });
  return { meta: {}, result };
};

// ✅ Get Product By Id
export const getProductById = async (tenantId: string, id: string): Promise<IProduct | null> => {
  const Product = await getTenantProductModel(tenantId);
  const product = await Product.findOne({ _id: id, isDeleted: false });

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'This product is not found');
  }
  return product;
};

// ✅ Update Product
export const updateProduct = async (tenantId: string, id: string, req: Request): Promise<IProduct | null> => {
  const Product = await getTenantProductModel(tenantId);

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: id, isDeleted: false },
    req.body,
    { new: true }
  );

  if (!updatedProduct) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found to update');
  }
  return updatedProduct;
};

// ✅ Delete Product (Soft Delete)
export const deleteProduct = async (tenantId: string, id: string): Promise<void | null> => {
  const Product = await getTenantProductModel(tenantId);

  const deleted = await Product.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true }
  );

  if (!deleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found to delete');
  }
  return null;
};

export const productService = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
