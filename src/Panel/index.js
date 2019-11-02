import React, { useState, useContext } from 'react';
import TimeSheetContext from "../Context/State";

import Types from "../Context/Types";

import './Panel.css';

function Panel() {

  const {
    dispatch,
    isAdminMode
  } = useContext(TimeSheetContext);

  const [selected, setSelected] = useState("clock");

  const hasSelected = (id) => {
    return id === selected
  }

  const icons = [
    {
      icon: "fas fa-clock",
      id: "clock",
      fn: () => {}
    },
    {
      icon: "fas fa-cloud-download-alt",
      id: "download",
      fn: () => {
        dispatch({
          type: Types.TOGGLE_DOWNLOAD_SCREEN,
          payload: true
        })
      }
    }
  ];


  return (<div id="leftPanel" className="flex">
    <div id="leftPanelLiner" className="flex">
      {icons.map((data, index) => {
        return (<div
          key={index}
          className={`iconContainer flex ${hasSelected(data.id) && "selected"}`}
          onClick={data.fn}
          style={{ marginTop: "5em" }}>
          <i className={`${data.icon} sideIcon`}></i>
        </div>)})}
    </div>
  </div>);
}

export default Panel;
