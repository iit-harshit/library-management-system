import { FilterQuery, UpdateQuery } from "mongoose";
import Issue, { IssueDocument, IssueInput } from "../model/issue.model";

export async function createIssue(input: IssueInput) {
  try {
    return await Issue.create(input);
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function findIssue(input: FilterQuery<IssueDocument>) {
  return await Issue.findOne(input);
}

export async function updateIssue(
  filter: FilterQuery<IssueDocument>,
  update: UpdateQuery<IssueDocument>
) {
  return await Issue.findOneAndUpdate(filter, update);
}
