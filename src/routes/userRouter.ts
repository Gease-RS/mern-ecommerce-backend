import { Router } from "express";
import UserControllers from "../controllers/UserControllers";
import auth from "../auth/index";

const router: Router = Router();

router.post("/api/user", UserControllers.signUp);
router.post("/api/singin", UserControllers.signIn);
router.get("/api/user/refresh_token-out", UserControllers.logout);
router.get("/api/user/refresh_token", UserControllers.refreshToken);
router.get("/api/users", auth, UserControllers.listUsers);
router.get("/api/user/:_id", UserControllers.getUser);
router.put("/api/user/:_id", UserControllers.updateUser);
router.delete("/api/user/:_id", UserControllers.deleteUser);

const routerUser = router;

export default routerUser;
