import React,  { useContext } from 'react';
import './MainPanel.css';

import TimeSheet from "./TimeSheet";
import Confirmation from "./Confirmation";
import Error from "./Error";
import Warning from "./Warning";
import TimeSheetContext from "../Context/State";

function MainPanel() {

  const {
    message
  } = useContext(TimeSheetContext);

  return (<div id="middlePanel" className="flex">
    <div id="middlePanelLiner">
      <TimeSheet />
      {message.confirmation.status && <Confirmation />}
      {message.error.status && <Error />}
      {message.warning.status && <Warning />}
    </div>
  </div>);
}

export default MainPanel;
