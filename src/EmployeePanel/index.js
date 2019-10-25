import React, { useState, useEffect, useContext } from 'react';
import Axios from "../Axios";

import './RightPanel.css';

import TimeSheetContext from "../Context/State";

import EmployeePanelButtons from "./EmployeePanelButtons";

import Types from "../Context/Types";

function EmployeePanel() {

  useEffect(() => {
    Axios.get("employees", null, response => setState(response));
  }, []);

  const [selected, setSelected] = useState(null);
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const {
    dispatch,
    employees,
    isAdminMode
  } = useContext(TimeSheetContext);

  const setState = (response) => {
    const { data } = response;
    const payload = [];
    data.forEach(data => {
      payload.push({
        id: data.id,
        name: data.name,
        title: data.jobTitle
      })
    });
    dispatch({
      type: Types.SET_EMPLOYEES,
      payload
    })
  }

  const select = (name) => {
    if(name === selected){
      setSelected(null)
      dispatch({
        type: Types.TOGGLE_TYPE,
        payload: { type: "remove", name: "employees" }
      });
    } else {
      setSelected(name)
      dispatch({
        type: Types.TOGGLE_TYPE,
        payload: { type: "add", name: "employees" }
      });
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
              type: Types.CREATE_EMPLOYEE,
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
          if(e.key === "Enter" && fullName.trim().length && jobTitle.trim().length){
            Axios.post("employees", {
              clockInTime: null,
              clockOutTime: null,
              isContractor: null,
              jobNumber: null,
              jobTitle: jobTitle.toUpperCase(),
              laborType: null,
              name: fullName.toUpperCase(),
              totalHrs: null
            }, obj => {
              Axios.get("employees", null, response => setState(response));
            });
          }
        }}/>
    </div>}
    <div id="rightPanelLiner">
      {employees.map((data, index) => {
        return <EmployeePanelButtons
          key={index}
          dispatch={dispatch}
          createActionType={Types.CREATE_EMPLOYEE}
          deleteActionType={Types.DELETE_EMPLOYEE}
          isAdminMode={isAdminMode}
          {...data}
          selected={selected === data.name}
          select={select}
          toggleType={Types.TOGGLE_TYPE}/>
      })}
    </div>
  </div>);
}

export default EmployeePanel;
