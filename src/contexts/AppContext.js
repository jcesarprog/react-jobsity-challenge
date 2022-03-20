import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useEventReducer } from "../reducers";
const AppContext = React.createContext({
  // just for intellisense
  monthIndex: 0,
  setMonthIndex: (index) => {},
  openModal: false,
  setOpenModal: (bool) => {},
  daySelected: undefined,
  setDaySelected: (day) => {},
  dispatchCalEvent: ({type, payload}) => {},
  savedEvents: [],
  setEventSelected:() => {},
  eventSelected: null
});

export const useAppContext = () => React.useContext(AppContext);
export const AppContextProvider = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [openModal, setOpenModal] = useState(false);
  const [daySelected, setDaySelected] = useState(undefined);
  const [eventSelected, setEventSelected] = useState(null);
  const [savedEvents, dispatchCalEvent] = useEventReducer();
  
  useEffect(()=>{
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  },[savedEvents])

  const values = {
    monthIndex,
    setMonthIndex,
    openModal,
    setOpenModal,
    daySelected,
    setDaySelected,
    dispatchCalEvent,
    savedEvents,
    eventSelected,
    setEventSelected
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
