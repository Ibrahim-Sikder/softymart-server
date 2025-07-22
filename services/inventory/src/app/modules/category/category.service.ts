
import { ICategory } from "./category.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Request } from "express";
import mongoose from "mongoose";
import { Category } from "./category.model";

export const getAllCategory = async (query: Record<string, unknown>): Promise<any> => {
  const searchableFields = ["name"];

  const categoryQuery = new QueryBuilder(Category.find({}), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await categoryQuery.countTotal();
  const result = await categoryQuery.queryModel;

  return { meta, result };
};

export const getCategoryById = async (id: string): Promise<ICategory | null> => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
  const queryCondition = isValidObjectId ? { _id: id } : { slug: id };

  const category = await Category.findOne({ ...queryCondition });
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "This category is not found");
  }
  return category;
};

export const createCategory = async (req: Request): Promise<ICategory | null> => {
  const result = await Category.create({
    ...req.body,
    slug: req.body.name.toLowerCase().split(" ").join("-"),
  });
  return result;
};

export const updateCategory = async (id: string, req: Request): Promise<ICategory | null> => {
  const category = await Category.findById(id);
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "This category does not exist");
  }

  const updatedData: Record<string, unknown> = { ...req.body };

  if (req.body.name) {
    updatedData.slug = req.body.name.toLowerCase().split(" ").join("-");
  }

  const result = await Category.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const deleteCategory = async (id: string): Promise<void> => {
  const category = await Category.findById(id);
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "This category is not found");
  }
  await Category.deleteOne({ _id: id });
};

export const categoryService = {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
