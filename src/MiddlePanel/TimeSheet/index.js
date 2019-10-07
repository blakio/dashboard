import React, { useState, useEffect, useContext } from 'react';
import './TimeSheet.css';

import TimeSheetContext from "../../Context/State";

import TimeSheetOptions from "./TimeSheetOptions";
import {
  CREATE_LABOR_TYPE,
  CREATE_PROJECT_TYPE,
  CREATE_JOB_NUMBER,
  DELETE_LABOR_TYPE,
  DELETE_PROJECT_TYPE,
  DELETE_JOB_NUMBER,
  BULK_DELETE,
  UPDATE_DELETIONS,
  CLOCK_IN,
  CLOCK_OUT,
  GO_TO_LUNCH,
  BACK_FROM_LUNCH,
  TOGGLE_TYPE
} from "../../Context/Types";

function TimeSheet() {

  const {
    isAdminMode,
    isClockedIn,
    isAtLunch,
    dispatch,
    laborTypes,
    projectTypes,
    jobNumbers,
    clickedTypes
  } = useContext(TimeSheetContext);

  const [activeButtons, setActiveButtons] = useState([null]);

  useEffect(() => {
    const numberOfFieldsBeforeClockIn = 4;
    if(clickedTypes.length === numberOfFieldsBeforeClockIn){
      setActiveButtons([...activeButtons, "clock in"])
    } else {
      const newActiveButtons = JSON.parse(JSON.stringify(activeButtons));
      newActiveButtons.splice(activeButtons.indexOf("clock in"), 1);
      setActiveButtons(newActiveButtons);
    }
  }, [clickedTypes])

  const topButtons = [
    {
      isAdminButton: true,
      text: "trash",
      style: { backgroundColor: (activeButtons.includes("trash")) ? "#c60000" : "#ece9fa" },
      icon: "fas fa-trash-alt",
      function: () => dispatch({
        type: BULK_DELETE,
        payload: null
      })
    },
    {
      isAdminButton: false,
      text: "clock in",
      style: { backgroundColor: (activeButtons.includes("clock in")) ? "#009e00" : "#ece9fa" },
      icon: "fas fa-door-open",
      function: () => dispatch({
        type: CLOCK_IN,
        payload: null
      })
    },
    {
      isAdminButton: false,
      text: "clock out",
      style: { backgroundColor: (activeButtons.includes("clock out")) ? "#009e00" : "#ece9fa" },
      icon: "fas fa-door-closed",
      function: () => dispatch({
        type: CLOCK_OUT,
        payload: null
      })
    },
    {
      isAdminButton: false,
      text: "to lunch",
      style: { backgroundColor: (activeButtons.includes("to lunch")) ? "#007777" : "#ece9fa" },
      icon: "fas fa-drumstick-bite",
      function: () => dispatch({
        type: GO_TO_LUNCH,
        payload: null
      })
    },
    {
      isAdminButton: false,
      text: "from lunch",
      style: { backgroundColor: (activeButtons.includes("from lunch")) ? "#007777" : "#ece9fa" },
      icon: "fas fa-bone",
      function: () => dispatch({
        type: BACK_FROM_LUNCH,
        payload: null
      })
    }
  ]

  return (<div id="timesheet">
    <div id="topbar" className="flex">
      {topButtons.map(data => {

        const isAdminButtonButNotOnAdminMode = data.isAdminButton && !isAdminMode;
        const removeClockedInButton = (data.text === "clock in") && (isClockedIn || isAtLunch);
        const removeClockedOutButton = (data.text === "clock out") && !isClockedIn;
        const removeToLunchButton = (data.text === "to lunch") && (!isClockedIn || isAtLunch);
        const removeFromLunchButton = (data.text === "from lunch") && (!isClockedIn || !isAtLunch);

        if(isAdminButtonButNotOnAdminMode ||
          removeClockedInButton ||
          removeClockedOutButton ||
          removeToLunchButton ||
          removeFromLunchButton){
          return <div></div>
        }
        return (<div>
          <div
            className="topBarButton flex"
            style={data.style}
            onClick={data.function}>
            <i class={data.icon}></i>
          </div>
          <p className="topBarText">{data.text}</p>
        </div>)
      })}
    </div>
    <div id="middlePanelMiddle" className="flex">

      <div className="middlePanelMiddleChild">
        <TimeSheetOptions
          title="Labor Type"
          options={laborTypes}
          createActionType={ CREATE_LABOR_TYPE }
          deleteActionType={ DELETE_LABOR_TYPE }
          name={"laborTypes"}
          type={UPDATE_DELETIONS}
          toggleType={TOGGLE_TYPE}
          dispatch={dispatch}
        />
      </div>

      <div className="middlePanelMiddleChild">
        <TimeSheetOptions
          title="Project Type"
          options={projectTypes}
          createActionType={ CREATE_PROJECT_TYPE }
          deleteActionType={ DELETE_PROJECT_TYPE }
          name={"projectTypes"}
          type={UPDATE_DELETIONS}
          toggleType={TOGGLE_TYPE}
          dispatch={dispatch}
        />
      </div>

      <div className="middlePanelMiddleChild">
        <TimeSheetOptions
          title="Job Number"
          options={jobNumbers}
          createActionType={ CREATE_JOB_NUMBER }
          deleteActionType={ DELETE_JOB_NUMBER }
          name={"jobNumbers"}
          type={UPDATE_DELETIONS}
          toggleType={TOGGLE_TYPE}
          dispatch={dispatch}
        />
      </div>

    </div>
  </div>);
}

export default TimeSheet;


// <div className="middlePanelMiddleChild flex">
//   <div id="outterClockInButton" className="flex">
//     <div id="clockInButton" className="sectionHeading flex">
//       <p>clock in</p>
//     </div>
//   </div>
// </div>
