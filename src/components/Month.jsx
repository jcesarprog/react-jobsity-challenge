import React from "react";
import { Day } from "./Day";
import "../sass/month.scss";
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
export const Month = ({ month }) => {
  return (
    <>
      <div className="week-days">
        {weekDays.map((wDay, i) => (
          <div key={i}>{wDay}</div>
        ))}
      </div>
      <div className="month__container">
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day day={day} key={idx} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
