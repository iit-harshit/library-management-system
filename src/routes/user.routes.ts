import { Router } from "express";
import {
  createUserHandler,
  updateRoleHandler,
} from "../controller/user.controller";
import { requiresUser, validateRequest } from "../middleware";
import { createUserSchema, updateRoleSchema } from "../schema/user.schema";

const router = Router();

router.post("/create", validateRequest(createUserSchema), createUserHandler);

router.patch(
  "/updateRole",
  [requiresUser, validateRequest(updateRoleSchema)],
  updateRoleHandler
);

export default router;
