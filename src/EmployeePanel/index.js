import React, { useState, useEffect, useContext } from 'react';
import Axios from "../Axios";

import './RightPanel.css';

import TimeSheetContext from "../Context/State";

import EmployeePanelButtons from "./EmployeePanelButtons";

import Types from "../Context/Types";

function EmployeePanel() {

  const [selected, setSelected] = useState(null);
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const {
    deletions,
    dispatch,
    employees,
    isAdminMode,
    isAdminLoggedIn
  } = useContext(TimeSheetContext);

  useEffect(() => {
    dispatch({
      type: Types.GET_EMPLOYEES,
      payload: {
        fn: obj => {
          dispatch({
            type: Types.SET_EMPLOYEES,
            payload: obj.data
          })
        }
      }
    })
  }, [])

  const setState = (response) => {
    const { data } = response;
    const payload = [];
    data.forEach(data => {
      payload.push({
        id: data.id,
        name: data.name,
        jobTitle: data.jobTitle
      })
    });
    dispatch({
      type: Types.SET_EMPLOYEES,
      payload
    })
  }

  const select = (data) => {
    if(selected && (data.name === selected.name)){
      setSelected(null)
      dispatch({
        type: Types.TOGGLE_TYPE,
        payload: { type: "remove", name: "employees" }
      });
      if(isAdminMode && isAdminLoggedIn){
        dispatch({
          type: Types.UPDATE_DELETIONS,
          payload: {
            type: "remove",
            name: "employees",
            data: data
          }
        })
      }
    } else {
      setSelected(data)
      dispatch({
        type: Types.TOGGLE_TYPE,
        payload: { type: "add", name: "employees" }
      });
      if(isAdminMode && isAdminLoggedIn){
        dispatch({
          type: Types.UPDATE_DELETIONS,
          payload: {
            type: "add",
            name: "employees",
            data: data
          }
        })
      }
    }
  }

  const editEmployee = data => {
    setFullName(data.name);
    setJobTitle(data.jobTitle);
    setIsEditing({
      id: data.id
    })
  }

  const edit = () => {
    dispatch({
      type: Types.UPDATE_EMPLOYEE,
      payload: {
        id: isEditing.id,
        name: fullName.toUpperCase(),
        jobTitle: jobTitle.toUpperCase(),
        fn: () => {
          dispatch({
            type: Types.GET_EMPLOYEES,
            payload: {
              fn: obj => {
                dispatch({
                  type: Types.SET_EMPLOYEES,
                  payload: obj.data
                })
              }
            }
          })
        }
      }
    })
    setIsEditing(false);
    setFullName("");
    setJobTitle("");
  }

  const add = () => {
    Axios.post("employees", {
      jobTitle: jobTitle.toUpperCase(),
      name: fullName.toUpperCase(),
    }, obj => {
      Axios.get("employees", null, response => setState(response));
    });
    setFullName("");
    setJobTitle("");
  }

  return (<div id="rightPanel" className="flex">
    <div className="sectionHeading">
      <p className="timesheetEmployeeSectionTitle">employees</p>
    </div>
    {isAdminMode && isAdminLoggedIn && <div className="employeeAdditionForm flex">
      <input
        className="addInput tag"
        placeholder="Full Name"
        value={fullName}
        onChange={e => setFullName(e.target.value)}
        onKeyPress={e => {
          if(e.key === "Enter" && fullName.trim().length && jobTitle.trim().length){
            (isEditing) ? edit() : add();
          }
        }}/>
      <input
        className="addInput tag"
        placeholder="Job Title"
        value={jobTitle}
        onChange={e => setJobTitle(e.target.value)}
        onKeyPress={e => {
          if(e.key === "Enter" && fullName.trim().length && jobTitle.trim().length){
            (isEditing) ? edit() : add();
          }
        }}/>
    </div>}
    <div id="rightPanelLiner">
      {employees && employees.map((data, index) => {
        return <EmployeePanelButtons
          key={index}
          dispatch={dispatch}
          createActionType={Types.CREATE_EMPLOYEE}
          deleteActionType={Types.DELETE_EMPLOYEE}
          isAdminMode={isAdminMode && isAdminLoggedIn}
          {...data}
          selected={selected && (selected.name === data.name)}
          select={select}
          toggleType={Types.TOGGLE_TYPE}
          editEmployee={editEmployee}/>
      })}
    </div>
  </div>);
}

export default EmployeePanel;
