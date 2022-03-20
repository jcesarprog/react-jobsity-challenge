import React, { useEffect } from "react";
import dayjs from "dayjs";
import {gsap} from "gsap"
import { useAppContext } from "../contexts/AppContext";
import logo from "../assets/jobsity_logo_small.png"
import "../sass/navbar.scss";
export const Navbar = () => {
  const { monthIndex, setMonthIndex } = useAppContext();
  useEffect(()=>{
    gsap.from(".nav__logo",{opacity:0, delay:.5, duration: 2, ease: "linear"})
  },[])
  return (
    <nav>
      <div>
        <button
          className="nav__month-btn"
          onClick={() => setMonthIndex((curr) => curr - 1)}
        >
          <span className="material-icons">chevron_left</span>
        </button>
        <button
          className="nav__month-btn"
          onClick={() => setMonthIndex((curr) => curr + 1)}
        >
          <span className="material-icons">chevron_right</span>
        </button>
      </div>
      <button className="nav__month-btn nav__month-today"
      onClick={() => setMonthIndex(dayjs().month())}
      >
        <p className="">Today</p>
      </button>
      <h2 className="nav__month-title">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
      <div className="nav__logo">
        <img src={logo} alt="jobsity" />
        <p>jobsity</p>
      </div>
    </nav>
  );
};
