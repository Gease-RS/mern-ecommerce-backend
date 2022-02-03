import { Router } from "express";
import createUser from "../controllers/UserControllers";

const router: Router = Router();

router.post("/user", createUser);
/*
router.get("/", getUsers);


router.put("/edit-people/:id", updateUser);

router.delete("/delete-people/:id", deleteUser);
*/

export default router;
