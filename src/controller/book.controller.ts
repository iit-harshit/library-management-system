import { Request, Response } from "express";
import { get } from "lodash";
import {
  createBook,
  issueBook,
  returnBook,
  updateBook,
} from "../service/book.service";

export async function createBookHandler(req: Request, res: Response) {
  try {
    const book = await createBook(req.body);
    return res.send(book);
  } catch (e: any) {
    return res.status(401).send(e);
  }
}

export async function updateBookHandler(req: Request, res: Response) {
  try {
    const bookId = get(req.body, "bookId");
    const updatedBook = await updateBook({ _id: bookId }, req.body);
    return res.send(updatedBook);
  } catch (e: any) {
    return res.status(401).send(e);
  }
}

export async function issueBookHandler(req: Request, res: Response) {
  try {
    const bookId = get(req.body, "bookId");
    const by = get(req, "user._id");
    const to = get(req.body, "to");
    const issueDetails = await issueBook({ bookId, to, by });
    return res.send(issueDetails);
  } catch (e: any) {
    return res.status(401).send(e);
  }
}

export async function returnBookHandler(req: Request, res: Response) {
  try {
    const bookId = get(req.body, "bookId");
    const by = get(req, "user._id");
    const to = get(req.body, "to");
    const issueDetails = await returnBook({ bookId, to });
    return res.send(issueDetails);
  } catch (e: any) {
    return res.status(401).send(e);
  }
}
