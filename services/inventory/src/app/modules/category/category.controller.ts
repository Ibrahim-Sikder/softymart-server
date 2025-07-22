import { RequestHandler } from "express";
import { categoryService } from "./category.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const getAllCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await categoryService.getAllCategory(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Categories retrieved successfully",
    data: result.result,
    meta: result.meta,
  });
});

const getCategoryById: RequestHandler = catchAsync(async (req, res) => {
  const result = await categoryService.getCategoryById(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Category retrieved successfully",
    data: result,
  });
});

const createCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await categoryService.createCategory(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Category created successfully",
    data: result,
  });
});

const updateCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await categoryService.updateCategory(req.params.id, req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Category updated successfully",
    data: result,
  });
});

const deleteCategory: RequestHandler = catchAsync(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Category deleted successfully",
    data: null,
  });
});

export const categoryController = {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
