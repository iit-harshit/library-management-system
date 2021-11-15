import { Router } from "express";
import {
  createBookHandler,
  issueBookHandler,
  returnBookHandler,
  updateBookHandler,
} from "../controller/book.controller";
import { requiresUser, validateRequest } from "../middleware";
import {
  createBookSchema,
  updateBookSchema,
  issueBookSchema,
  returnBookSchema,
} from "../schema/book.schema";

const router = Router();

router.post(
  "/create",
  [requiresUser, validateRequest(createBookSchema)],
  createBookHandler
);

router.patch(
  "/update",
  [requiresUser, validateRequest(updateBookSchema)],
  updateBookHandler
);

router.post(
  "/issue",
  [requiresUser, validateRequest(issueBookSchema)],
  issueBookHandler
);

router.post(
  "/return",
  [requiresUser, validateRequest(returnBookSchema)],
  returnBookHandler
);

export default router;
