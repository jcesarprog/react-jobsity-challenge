/* eslint-disable jsx-a11y/aria-role */
import React from "react";
import { useAppContext } from "../contexts/AppContext";

import { Navbar, Month, Modal } from "../components";
import { getMonth } from "../util/utils";

import "../sass/calendar.scss";

function Calendar(props) {
  // your calendar implementation Goes here!
  // Be creative

  const { monthIndex, openModal, setOpenModal, daySelected } = useAppContext();
  return (
    <div className="container" role="section">
      <Navbar />
      <main role="section" >
        <Month month={getMonth(monthIndex)} />
      </main>
      <footer>
      @2022 JULIO TEIXEIRA, ALL RIGHTS RESERVED!
      </footer>
      {openModal && <Modal setOpenModal={setOpenModal} day={daySelected} />}
    </div>
  );
}

export default Calendar;
