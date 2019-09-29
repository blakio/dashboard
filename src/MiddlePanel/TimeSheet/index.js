import React from 'react';
import './TimeSheet.css';

import TimeSheetSideOptions from "./TimeSheetSideOptions";
import HourSlider from "./HourSlider";

function TimeSheet() {

  const jobNumbers = [56788, 39746, 32190, 97543, 93787];
  const jobTypes = ["engineer", "project manager", "sales", "quality assurance", "logistics"];

  return (<div id="timesheet">
    <div id="middlePanelTop" className="flex">
      <div id="middlePanelTopLeft" className="flex">
        <div id="middlePanelTopLeftTop" className="flex">It's time</div>
        <div id="middlePanelTopLeftBottom" className="flex">to clockin</div>
      </div>
      <div id="middlePanelTopRight" className="flex">
        <div>
          <p className="percentFilter">W</p>
          <p className="percentFilter selected">M</p>
        </div>
        <div>
          <p id="progressPercent">68%</p>
        </div>
      </div>
    </div>
    <div id="middlePanelMiddle" className="flex">
      <div className="middlePanelMiddleChild">
        <TimeSheetSideOptions
          title="Job Type"
          options={jobTypes}
        />
      </div>
      <div className="middlePanelMiddleChild flex">
        <div id="outterClockInButton" className="flex">
          <div id="clockInButton" className="sectionHeading flex">
            <p>clock in</p>
          </div>
        </div>
      </div>
      <div className="middlePanelMiddleChild">
        <TimeSheetSideOptions
          title="Job Number"
          options={jobNumbers}
        />
      </div>
    </div>
    <div id="middlePanelBottom" className="flex">
      <HourSlider />
    </div>
  </div>);
}

export default TimeSheet;
