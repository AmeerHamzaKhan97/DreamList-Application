import { format, formatDistanceToNow } from "date-fns";

export function fDateTime(date) {
  return format(new Date(date), "MMM dd, yyyy ");
}
