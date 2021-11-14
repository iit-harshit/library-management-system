import { Router } from "express";
import {
  createBookHandler,
  issueBookHandler,
  returnBookHandler,
  updateBookHandler,
} from "../controller/book.controller";
import { requiresUser } from "../middleware";

const router = Router();

router.post("/create", [requiresUser], createBookHandler);

router.patch("/update", [requiresUser], updateBookHandler);

router.post("/issue", [requiresUser], issueBookHandler);

router.post("/return ", [requiresUser], returnBookHandler);

export default router;
