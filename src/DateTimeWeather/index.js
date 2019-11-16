import React, { useState, useEffect, useContext } from 'react';
import moment from "moment";
import axios from "axios";

import TimeSheetContext from "../Context/State";
import Axios from "../Axios";

import Types from "../Context/Types";
import './DateTimeWeather.css';

function DateTimeWeather() {

  const [time, setTime] = useState(moment().format('MM/DD/YYYY HH:mm:ss'))
  const [temp, setTemp] = useState("")
  const [icon, setIcon] = useState("")

  useEffect(() => {
    function update() {
      setTime(moment().format('MM/DD/YYYY | HH:mm:ss'));
    }
    setInterval(update, 1000);
    const apiKey = "1001a1dcc738f2ecade5496fbf796f50";
    const cityId = "4562144&APPID";
    const string = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}=${apiKey}`
    axios.get(string).then(data => {
      const K = data.data.list[0].main.temp;
      const F = (K - 273.15) * (9/5) + 32;
      setTemp(`${F.toFixed(2)} F`);
      setIcon(data.data.list[0].weather[0].icon)
    })
  }, []);

  const {
    dispatch
  } = useContext(TimeSheetContext);

  return (<div id="dateTimeWeather" className="flex">
    <p>
      {time} {` | ${temp}`}
      <span>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
      </span>
    </p>
  </div>);
}

export default DateTimeWeather;
