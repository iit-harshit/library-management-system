import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser, updateRole } from "../service/user.service";
import { getUserId } from "../utils/user.utils";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (e) {
    // log.error(e);
    return res.status(409).send((<Error>e).message);
  }
}

export async function updateRoleHandler(req: Request, res: Response) {
  try {
    const updaterId = getUserId(req);
    const updatedUser = await updateRole({ updaterId, updatee: req.body });
    return res.send(updatedUser);
  } catch (e) {
    // log.error(e);
    return res.status(409).send((<Error>e).message);
  }
}
