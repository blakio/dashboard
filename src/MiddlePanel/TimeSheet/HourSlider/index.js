import React from 'react';
import './HourSlider.css';

import HourBar from "./HourBar";

const timeData = [
  { hours: 6, day: 1}, { hours: 4, day: 2}, { hours: 1, day: 3}, { hours: 6, day: 4}, { hours: 7, day: 5}, { hours: 8, day: 6}, { hours: 7, day: 7}, { hours: 8, day: 8}, { hours: 9, day: 9}, { hours: 5, day: 10}, { hours: 6, day: 11},
  { hours: 7, day: 12}, { hours: 5, day: 13}, { hours: 8, day: 14}, { hours: 4, day: 15}, { hours: 8, day: 16}, { hours: 8, day: 17}, { hours: 2, day: 18}, { hours: 7, day: 19}, { hours: 9, day: 20}, { hours: 8, day: 21}, { hours: 8, day: 22},
  { hours: 1, day: 23}, { hours: 3, day: 24}, { hours: 8, day: 25}, { hours: 5, day: 26}, { hours: 8, day: 27}, { hours: 4, day: 28}, { hours: 5, day: 29}, { hours: 9, day: 30}, { hours: 9, day: 31}
]

function HourSlider(props) {
  return (<div id="hourSlider" className="flex">
    {/*<div id="hourTopBar" className="sectionHeading flex">
      <p>Hour View</p>
    </div>*/}
    <div id="hourBottom" className="invisible-scrollbar">
      <div id="horBarLiner">
        {timeData.map(data => <HourBar hours={data.hours} day={data.day} />)}
      </div>
    </div>
  </div>);
}

export default HourSlider;
