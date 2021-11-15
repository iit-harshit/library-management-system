import { Router } from "express";
import { createUserSessionHandler } from "../controller/session.controller";
import { validateRequest } from "../middleware";
import { createUserSessionSchema } from "../schema/user.schema";

const router = Router();

router.post(
  "/create",
  validateRequest(createUserSessionSchema),
  createUserSessionHandler
);
export default router;
