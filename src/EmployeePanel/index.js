import React, { useState, useContext } from 'react';
import './RightPanel.css';

import TimeSheetContext from "../Context/State";

import EmployeePanelButtons from "./EmployeePanelButtons";

import {
  CREATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  TOGGLE_TYPE
} from "../Context/Types";

function EmployeePanel() {

  const [selected, setSelected] = useState(null);
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const {
    dispatch,
    employees,
    isAdminMode
  } = useContext(TimeSheetContext);

  const select = (name) => {
    if(name === selected){
      setSelected(null)
      dispatch({
        type: TOGGLE_TYPE,
        payload: { type: "remove", name: "employees" }
      });
    } else {
      setSelected(name)
      dispatch({
        type: TOGGLE_TYPE,
        payload: { type: "add", name: "employees" }
      });
    }
  }

  const submit = () => {
    if(fullName && jobTitle && fullName.length && jobTitle.length){
      dispatch({
        type: CREATE_EMPLOYEE,
        payload: {
          name: fullName.toUpperCase(),
          title: jobTitle.toUpperCase()
        }
      });
      setFullName("");
      setJobTitle("");
    }
  }

  return (<div id="rightPanel" className="flex">
    <div className="sectionHeading">
      <p className="timesheetEmployeeSectionTitle">employees</p>
    </div>
    {isAdminMode && <div className="employeeAdditionForm flex">
      <input
        class="addInput tag"
        placeholder="Full Name"
        value={fullName}
        onChange={e => setFullName(e.target.value)}
        onKeyPress={e => {
          if(e.key === "Enter" &&
            fullName.trim().length &&
            jobTitle.trim().length){
            dispatch({
              type: CREATE_EMPLOYEE,
              payload: {
                name: fullName.toUpperCase(),
                title: jobTitle.toUpperCase()
              }
            })
          }
        }}/>
      <input
        class="addInput tag"
        placeholder="Job Title"
        value={jobTitle}
        onChange={e => setJobTitle(e.target.value)}
        onKeyPress={e => {
          if(e.key === "Enter" &&
            fullName.trim().length &&
            jobTitle.trim().length){
            dispatch({
              type: CREATE_EMPLOYEE,
              payload: {
                name: fullName.toUpperCase(),
                title: jobTitle.toUpperCase()
              }
            })
          }
        }}/>
    </div>}
    <div id="rightPanelLiner">
      {employees.map((data, index) => {
        return <EmployeePanelButtons
          key={index}
          dispatch={dispatch}
          createActionType={CREATE_EMPLOYEE}
          deleteActionType={DELETE_EMPLOYEE}
          isAdminMode={isAdminMode}
          {...data}
          selected={selected === data.name}
          select={select}
          toggleType={TOGGLE_TYPE}/>
      })}
    </div>
  </div>);
}

export default EmployeePanel;
