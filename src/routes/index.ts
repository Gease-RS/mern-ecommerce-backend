import { Router } from "express";
import UserControllers from "../controllers/UserControllers";

const router: Router = Router();

router.post("/user", UserControllers.signUp);
router.post("/singin", UserControllers.signIn);
router.post("/logout", UserControllers.logout);
router.get("/refresh", UserControllers.refreshToken);
router.get("/users", UserControllers.listUsers);
router.get("/user", UserControllers.getUser);
router.put("/user/:_id", UserControllers.updateUser);
router.delete("/user/:_id", UserControllers.deleteUser);

export default router;
