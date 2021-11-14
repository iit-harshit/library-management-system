import moment from "moment";

export function findDueDate({
  issueDate,
  duration,
}: {
  issueDate: Date;
  duration: number;
}) {
  return moment(issueDate).add(duration, "second").toDate();
}

export function generateDate(duration: number) {
  const issueDate = moment().toDate();
  const dueDate = findDueDate({ issueDate, duration });
  return { issueDate, dueDate };
}
