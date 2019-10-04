import React from 'react';
import './TimeSheet.css';

import TimeSheetSideOptions from "./TimeSheetSideOptions";

import {
  laborTypes,
  projectType,
  jobNumbers
} from "./data.js"

function TimeSheet() {

  const showMore = options => {
    console.log(options)
  }

  return (<div id="timesheet">
    <div id="middlePanelMiddle" className="flex">

      <div className="middlePanelMiddleChildLeft">
        <TimeSheetSideOptions
          title="Labor Type"
          options={laborTypes}
          showMore={showMore}
        />
      </div>

      <div className="middlePanelMiddleChildRight">
        <TimeSheetSideOptions
          title="Project Type"
          options={projectType}
          showMore={showMore}
        />
      </div>

      <div className="middlePanelMiddleChildRight">
        <TimeSheetSideOptions
          title="Job Number"
          options={jobNumbers}
          showMore={showMore}
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
