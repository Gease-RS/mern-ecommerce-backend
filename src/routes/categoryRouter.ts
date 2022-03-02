import { Router } from "express";
import CategoryController from "../controllers/CategoryControllers";

const router: Router = Router();

router.post("/api/category", CategoryController.getCategory);

export default router;
