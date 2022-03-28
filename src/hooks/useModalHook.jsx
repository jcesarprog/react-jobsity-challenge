import React, { useEffect, useState, useCallback } from 'react'
import {gsap} from 'gsap'
import { useAppContext } from '../contexts/AppContext';
import { visualCrossingService } from '../services';
export function useModalHook(setOpenModal, day){
    // This custom hook is just to shorten the modal component
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
    
      const errorEl = React.useRef();
    
      const clearEventAndCloseModel = useCallback(() => {
        setEventSelected(null);
        setOpenModal(false);
      },[setEventSelected, setOpenModal]);
    
      function renderWeather(e,day){
        if(e.target.value.length >0){
          visualCrossingService
            .getWeather(e.target.value, day.format("YYYY-MM-DD"))
            .then((data) => {
              // console.log(data);
              setEvent((curr) => ({
                ...curr,
                icon: data.days[0]?.icon,
                forecast: data.days[0]?.conditions,
                status: "ok",
                city: data?.resolvedAddress.split(',')[0].toUpperCase()
              }));
            })
            .catch((err) => {
              setEvent((curr) => ({
                ...curr,
                forecast: "City not found !",
                status: "error"
              }));
            });
          }else {
            setEvent((curr) => ({
              ...curr,
              forecast: "City not found !",
              status: "error"
            }));
          }
      }

      const handleAddEvent = () => {
        // handler for updating and saving
        const { 
          title, city, day, hour, minute, forecast, icon, status 
        } = event;
        if (status === "error" || !icon) {
          // Guard clause with TEXT UPDATE
          errorEl.current.classList.add("error");
          errorEl.current.innerText = "PLEASE ENTER A VALID CITY !";
          return;
        }
    
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
        clearEventAndCloseModel();
      };
    
      useEffect(() => {
        // to handle the closing when pressing Esc
        const handleEscape = (e) => e.key === "Escape" && clearEventAndCloseModel();
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
      }, [clearEventAndCloseModel]);
    
      useEffect(() => {
        // Animation of modal opening
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
    
      return {
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
      }
}