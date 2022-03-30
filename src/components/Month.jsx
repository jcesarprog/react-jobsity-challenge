import React from "react";
import { Day } from "./Day";
import "../sass/month.scss";
export const weekDays = [
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
      <div className="week-days" role="row">
        {weekDays.map((wDay, i) => (
          <div key={i} role="cell">{wDay}</div>
        ))}
      </div>
      <div className="month__container" role="grid" >
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
