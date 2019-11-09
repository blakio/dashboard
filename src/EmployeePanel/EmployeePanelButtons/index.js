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
    isAdminMode,
    jobNumbers,
    laborTypes
  } = useContext(TimeSheetContext);

  const addJobNumber = (selectedItems) => {
    const jobNumber = employee.jobNumber;
    jobNumbers.forEach(data => {
      if(data.number === jobNumber){
        selectedItems.jobNumbers = [data];
      }
    })
  }

  const addLaborTypes = (selectedItems) => {
    const laborType = employee.laborType;
    laborTypes.forEach(data => {
      if(data.name === laborType){
        selectedItems.laborTypes = [data];
      }
    })
  }

  const emptyJobNumber = (selectedItems) => selectedItems.jobNumbers = [];

  const emptyLaborTypes = (selectedItems) => selectedItems.laborTypes = [];

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

    if(!isAdminMode){
      employee.jobNumber ? addJobNumber(selectedEmployees) : emptyJobNumber(selectedEmployees);
      employee.laborType ? addLaborTypes(selectedEmployees) : emptyLaborTypes(selectedEmployees);
    }

    dispatch({
      type: Types.SET_SELECTED_ITEMS,
      payload: selectedEmployees
    })
  }

  const removeEmployee = () => {
    const newSelectedItems = Util.breakRefAndCopy(selectedItems);
    let index = null;
    let jobNumberIndex = null;
    let laborTypeIndex = null;
    newSelectedItems.employees.forEach((data, i) => {
      if(data.id === employee.id) index =  i;
    });

    if(!isAdminMode){
      newSelectedItems.jobNumbers.forEach((data, i) => {
        if(data.number === employee.jobNumber) jobNumberIndex =  i;
      });
      newSelectedItems.laborTypes.forEach((data, i) => {
        if(data.name === employee.laborType) laborTypeIndex =  i;
      });
      newSelectedItems.jobNumbers.splice(jobNumberIndex, 1);
      newSelectedItems.laborTypes.splice(laborTypeIndex, 1);
    }
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

  const iconStlye = {
    fontSize: "2em",
    color: "#008280"
  }

  let iconClass = "fas fa-pen-square";
  if(!isAdminMode){
    if(employee.isTech){
      iconClass = "fas fa-wrench";
    } else if(employee.isContractor) {
      iconClass = "fas fa-id-card-alt";
    } else {
      iconClass = "fas fa-user-tie";
    }
  }

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
    <div onClick={() => editEmployee(employee)}>
        <i style={iconStlye} className={iconClass}></i>
    </div>
  </div>);
}

export default EmployeePanelButtons;
