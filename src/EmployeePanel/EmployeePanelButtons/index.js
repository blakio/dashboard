import React, { useState } from 'react';
import './EmployeePanel.css';

function EmployeePanelButtons(props) {

  const {
    name,
    title,
    select,
    selected
  } = props;

  return (<div
    className={`employeeButton flex ${selected && "selected"}`}
    onClick={() => select(name)}>
    <div className="sideButtonDescription flex">
      <div className="sideButtonDescriptionTop sectionHeading">
        <p>{name}</p>
      </div>
      <div className="sideButtonDescriptionBottom sectionHeading">
        <p>{title}</p>
      </div>
    </div>
  </div>);
}

export default EmployeePanelButtons;
