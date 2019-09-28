import React from 'react';
import './MiddlePanel.css';

import TimeSheet from "./TimeSheet";

function MiddlePanel() {
  return (<div id="middlePanel" className="flex">
    <div id="middlePanelLiner">
      <TimeSheet />
    </div>
  </div>);
}

export default MiddlePanel;
