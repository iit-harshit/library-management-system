import { Schema, model, Document } from "mongoose";
import { BookDocument } from "./book.model";
import { UserDocument } from "./user.model";

export interface IssueInput {
  to: UserDocument["_id"];
  by: UserDocument["_id"];
  book: BookDocument["_id"];
  issueDate: Date;
  dueDate: Date;
}

export interface IssueDocument extends IssueInput, Document {
  returnDate: Date;
  isReturn: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

const IssueSchema = new Schema({
  to: { type: Schema.Types.ObjectId, ref: "User", require: true },
  by: { type: Schema.Types.ObjectId, ref: "User", require: true },
  book: { type: Schema.Types.ObjectId, ref: "Book", require: true },
  issueDate: { type: Date, default: Date.now(), require: true },
  dueDate: { type: Date, default: Date.now(), require: true },
  isreturn: { type: Boolean, default: false, require: true },
  returnDate: { type: Date },
});

const Issue = model<IssueDocument>("Issue", IssueSchema);

export default Issue;
