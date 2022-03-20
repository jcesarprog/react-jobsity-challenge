// import { combineReducers} from 'redux';

// const reducers = {};

// export default combineReducers(reducers);
import {useReducer} from "react"
function savedEventsReducer(state, { type, payload }) {
    switch (type) {
      case "push":
        return [...state, payload];
      case "update":
        return state.map((evt) => (evt.id === payload.id ? payload : evt));
      case "delete":
        return state.filter((evt) => evt.id !== payload.id);
      default:
        return state;
    }
  }
  
  function initEvents() {
    const storageEvents = localStorage.getItem("savedEvents");
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : []
    return parsedEvents;
  }

  export function useEventReducer(){
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer,[],initEvents);
    return [savedEvents, dispatchCalEvent]
  }