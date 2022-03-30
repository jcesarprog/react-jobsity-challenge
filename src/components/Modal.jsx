import React from "react";
import { icons } from "../assets/icons";
import { useAppContext } from "../contexts/AppContext";
import { useModalHook } from "../hooks/useModalHook";
import "../sass/modal.scss";

export const Modal = ({ setOpenModal, day }) => {
  const {
    maxLengthInput,
    modalOverlayRef,
    modalContainerRef,
    errorEl,
    event,
    setEvent,
    eventSelected,
    dispatchCalEvent,
    clearEventAndCloseModel,
    handleAddEvent,
    renderWeather
  } = useModalHook(setOpenModal, day)
  const {setItemToBeDeleted} = useAppContext();
  return (
    <div
      className="modal__overlay"
      ref={modalOverlayRef}
      role="overlay"
      onClick={(e) =>
        !e.target.closest(".modal__container") && clearEventAndCloseModel()
      }
    >
      <div className="modal__container" ref={modalContainerRef} role="dialog">
        <div className="modal__header">
          <div className="modal__header-box">
            <span className="material-icons" data-testid="modal-icon">schedule</span>
            <h3 className="modal__header-day">{day.format("dddd, MMMM DD")}</h3>
          </div>
          <div className="modal__header-icons">
            <span className="material-icons" 
            data-testid="modal-close"
            onClick={clearEventAndCloseModel}>
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
            onBlur={(e) => renderWeather(e, day)}
            onChange={(e) =>
              setEvent((curr) => ({
                ...curr,
                city:
                  e.target.value.length <= maxLengthInput
                    ? e.target.value.toUpperCase()
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
            <p role="paragraph">Weather Forecast:</p>
            <p
            role="paragraph"
              ref={errorEl}
              className={`${event.status === "error" ? "error" : ""}`}
            >
              {event.forecast
                ? event.forecast
                : "Waiting a the city to search.."}
            </p>
            {event.status !== "error" && event.icon && (
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
                if (eventSelected) {
                  setItemToBeDeleted(eventSelected);
                  dispatchCalEvent({ type: "delete", payload: eventSelected });
                }
                clearEventAndCloseModel();
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
