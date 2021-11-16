import { Request } from "express";
import { get } from "lodash";

export function getUser(req: Request) {
  return get(req, "user");
}

export function getUserId(req: Request) {
  return get(req, "user._id");
}
