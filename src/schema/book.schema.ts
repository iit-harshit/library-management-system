import { number, object, string } from "yup";

const bookSchema = {
  title: string().required("Enter the title"),
  author: string().required("Enter the author"),
  copies: number().required("Enter the number of total number of copies"),
  available: number().required("Enter the number of copies available"),
};

export const createBookSchema = object({
  body: object({ ...bookSchema }),
});

export const updateBookSchema = object({
  body: object({
    bookId: string().required("Enter the bookId"),
  }),
});

export const issueBookSchema = object({
  body: object({
    to: string().required("Enter the userID"),
    bookId: string().required("Enter the bookId"),
  }),
});

export const returnBookSchema = object({
  body: object({
    to: string().required("Enter the userID"),
    bookId: string().required("Enter the bookId"),
  }),
});
