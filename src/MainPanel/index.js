import React from 'react';
import './MainPanel.css';

import TimeSheet from "./TimeSheet";

function MainPanel() {
  return (<div id="middlePanel" className="flex">
    <div id="middlePanelLiner">
      <TimeSheet />
    </div>
  </div>);
}

export default MainPanel;
