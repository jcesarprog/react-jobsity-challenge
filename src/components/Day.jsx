import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useAppContext } from "../contexts/AppContext";
import { Slider } from "./Slider";
import "../sass/day.scss";

export const Day = ({ day }) => {
  const { monthIndex, setOpenModal, setDaySelected, savedEvents } =
    useAppContext();
  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    const events = savedEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [savedEvents, day]);

  const isWeekend = day.format("d") === "0" || day.format("d") === "6";
  const isOtherMonth =
    day.format("MM") !==
    dayjs(new Date(dayjs().year(), monthIndex)).format("MM");

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  }

  function getGrayBlueishColor() {
    let classToBeApplied = "";
    if (getCurrentDayClass()) return "";
    if (isOtherMonth) classToBeApplied += "grayish ";
    if (isWeekend) classToBeApplied += "blueish ";
    return classToBeApplied;
  }

  return (
    // Defined as a button to be treated like one, have tab and easier testing
    <button
      className="btn__day"
      onClick={(e) => {
        if (e.target.className !== "material-icons") {
          setDaySelected(day);
          setOpenModal(true);
        }
      }}
    >
      <div className={`day ${isWeekend ? "weekend" : ""}`}
      data-testid="day"
      >
        <span className={getCurrentDayClass()? "day-circle-today": ""} role={getCurrentDayClass()? "mark": ""}>
          <p className={getGrayBlueishColor()}
          role="paragraph"
          >{day.format("DD")}</p>
        </span>
        <div className="day__event">
          {dayEvents.length ? (
            <Slider dayEvents={dayEvents} setDayEvents={setDayEvents} />
          ) : null}
        </div>
      </div>
    </button>
  );
};
