import { Express, Request, Response } from "express";
import {
  createPostHandler,
  updatePostHandler,
  getPostHandler,
  deletePostHandler,
} from "./controller/post.controller";
import { createUserHandler } from "./controller/user.controller";
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { validateRequest, requiresUser } from "./middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";
import {
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
} from "./schema/post.schema";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register user
  app.post(
    "/user/create",
    validateRequest(createUserSchema),
    createUserHandler
  );

  // Login
  app.post(
    "/session/create",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );
}
