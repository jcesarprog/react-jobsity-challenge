import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { useAppContext } from "../contexts/AppContext";
import "../sass/modal.scss";
import { visualCrossingService } from "../services";
import { icons } from "../assets/icons";

export const Modal = ({ setOpenModal, day }) => {
  const { dispatchCalEvent, eventSelected, setEventSelected } = useAppContext();

  const [event, setEvent] = useState({
    title: eventSelected?.title || "",
    city: eventSelected?.city || "",
    day,
    hour: eventSelected?.hour || 0,
    minute: eventSelected?.minute || 0,
    forecast: eventSelected?.forecast || null,
    icon: eventSelected?.icon || null
  });

  const modalOverlayRef = React.useRef();
  const modalContainerRef = React.useRef();
  const maxLengthInput = 30;

  const handleAddEvent = () => {
    const { 
      title, city, day, hour, minute, forecast, icon 
    } = event;
    const calendarEvent = {
      title,
      city,
      day: day.valueOf(),
      hour,
      minute,
      forecast,
      icon,
      id: eventSelected?.id || Date.now()
    };
    if (eventSelected)
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    else dispatchCalEvent({ type: "push", payload: calendarEvent });
    setEventSelected(null);
    setOpenModal(false);
  };

  useEffect(() => {
    const handleEscape = (e) => e.key === "Escape" && setOpenModal(false);
    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [setOpenModal]);

  React.useEffect(() => {
    gsap
      .timeline()
      .to(modalOverlayRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "easeIn"
      })
      .to(modalContainerRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "easeIn"
      });
  }, []);

  return (
    <div
      className="modal__overlay"
      ref={modalOverlayRef}
      onClick={(e) =>
        !e.target.closest(".modal__container") && setOpenModal(false)
      }
    >
      <div className="modal__container" ref={modalContainerRef}>
        <div className="modal__header">
          <div className="modal__header-box">
            <span className="material-icons">schedule</span>
            <h3 className="modal__header-day">{day.format("dddd, MMMM DD")}</h3>
          </div>
          <div className="modal__header-icons">
            <span
              className="material-icons"
              onClick={() => setOpenModal(false)}
            >
              close
            </span>
          </div>
        </div>
        <div className="modal__form">
          <div></div>
          <input
            type="text"
            name="title"
            placeholder="Add a title"
            value={event.title}
            onChange={(e) =>
              setEvent((curr) => ({
                ...curr,
                title:
                  e.target.value.length <= maxLengthInput
                    ? e.target.value
                    : curr.title
              }))
            }
            className="modal__form-input-title"
          />
          <input
            type="text"
            name="city"
            placeholder="Add a city"
            value={event.city}
            onBlur={(e) => {
              visualCrossingService
                .getWeather(e.target.value, day.format("YYYY-MM-DD"))
                .then((data) => {
                  setEvent((curr) => ({
                    ...curr,
                    icon: data?.icon,
                    forecast: data?.conditions
                  }));
                })
                .catch((err) => {
                  setEvent((curr) => ({
                    ...curr,
                    forecast: "City not found!"
                  }));
                });
            }}
            onChange={(e) =>
              setEvent((curr) => ({
                ...curr,
                city:
                  e.target.value.length <= maxLengthInput
                    ? e.target.value
                    : curr.city
              }))
            }
            className="modal__form-input-city"
          />
          <div className="modal__form-time-box">
            <input
              type="number"
              name="hour"
              value={event.hour}
              onChange={(e) =>
                setEvent((curr) => ({ ...curr, hour: e.target.value }))
              }
              className="modal__form-input-hour"
              min={0}
              max={23}
            />
            <span className="modal__form-time-divisor">:</span>
            <input
              type="number"
              name="minute"
              value={event.minute}
              onChange={(e) =>
                setEvent((curr) => ({ ...curr, minute: e.target.value }))
              }
              className="modal__form-input-minute"
              min={0}
              max={59}
            />
          </div>
          <div className="modal__form-forecast-box">
            <p>Weather Forecast:</p>
            <p>
              {event.forecast
                ? event.forecast
                : "Waiting for the city to search.."}
            </p>
            {event.icon && (
              <img
                src={icons[event.icon.replaceAll("-", "_")]}
                alt="weather"
                className="forecast-icon"
              />
            )}
          </div>
          <div className="modal__form-btns">
            <button
              className="btn-del"
              onClick={() => {
                dispatchCalEvent({ type: "delete", payload: eventSelected });
                setEventSelected(null);
                setOpenModal(false);
              }}
            >
              {eventSelected ? "Delete" : "Cancel"}{" "}
              <span className="material-icons">delete</span>
            </button>
            <button className="btn-save" onClick={handleAddEvent}>
              {eventSelected ? "Update" : "Save"}
              <span className="material-icons">
                {eventSelected ? "edit" : "save"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
