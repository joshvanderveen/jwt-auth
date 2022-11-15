import { Router } from "express";

import * as auth from "../controllers";
import { adminAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/api/v1/auth/login", auth.login);
router.post("/api/v1/auth/register", auth.register);
router.post("/api/v1/auth/refresh", auth.refresh);
router.get("/api/v1/test", [adminAuth], auth.authRoute);

export default router;
