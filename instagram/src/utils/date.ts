import { format } from "timeago.js";

export const parseDate = (date: string) => {
  return format(date);
};
