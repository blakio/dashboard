import React, { useContext } from 'react';
import './EmployeePanel.css';

import TimeSheetContext from "../../Context/State";
import Types from "../../Context/Types";

import Util from "../../Util";

function EmployeePanelButtons(props) {

  const {
    editEmployee,
    selectedItemType,
    employee,
    isDeactivated
  } = props;

  const {
    dispatch,
    selectedItems,
    isAdminMode
  } = useContext(TimeSheetContext)

  const selectedEmployee = () => {
    const selectedEmployees = Util.breakRefAndCopy(selectedItems);
    const selectedIds = selectedItems.employees.map(data => data.id);

    if(selectedIds.includes(employee.id)){
      const index = selectedIds.indexOf(employee.id);
      selectedEmployees[selectedItemType].splice(index, 1);
    } else {
      if(isAdminMode){
        selectedEmployees[selectedItemType].push(employee)
      } else {
        selectedEmployees[selectedItemType] = [employee];
      }
    }
    dispatch({
      type: Types.SET_SELECTED_ITEMS,
      payload: selectedEmployees
    })
  }

  const removeEmployee = () => {
    const newSelectedItems = Util.breakRefAndCopy(selectedItems);
    let index = null;
    newSelectedItems.employees.forEach((data, i) => {
      if(data.id === employee.id) index =  i;
    });
    newSelectedItems.employees.splice(index, 1);
    dispatch({
      type: Types.SET_SELECTED_ITEMS,
      payload: newSelectedItems
    })
  }

  const click = () => (!selectedItems.employees.includes(employee)) ? selectedEmployee() : removeEmployee();

  const selectedIds = [];
  selectedItems.employees.forEach(data => {
    selectedIds.push(data.id)
  })

  const isSelected = selectedIds.includes(employee.id);
  const className = `employeeButton flex ${isSelected && "selected"}`;

  return (<div
    className={className}
    onClick={() => click()}>
    <div className="sideButtonDescription flex">
      <div className="sideButtonDescriptionTop sectionHeading">
        <p className={`${isDeactivated && "deactivatedEmployeeClass"}`}>{employee.name}</p>
      </div>
      <div className="sideButtonDescriptionBottom sectionHeading">
        <p className={`${isDeactivated && "deactivatedEmployeeClass"}`}>{employee.jobTitle}</p>
      </div>
    </div>
    {isAdminMode && <div
      onClick={() => editEmployee(employee)}>
        <i style={{
          fontSize: "2.4em",
          color: "#008280"
        }} className="fas fa-pen-square"></i>
    </div>}
  </div>);
}

export default EmployeePanelButtons;
