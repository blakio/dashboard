import React, { useContext } from 'react';
import './EmployeePanel.css';

import TimeSheetContext from "../../Context/State";
import Types from "../../Context/Types";

function EmployeePanelButtons(props) {

  const {
    name,
    jobTitle,
    id,
    select,
    selected,
    isAdminMode,
    isAdminLoggedIn,
    editEmployee,
    selectedItemType
  } = props;

  const {
    dispatch,
    selectedItems
  } = useContext(TimeSheetContext)

  const breakRefAndCopy = (obj) => JSON.parse(JSON.stringify(obj));

  const selectedEmployee = (name) => {
    const selectedEmployees = breakRefAndCopy(selectedItems);
    if(selectedEmployees[selectedItemType].includes(name)){
      const index = selectedEmployees[selectedItemType].indexOf(name);
      selectedEmployees[selectedItemType].splice(index, 1);
    } else {
      if(isAdminMode){
        selectedEmployees[selectedItemType].push(name)
      } else {
        selectedEmployees[selectedItemType] = [name];
      }
    }
    dispatch({
      type: Types.SET_SELECTED,
      payload: selectedEmployees
    })
  }

  const isSelected = selectedItems.employees.includes(name);

  return (<div
    className={`employeeButton flex ${isSelected && "selected"}`}
    onClick={() => {
      dispatch({
        type: Types.SELECT_EMPLOYEE,
        payload: id
      })
      selectedEmployee(name);
      select({name, id});
    }}>
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
          fontSize: "2.4em",
          color: "#008280"
        }} className="fas fa-pen-square"></i>
    </div>}
  </div>);
}

export default EmployeePanelButtons;
