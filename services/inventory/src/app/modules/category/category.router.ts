import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();

router.get("/all", categoryController.getAllCategory);
router.get("/:id", categoryController.getCategoryById);
router.post("/create", categoryController.createCategory);
router.put("/update/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

export const categoryRoutes = router;
