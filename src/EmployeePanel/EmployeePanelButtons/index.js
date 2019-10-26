import React from 'react';
import './EmployeePanel.css';

import TimeSheetContext from "../../Context/State";


function EmployeePanelButtons(props) {

  const {
    name,
    jobTitle,
    id,
    select,
    selected,
    isAdminMode,
    isAdminLoggedIn,
    dispatch,
    editEmployee
  } = props;

  return (<div
    className={`employeeButton flex ${selected && "selected"}`}
    onClick={() => select({name, id})}>
    <div className="sideButtonDescription flex">
      <div className="sideButtonDescriptionTop sectionHeading">
        <p>{name}</p>
      </div>
      <div className="sideButtonDescriptionBottom sectionHeading">
        <p>{jobTitle}</p>
      </div>
    </div>
    {isAdminMode && <div
      onClick={() => editEmployee({
        name,
        jobTitle,
        id
      })}>
        <i style={{
          fontSize: "2em",
          color: "#008280"
        }} className="fas fa-edit"></i>
    </div>}
  </div>);
}

export default EmployeePanelButtons;
