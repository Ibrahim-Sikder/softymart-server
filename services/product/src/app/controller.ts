import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from './utils/sendResponse';
import catchAsync from './utils/catchAsync';
import { productService } from './service';

const getAllProduct: RequestHandler = catchAsync(async (req, res) => {
  const tenantId = req.headers['x-tenant-id'] as string;
  const result = await productService.getAllProduct(tenantId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Products retrieved successfully',
    meta: result.meta,
    data: result.result
  });
});

const getProductById: RequestHandler = catchAsync(async (req, res) => {
  const tenantId = req.headers['x-tenant-id'] as string;
  const result = await productService.getProductById(tenantId, req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product retrieved successfully',
    data: result
  });
});

const createProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await productService.createProduct(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Product created successfully',
    data: result
  });
});

const updateProduct: RequestHandler = catchAsync(async (req, res) => {
  const tenantId = req.headers['x-tenant-id'] as string;
  const result = await productService.updateProduct(tenantId, req.params.id, req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product updated successfully',
    data: result
  });
});

const deleteProduct: RequestHandler = catchAsync(async (req, res) => {
  const tenantId = req.headers['x-tenant-id'] as string;
  await productService.deleteProduct(tenantId, req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product deleted successfully',
    data: null
  });
});

export const productController = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
