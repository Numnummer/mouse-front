import { addMonths, subMonths } from "date-fns";

export default function ({ today, setToday }) {
  return (
    <>
      <button
        onClick={() => {
          setToday(subMonths(today, 1));
        }}
      >
        {"<-"}
      </button>
      <button
        onClick={() => {
          setToday(addMonths(today, 1));
        }}
      >
        {"->"}
      </button>
    </>
  );
}
