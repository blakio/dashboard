import React, { useState } from 'react';
import './Panel.css';

function Panel() {

  const [selected, setSelected] = useState("clock");

  // const select = (id) => {
  //   debugger
  //   setSelected(id)}
  // }

  const hasSelected = (id) => {
    return id === selected
  }

  const icons = [
    { icon: "fas fa-clock", id: "clock" },
    { icon: "fas fa-cloud-download-alt", id: "download" },
    { icon: "fas fa-address-book", id: "directory" }
  ];

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
