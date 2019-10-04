import React from 'react';
import './RightPanel.css';

import RightPanelButton from "./RightPanelButton";

const sideButtons = [
  {
    name: "courtney rochelle",
    title: "project manager"
  },
  {
    name: "mitchell philmore",
    title: "chief informations officer"
  },
  {
    name: "isaiah harrison",
    title: "chief executive officer"
  }
]

function EmployeePanel() {
  return (<div id="rightPanel" className="flex">
    <div className="sectionHeading">
      <p>employees</p>
    </div>
    <div id="rightPanelLiner">
      {sideButtons.map((data, index) => <RightPanelButton key={index} {...data}/>)}
    </div>
  </div>);
}

export default EmployeePanel;
