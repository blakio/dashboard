import React, { useState } from 'react';
import './EmployeePanel.css';

function EmployeePanelButtons(props) {

  const {
    name,
    title,
    id,
    select,
    selected,
    isAdminMode,
    dispatch,
    deleteActionType
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
      {isAdminMode && <i
        className="fas fa-times-circle"
        onClick={() => dispatch({
          type: deleteActionType,
          payload: id
        })}></i>}
    </div>
  </div>);
}

export default EmployeePanelButtons;
