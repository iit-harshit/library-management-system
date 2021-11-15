import { Router } from "express";
import { createUserHandler } from "../controller/user.controller";
import { validateRequest } from "../middleware";
import { createUserSchema } from "../schema/user.schema";

const router = Router();

router.post("/create", validateRequest(createUserSchema), createUserHandler);

export default router;
