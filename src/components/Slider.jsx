import React, { useState, useEffect } from "react";
import { icons } from "../assets/icons";
import { useAppContext } from "../contexts/AppContext";

import "../sass/slider.scss";
export const Slider = ({ dayEvents, setDayEvents }) => {
  const { setEventSelected, setOpenModal, itemToBeDeleted } = useAppContext();
  const [currEvent, setCurrEvent] = useState(0);
  const [smDown, setSmDown] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 420) {
      setSmDown(true);
    }
  }, []);

  useEffect(() => {
    if (itemToBeDeleted) {
      setDayEvents(
        dayEvents.filter((evt, i) => evt.title !== itemToBeDeleted.title)
      );
      setCurrEvent(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemToBeDeleted]);
  return (
    <div className="slider__container">
      {currEvent !== 0 && dayEvents[currEvent].title && (
        <button
          className="slider__container-btn-left btn"
          onClick={() => setCurrEvent((curr) => curr - 1)}
        >
          <span className="material-icons">chevron_left</span>
        </button>
      )}

      <div className="slider__container-events">
        <div
          className="day__event-event"
          onClick={() => {
            setEventSelected(dayEvents[currEvent]);
            setOpenModal(true);
          }}
        >
          <p>
            {dayEvents[currEvent].title.substring(0, 10) +
              (dayEvents[currEvent].title.length > 10 ? "..." : "")}
          </p>
          {!smDown && (
            <img
              src={icons[dayEvents[currEvent].icon.replaceAll("-", "_")]}
              alt="weather"
              className="forecast-icon"
            />
          )}
        </div>
      </div>
      {currEvent !== dayEvents.length - 1 && (
        <button
          className="slider__container-btn-right btn"
          onClick={() => setCurrEvent((curr) => curr + 1)}
        >
          <span className="material-icons">chevron_right</span>
        </button>
      )}
    </div>
  );
};
