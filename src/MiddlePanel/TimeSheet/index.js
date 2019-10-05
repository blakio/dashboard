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
  DELETE_JOB_NUMBER
} from "../../Context/Types";

function TimeSheet() {

  const {
    dispatch,
    laborTypes,
    projectTypes,
    jobNumbers
  } = useContext(TimeSheetContext);

  return (<div id="timesheet">
    <div id="middlePanelMiddle" className="flex">

      <div className="middlePanelMiddleChild">
        <TimeSheetOptions
          title="Labor Type"
          options={laborTypes}
          createActionType={ CREATE_LABOR_TYPE }
          deleteActionType={ DELETE_LABOR_TYPE }
          dispatch={dispatch}
        />
      </div>

      <div className="middlePanelMiddleChild">
        <TimeSheetOptions
          title="Project Type"
          options={projectTypes}
          createActionType={ CREATE_PROJECT_TYPE }
          deleteActionType={ DELETE_PROJECT_TYPE }
          dispatch={dispatch}
        />
      </div>

      <div className="middlePanelMiddleChild">
        <TimeSheetOptions
          title="Job Number"
          options={jobNumbers}
          createActionType={ CREATE_JOB_NUMBER }
          deleteActionType={ DELETE_JOB_NUMBER }
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
