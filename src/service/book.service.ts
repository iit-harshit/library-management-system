import { FilterQuery, UpdateQuery } from "mongoose";
import Book, { BookDocument, BookInput } from "../model/book.model";

export async function createBook(input: BookInput) {
  try {
    return await Book.create(input);
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function updateBook(
  filter: FilterQuery<BookDocument>,
  update: UpdateQuery<BookDocument>
) {
  try {
    return await Book.findOneAndUpdate(filter, update);
  } catch (e: any) {
    throw new Error(e.message);
  }
}
