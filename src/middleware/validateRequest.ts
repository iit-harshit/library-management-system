import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../logger";

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Making request");
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (e) {
      // log.error(e);
      // return res.status(400).send(e.errors);
      log.error(<Error>e);
      return res.status(400).send((<Error>e).message);
    }
  };

export default validate;
