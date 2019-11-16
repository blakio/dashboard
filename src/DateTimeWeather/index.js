import React, { useState, useEffect, useContext } from 'react';
import moment from "moment";

import TimeSheetContext from "../Context/State";
import Axios from "../Axios";

import Types from "../Context/Types";
import './DateTimeWeather.css';

function DateTimeWeather() {

  const [time, setTime] = useState(moment().format('MM/DD/YYYY HH:mm:ss'))

  useEffect(() => {
    function update() {
      setTime(moment().format('MM/DD/YYYY HH:mm:ss'))
    }
    setInterval(update, 1000);
  }, []);

  const {
    dispatch
  } = useContext(TimeSheetContext);

  return (<div id="dateTimeWeather" className="flex">
    <p>{time}</p>
  </div>);
}

export default DateTimeWeather;
