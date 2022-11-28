import { Router } from "express";
import users from "./users.js";
import auth from "./auth.js";
const router = Router();

router.use("/users", users);
router.use("/auth", auth);

export default router;
