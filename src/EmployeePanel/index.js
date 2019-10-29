import React, { useState, useEffect, useContext } from 'react';
import Axios from "../Axios";

import './RightPanel.css';

import TimeSheetContext from "../Context/State";
import EmployeePanelButtons from "./EmployeePanelButtons";
import Types from "../Context/Types";
import Util from "../Util";

function EmployeePanel() {

  const [selected, setSelected] = useState([]);
  const [selectedId, setSelectedId] = useState("");
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
    setSelected([]);
    setSelectedId("");
    dispatch({
      type: Types.RESET_DELETIONS
    });
  }, [isAdminMode]);

  useEffect(() => {
    let employee;
    employees.forEach(data => {
      if(data.id === selectedId){
        employee = data;
      }
    })

    if(!employee){
      return dispatch({
        type: Types.SET_ACTION_BUTTONS,
        payload: []
      })
    }

    const isClockedIn = Util.isEmployeeClockedIn(employee);
    const isAtLunch = Util.isEmployeeAtLunch(employee);
    const isFromLunch = Util.isEmployeeFromLunch(employee);
    const isClockedOut = Util.isEmployeeClockedOut(employee);

    const activeButtonsList = Util.getActionButtons(isClockedIn, isAtLunch, isFromLunch, isClockedOut)

    dispatch({
      type: Types.SET_ACTION_BUTTONS,
      payload: activeButtonsList
    })

  }, [selectedId])

  useEffect(() => {
    dispatch({
      type: Types.SELECT_EMPLOYEE,
      payload: selectedId
    })
  }, [selected])

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
    if(selected && (selected.includes(data.name))){

      const indexOfName = selected.indexOf(data.name);
      const newSelected = [...selected];
      newSelected.splice(indexOfName, 1);
      setSelected(newSelected);
      setSelectedId(false)

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

      const newSelected = (!selected.includes(data.name) && isAdminMode) ? [...selected, data.name] : [data.name];
      setSelected(newSelected);
      setSelectedId(data.id)

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
        style={{
          fontWeight: 400,
          border: "none",
          borderRadius: 0
        }}
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
        style={{
          fontWeight: 400,
          border: "none",
          borderRadius: 0
        }}
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
          selected={selected && (selected.includes(data.name))}
          select={select}
          toggleType={Types.TOGGLE_TYPE}
          editEmployee={editEmployee}/>
      })}
    </div>
  </div>);
}

export default EmployeePanel;
