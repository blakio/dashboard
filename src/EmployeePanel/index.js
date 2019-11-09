import React, { useState, useEffect, useContext } from 'react';
import Axios from "../Axios";

import './RightPanel.css';

import TimeSheetContext from "../Context/State";
import EmployeePanelButtons from "./EmployeePanelButtons";
import Types from "../Context/Types";
import Util from "../Util";
import logo from "../img/cwlogo.png"

function EmployeePanel() {

  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [travelTime, setTravelTime] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const {
    dispatch,
    employees,
    isAdminMode,
    isContractor,
    isTech
  } = useContext(TimeSheetContext);

  useEffect(() => {
    Axios.fetchEmployees(dispatch);
  }, []);

  const editEmployee = data => {
    setFullName(data.name);
    setJobTitle(data.jobTitle);
    setTravelTime(data.travelTime);
    setIsEditing({ id: data.id });
  }

  const resetInputs = () => {
    setFullName("");
    setJobTitle("");
    setTravelTime(0);
  }

  const edit = () => {
    dispatch({
      type: Types.UPDATE_EMPLOYEE,
      payload: {
        id: isEditing.id,
        name: fullName.toUpperCase(),
        jobTitle: jobTitle.toUpperCase(),
        isContractor: isContractor,
        fn: () => Axios.fetchEmployees(dispatch)
      }
    })
    setIsEditing(false);
    resetInputs();
  }

  const add = () => {
    Axios.post("employees", {
      jobTitle: jobTitle.toUpperCase(),
      name: fullName.toUpperCase(),
      isActive: true,
      travelTime: parseInt(travelTime),
      isContractor: isContractor,
      isTech: isTech
    }, obj => {
      Axios.fetchEmployees(dispatch);
    }, err => {
      dispatch({
        type: Types.OPEN_MESSAGE,
        payload: {
          type: "error",
          message: err
        }
      })
    });
    resetInputs();
  }

  const activeButtons = [];
  const deactivatedButtons = [];
  employees.map(data => {
    if(data.isActive){
      activeButtons.push(data)
    } else {
      deactivatedButtons.push(data)
    }
  })

  const submit = (e, buttonSubmit) => {
    const enterKeyOrSubmitButtonPressed = ((e && e.key === "Enter") || buttonSubmit);
    const fieldsEmpty = !fullName.trim().length || !jobTitle.trim().length;
    if(enterKeyOrSubmitButtonPressed && !fieldsEmpty) isEditing ? edit() : add();
  }

  return (<div id="rightPanel" className="flex">
    <img src={logo} style={{width: "100%", marginTop: 10}} />
    <div className="sectionHeading" onClick={() => isAdminMode && Axios.seed()}>
      <p className="timesheetEmployeeSectionTitle">employees</p>
    </div>
    {isAdminMode && <div className="employeeAdditionForm flex">
      <input
        className="addInput tag"
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChange={e => setFullName(e.target.value)}
        onKeyPress={submit}/>
      <input
        className="addInput tag"
        style={styles.input}
        placeholder="Job Title"
        value={jobTitle}
        onChange={e => setJobTitle(e.target.value)}
        onKeyPress={submit}/>
      <input
        className="addInput tag"
        style={styles.input}
        placeholder="Travel Time"
        type="number"
        value={travelTime}
        onChange={e => setTravelTime(e.target.value)}
        onKeyPress={submit}/>
      <div
        className="flex"
        style={{
          backgroundColor: "#008280",
          width: "90%",
          borderRadius: 4,
          marginBottom: 10
        }}
        onClick={() => submit(null, true)}>
        <p style={{margin: "0.6em"}}>SUBMIT</p>
      </div>

      <div
        style={{
          marginTop: 10,
          marginBottom: 10
        }}
        className="flex"
        onClick={() => {
          dispatch({
            type: Types.TOGGLE_IS_CONTRACTOR,
            payload: !isContractor
          });
        }}>
        {isContractor ? <i style={{ fontSize: "2em", color: "#008280", opacity: 0.6, textAlign: "center" }} className="fas fa-toggle-on"></i> :
                <i style={{ fontSize: "2em", color: "#a7a7a7", opacity: 0.6, textAlign: "center" }} className="fas fa-toggle-off"></i>}
        <p style={{color: "#fff", marginLeft: 6}} className="topBarText">CONTRACTOR</p>
      </div>

      <div
        style={{
          marginTop: 10,
          marginBottom: 10
        }}
        className="flex"
        onClick={() => {
          dispatch({
            type: Types.TOGGLE_IS_TECT,
            payload: !isTech
          });
        }}>
        {isTech ? <i style={{ fontSize: "2em", color: "#008280", opacity: 0.6, textAlign: "center" }} className="fas fa-toggle-on"></i> :
                <i style={{ fontSize: "2em", color: "#a7a7a7", opacity: 0.6, textAlign: "center" }} className="fas fa-toggle-off"></i>}
        <p style={{color: "#fff", marginLeft: 6}} className="topBarText">TECHNICIAN</p>
      </div>

    </div>}
    <div id="rightPanelLiner">
      {employees && activeButtons.map((data, index) => {
        return <EmployeePanelButtons
          key={index}
          editEmployee={editEmployee}
          selectedItemType="employees"
          employee={data}
          />
      })}
      {employees && isAdminMode && deactivatedButtons.map((data, index) => {
        if(!data.isActive && !isAdminMode) return null;
        return <EmployeePanelButtons
          key={index}
          editEmployee={editEmployee}
          selectedItemType="employees"
          employee={data}
          isDeactivated={true}
          />
      })}
    </div>
  </div>);
}

const styles = {
  input: {
    fontWeight: 400,
    border: "none",
    borderRadius: 0
  }
}

export default EmployeePanel;
