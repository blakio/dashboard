import React, { useState } from 'react';
import './RightPanel.css';

import EmployeePanelButtons from "./EmployeePanelButtons";

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

  const [selected, setSelected] = useState(null);

  const select = name => setSelected((name === selected) ? null : name);

  return (<div id="rightPanel" className="flex">
    <div className="sectionHeading">
      <p>employees</p>
    </div>
    <div id="rightPanelLiner">
      {sideButtons.map((data, index) => {
        return <EmployeePanelButtons
          key={index}
          {...data}
          selected={selected === data.name}
          select={select}/>
      })}
    </div>
  </div>);
}

export default EmployeePanel;
