import { Schema, model, Document } from "mongoose";
import { BookDocument } from "./book.model";
import { UserDocument } from "./user.model";

export interface IssueInput {
  to: UserDocument["_id"];
  by: UserDocument["_id"];
  book: BookDocument["_id"];
  issuedDate: Date;
  dueDate: Date;
}

export interface IssueDocument extends IssueInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const IssueSchema = new Schema({
  to: { type: Schema.Types.ObjectId, ref: "User" },
  by: { type: Schema.Types.ObjectId, ref: "User" },
  book: { type: Schema.Types.ObjectId, ref: "Book" },
  issuedDate: { type: Date, default: Date.now() },
  dueDate: { type: Date, default: Date.now() },
});

const Issue = model<IssueDocument>("Issue", IssueSchema);

export default Issue;
