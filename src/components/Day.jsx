import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "../sass/day.scss";
import { useAppContext } from "../contexts/AppContext";
import { icons } from "../assets/icons";

export const Day = ({ day }) => {
  const {
    monthIndex,
    setOpenModal,
    setDaySelected,
    savedEvents,
    setEventSelected
  } = useAppContext();
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
    <div
      className={`day ${isWeekend ? "weekend" : ""}`}
      onClick={() => {
        setDaySelected(day);
        setOpenModal(true);
      }}
    >
      <span className={`${getCurrentDayClass() && "day-circle-today"}`}>
        <p className={getGrayBlueishColor()}>{day.format("DD")}</p>
      </span>
      <div className="day__event">
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => {
              setEventSelected(evt);
              setOpenModal(true);
            }}
          >
            {evt.title.substring(0, 10) + (evt.title.length > 10 ? "..." : "")}
            <img
              src={icons[evt.icon.replaceAll("-", "_")]}
              alt="weather"
              className="forecast-icon"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
