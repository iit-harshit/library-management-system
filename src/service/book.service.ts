import { FilterQuery, UpdateQuery } from "mongoose";
import Book, { BookDocument, BookInput } from "../model/book.model";
import { UserDocument } from "../model/user.model";
import { generateDate } from "../utils/time.utils";
import { createIssue, updateIssue } from "./issue.service";

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
    return await Book.findOneAndUpdate(filter, update, { new: true });
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function issueBook({
  bookId,
  to,
  by,
}: {
  bookId: BookDocument["_id"];
  to: UserDocument["_id"];
  by: UserDocument["_id"];
}) {
  try {
    const book = await Book.findById(bookId)
      .select({ available: 1, maxIssueDuration: 1 })
      .lean();

    if (!book) {
      throw new Error("Not Found");
    }

    if (book.available < 1) {
      throw new Error("Book is not availabe");
    }

    const { issueDate, dueDate } = generateDate(book.maxIssueDuration);

    const issue = await createIssue({
      to,
      by,
      book: bookId,
      issueDate,
      dueDate,
    });

    const updatedBook = await Book.findOneAndUpdate(
      { _id: bookId },
      {
        $addToSet: { issue: issue._id },
        $inc: { quantity: -1, available: 1 },
      }
    );

    return issue;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function returnBook({
  bookId,
  to,
}: {
  bookId: BookDocument["_id"];
  to: UserDocument["_id"];
}) {
  try {
    const issue = await updateIssue(
      { book: bookId, to },
      { isreturn: true, returnDate: new Date() }
    );
    if (!issue) {
      throw new Error("Invalid return");
    }

    const updatedBook = await Book.findOneAndUpdate(
      { _id: bookId },
      { $pull: { issue: issue._id }, $inc: { quantity: 1, available: 1 } }
    );

    return issue;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
