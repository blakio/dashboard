import React from 'react';
import './TimeSheet.css';

import TimeSheetOptions from "./TimeSheetOptions";

import {
  laborTypes,
  projectTypes,
  jobNumbers
} from "./data.js"

function TimeSheet() {

  const showMore = options => {
    console.log(options)
  }

  return (<div id="timesheet">
    <div id="middlePanelMiddle" className="flex">

      <div className="middlePanelMiddleChild">
        <TimeSheetOptions
          title="Labor Type"
          options={laborTypes}
          showMore={showMore}
        />
      </div>

      <div className="middlePanelMiddleChild">
        <TimeSheetOptions
          title="Project Type"
          options={projectTypes}
          showMore={showMore}
        />
      </div>

      <div className="middlePanelMiddleChild">
        <TimeSheetOptions
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
