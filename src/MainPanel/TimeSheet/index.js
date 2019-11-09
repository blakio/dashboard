import React, { useState, useEffect, useContext } from 'react';
import './TimeSheet.css';

import TimeSheetContext from "../../Context/State";
import TimeSheetOptions from "./TimeSheetOptions";
import Axios from "../../Axios";
import Toogle from "./Toogle";
import CSV from "./CSV";

import Types from "../../Context/Types";

function TimeSheet() {

  const {
    isAdminMode,
    isAdminLoggedIn,
    dispatch,
    laborTypes,
    jobNumbers,
    selectedItems,
    isDownloadScreen
  } = useContext(TimeSheetContext);

  useEffect(() => {
    Axios.fetchLaborTypes(dispatch);
    Axios.fetchJobNumbers(dispatch);
  }, []);

  const isArrayEmpty = (arr) => {
    return arr.length === 0;
  }

  const topButtons = [
    {
      text: "trash",
      icon: "fas fa-trash-alt",
      isVisable: isAdminMode,
      isActive: () => {
        const hasEmployeeSelected = selectedItems.employees.length;
        const hasLaborTypeSelected = selectedItems.laborTypes.length;
        const hasJobNumberSelected = selectedItems.jobNumbers.length;
        return hasEmployeeSelected || hasLaborTypeSelected || hasJobNumberSelected;
      },
      function: (isActive) => {
        if(!isActive) return;
        dispatch({
          type: Types.OPEN_MESSAGE,
          payload: {
            type: "warning",
            message: "ARE YOU SURE?"
          }
        })
      }
    },
    {
      text: "deactivate",
      icon: "fas fa-unlink",
      isVisable: isAdminMode,
      isActive: () => {
        const hasEmployeeSelected = selectedItems.employees.length;
        const hasLaborTypeSelected = selectedItems.laborTypes.length;
        const hasJobNumberSelected = selectedItems.jobNumbers.length;
        return hasEmployeeSelected || hasLaborTypeSelected || hasJobNumberSelected;
      },
      function: (isActive) => {
        if(!isActive) return;
        dispatch({
          type: Types.BULK_DEACTIVATE,
          payload: {
            fn: () => {
              Axios.fetchEmployees(dispatch)
              Axios.fetchLaborTypes(dispatch);
              Axios.fetchJobNumbers(dispatch);
            }
          },
        })
      }
    },
    {
      text: "activate",
      icon: "fas fa-link",
      isVisable: isAdminMode,
      isActive: () => {
        const hasEmployeeSelected = selectedItems.employees.length;
        const hasLaborTypeSelected = selectedItems.laborTypes.length;
        const hasJobNumberSelected = selectedItems.jobNumbers.length;
        return hasEmployeeSelected || hasLaborTypeSelected || hasJobNumberSelected;
      },
      function: (isActive) => {
        if(!isActive) return;
        dispatch({
          type: Types.BULK_ACTIVATE,
          payload: {
            fn: () => {
              Axios.fetchEmployees(dispatch)
              Axios.fetchLaborTypes(dispatch);
              Axios.fetchJobNumbers(dispatch);
            }
          },
        })
      }
    },
    {
      text: "clock in",
      icon: "fas fa-clock",
      isVisable: !isAdminMode,
      isActive: () => {
        const isEmployeeSelected = selectedItems.employees[0];
        const isContractor = isEmployeeSelected && selectedItems.employees[0].isContractor;
        const isTech = isEmployeeSelected && selectedItems.employees[0].isTech;
        const isLaborTypeSelected = selectedItems.laborTypes[0];
        const isJobNuumberSelected = selectedItems.jobNumbers[0];
        const isAlreadyClockedIn = isEmployeeSelected && selectedItems.employees[0].clockInTime;
        const hasClockedIn = isEmployeeSelected && isEmployeeSelected.clockInTime;

        if(isTech && !isAlreadyClockedIn && isJobNuumberSelected && isLaborTypeSelected){
          return true;
        } else if(isContractor && !isAlreadyClockedIn) {
          return true;
        } else if(!isTech && !isAlreadyClockedIn && isJobNuumberSelected) {
          return true;
        }
      },
      function: (isActive) => {
        if(!isActive) return;
        dispatch({
          type: Types.CLOCK_IN,
          payload: () => {
            Axios.fetchEmployees(dispatch);
            dispatch({
              type: Types.OPEN_MESSAGE,
              payload: {
                type: "confirmation",
                message: "CONFIRMED!"
              }
            })
          }
        })
      }
    },
    {
      text: "to lunch",
      icon: "fas fa-drumstick-bite",
      isVisable: !isAdminMode,
      isActive: () => (selectedItems.employees[0] && !selectedItems.employees[0].startLunch && selectedItems.employees[0].clockInTime),
      function: (isActive) => {
        if(!isActive) return;
        dispatch({
          type: Types.GO_TO_LUNCH,
          payload: () => {
            Axios.fetchEmployees(dispatch)
            dispatch({
              type: Types.OPEN_MESSAGE,
              payload: {
                type: "confirmation",
                message: "CONFIRMED!"
              }
            })
          }
        })
      }
    },
    {
      text: "from lunch",
      icon: "fas fa-bone",
      isVisable: !isAdminMode,
      isActive: () => (selectedItems.employees[0] && !selectedItems.employees[0].endLunch && selectedItems.employees[0].startLunch),
      function: (isActive) => {
        if(!isActive) return;
        dispatch({
          type: Types.BACK_FROM_LUNCH,
          payload: () => {
            Axios.fetchEmployees(dispatch);
            dispatch({
              type: Types.OPEN_MESSAGE,
              payload: {
                type: "confirmation",
                message: "CONFIRMED!"
              }
            })
          }
        })
      }
    },
    {
      text: "clock out",
      icon: "fas fa-clock",
      isVisable: !isAdminMode,
      isActive: () => (selectedItems.employees[0] && !selectedItems.employees[0].clockOutTime && selectedItems.employees[0].clockInTime),
      function: (isActive) => {
        if(!isActive) return;
        dispatch({
          type: Types.CLOCK_OUT,
          payload: () => {
            Axios.reset(selectedItems.employees[0].id, (obj) => {
              dispatch({
                type: Types.OPEN_MESSAGE,
                payload: {
                  type: "confirmation",
                  message: "CONFIRMED!"
                }
              });
              dispatch({
                type: Types.SET_EMPLOYEES,
                payload: obj.data
              });
            });
          }
        })
      }
    }
  ]

  const onClickToggle = () => dispatch({ type: Types.TOGGLE_ADMIN_MODE });

  const toggleButton = isAdminLoggedIn ? (<Toogle
    onClick={onClickToggle}
    parentStlyes={{ position: "absolute", top: "1.4em", right: "1.4em", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "6em" }}
    onStlyes={{ fontSize: "2em", color: "#008280", opacity: 0.6, textAlign: "center" }}
    offStlyes={{ fontSize: "2em", color: "#a7a7a7", opacity: 0.6, textAlign: "center" }}
    text="Edit"
    isOn={isAdminMode}
  />) : null;

  const isEmployeeSelected = selectedItems.employees[0];
  const isTechSelected = isEmployeeSelected && selectedItems.employees[0].isTech;
  const isContractorSelected = isEmployeeSelected && selectedItems.employees[0].isContractor;

  return (<div id="timesheet">
    {toggleButton}

    <div id="middlePanelMiddle" className="flex">

      {((isEmployeeSelected && !isContractorSelected) || isAdminMode) && <div className="middlePanelMiddleChild">
        <TimeSheetOptions
          title="Job Number"
          options={jobNumbers}
          name={"jobNumbers"}
          route="jobs"
          field="number"
          selectedItemType="jobNumbers"
          type="jobNumber"
        />
      </div>}

      {(((isEmployeeSelected && !isContractorSelected) && (isEmployeeSelected && isTechSelected)) || isAdminMode) && <div className="middlePanelMiddleChild">
        <TimeSheetOptions
          title="Labor Type"
          options={laborTypes}
          name={"laborTypes"}
          route="labortypes"
          field="name"
          selectedItemType="laborTypes"
          type="laborType"
        />
      </div>}

    </div>

    <div id="topbar" className="flex">
      {topButtons.map((data, index) => {
        if(!data.isVisable) return null;
        const className = `topBarButton flex ${data.isActive() && "active"}`;
        return (<div key={index} className="topBarButtonParent">
          <div
            className={className}
            onClick={() => data.function(data.isActive())}>
            <i className={data.icon}></i>
          </div>
          <p className="topBarText">{data.text}</p>
        </div>)
      })}
    </div>

    {isDownloadScreen && <CSV />}
  </div>);
}

export default TimeSheet;
