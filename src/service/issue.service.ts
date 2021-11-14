import Issue, { IssueInput } from "../model/issue.model";

export async function createIssue(input: IssueInput) {
  try {
    return await Issue.create(input);
  } catch (e: any) {
    throw new Error(e.message);
  }
}
