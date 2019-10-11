import React from 'react';
import './EmployeePanel.css';

import TimeSheetContext from "../../Context/State";


function EmployeePanelButtons(props) {

  const {
    name,
    title,
    id,
    select,
    selected,
    isAdminMode,
    dispatch
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
