import { Express, Request, Response } from "express";

import userRouter from "./routes/user.routes";
import sessionRouter from "./routes/session.routes";
import bookRouter from "./routes/book.routes";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.use("/user", userRouter);

  app.use("/session", sessionRouter);

  app.use("/book", bookRouter);
}
