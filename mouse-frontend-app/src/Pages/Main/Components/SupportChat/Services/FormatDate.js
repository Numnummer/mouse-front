import { ru } from "date-fns/locale/ru";
import { formatDate } from "date-fns";

export default function formatMessageDate(date) {
  const parsedDate = new Date(date);
  return formatDate(parsedDate, "dd MMMM HH:mm", { locale: ru });
}
