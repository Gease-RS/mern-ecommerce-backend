import { Router } from "express";
import UserControllers from "../controllers/UserControllers";
import auth from "../auth/index";

const router: Router = Router();

router.post("/user", UserControllers.signUp);
router.post("/singin", UserControllers.signIn);
router.get("/user/refresh_token-out", UserControllers.logout);
router.get("/user/refresh_token", UserControllers.refreshToken);
router.get("/users", auth, UserControllers.listUsers);
router.get("/user/:_id", UserControllers.getUser);
router.put("/user/:_id", UserControllers.updateUser);
router.delete("/user/:_id", UserControllers.deleteUser);
export default router;
