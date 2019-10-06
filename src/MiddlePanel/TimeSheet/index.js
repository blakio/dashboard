import React, { useContext } from 'react';
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
  BACK_FROM_LUNCH
} from "../../Context/Types";

function TimeSheet() {

  const {
    isAdminMode,
    dispatch,
    laborTypes,
    projectTypes,
    jobNumbers
  } = useContext(TimeSheetContext);

  const topButtons = [
    {
      style: { backgroundColor: "red" },
      icon: "fas fa-trash-alt",
      function: () => dispatch({
        type: BULK_DELETE,
        payload: null
      })
    },
    {
      style: { backgroundColor: "#00cc00" },
      icon: "fas fa-door-open",
      function: () => dispatch({
        type: CLOCK_IN,
        payload: null
      })
    },
    {
      style: {
        backgroundColor: "#00cc00"
      },
      icon: "fas fa-door-closed",
      function: () => dispatch({
        type: CLOCK_OUT,
        payload: null
      })
    },
    {
      style: {
        backgroundColor: "#009999"
      },
      icon: "fas fa-drumstick-bite",
      function: () => dispatch({
        type: GO_TO_LUNCH,
        payload: null
      })
    },
    {
      style: {
        backgroundColor: "#009999"
      },
      icon: "fas fa-bone",
      function: () => dispatch({
        type: BACK_FROM_LUNCH,
        payload: null
      })
    }
  ]

  return (<div id="timesheet">
    {isAdminMode && <div id="topbar" className="flex">
      {topButtons.map(data => (
        <div
          className="topBarButton flex"
          style={data.style}
          onClick={data.function}>
          <i class={data.icon}></i>
        </div>
      ))}
    </div>}
    <div id="middlePanelMiddle" className="flex">

      <div className="middlePanelMiddleChild">
        <TimeSheetOptions
          title="Labor Type"
          options={laborTypes}
          createActionType={ CREATE_LABOR_TYPE }
          deleteActionType={ DELETE_LABOR_TYPE }
          name={"laborTypes"}
          type={UPDATE_DELETIONS}
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
