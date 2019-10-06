import React, { useState, useContext } from 'react';
import './RightPanel.css';

import TimeSheetContext from "../Context/State";

import EmployeePanelButtons from "./EmployeePanelButtons";

import {
  CREATE_EMPLOYEE,
  DELETE_EMPLOYEE
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

  const select = name => setSelected((name === selected) ? null : name);

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
      <p className="timesheetTitle">employees</p>
    </div>
    {isAdminMode && <div className="employeeAdditionForm flex">
      <input
        class="addInput tag"
        placeholder="Full Name"
        value={fullName}
        onChange={e => setFullName(e.target.value)}/>
      <input
        class="addInput tag"
        placeholder="Job Title"
        value={jobTitle}
        onChange={e => setJobTitle(e.target.value)}/>
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
          select={select}/>
      })}
    </div>
  </div>);
}

export default EmployeePanel;
