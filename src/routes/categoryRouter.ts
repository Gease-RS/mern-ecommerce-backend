import { Router } from "express";
import CategoryController from "../controllers/CategoryControllers";

const router: Router = Router();

router.get("/api/category", CategoryController.getCategory);
router.post("/api/category", CategoryController.createCategory);

const routerCategory = router;

export default routerCategory;
