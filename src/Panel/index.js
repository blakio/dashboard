import React, { useState, useContext } from 'react';
import TimeSheetContext from "../Context/State";

import './Panel.css';

function Panel() {

  const {
    isAdminMode
  } = useContext(TimeSheetContext);

  const [selected, setSelected] = useState("clock");

  const hasSelected = (id) => {
    return id === selected
  }

  const icons = [
    { icon: "fas fa-clock", id: "clock" },
    { icon: "fas fa-address-book", id: "directory" }
  ];

  if(isAdminMode){
    icons.push({ icon: "fas fa-cloud-download-alt", id: "download" })
    icons.push({ icon: "fas fa-list-alt", id: "edit" })
  }


  return (<div id="leftPanel" className="flex">
    <div id="leftPanelLiner" className="flex">
      {icons.map((data, index) => {
        if(index === 0){
          return (<div key={index} onClick={() => setSelected(data.id)}>
            <i className={`${data.icon} sideIcon ${hasSelected(data.id) && "selected"}`} style={{marginTop: "4em"}}></i>
          </div>)
        }
        return (<div key={index} onClick={() => setSelected(data.id)}>
          <i className={`${data.icon} sideIcon ${hasSelected(data.id) && "selected"}`}></i>
        </div>)})}
    </div>
  </div>);
}

export default Panel;
