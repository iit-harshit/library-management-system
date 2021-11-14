import { Schema, model, Document } from "mongoose";
import { IssueDocument } from "./issue.model";

export interface BookInput {
  title: string;
  author: string;
  copies: number;
  available: Number;
  issued: IssueDocument[];
}

export interface BookDocument extends BookInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema({
  title: { type: String, require: true },
  author: { type: String, require: true },
  copies: { type: Number, require: true, default: 0 },
  available: { type: Number, require: true, default: 0 },
  issued: [{ type: Schema.Types.ObjectId, ref: "Issue" }],
});

const Book = model<BookDocument>("Book", BookSchema);

export default Book;
