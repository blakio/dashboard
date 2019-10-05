import React, { useState, useContext } from 'react';
import './RightPanel.css';

import TimeSheetContext from "../Context/State";

import EmployeePanelButtons from "./EmployeePanelButtons";

import {
  CREATE_EMPLOYEE,
  DELETE_EMPLOYEE
} from "../Context/Types";

function EmployeePanel() {

  const [selected, setSelected] = useState(null);

  const {
    dispatch,
    employees,
    isAdminMode
  } = useContext(TimeSheetContext);

  const select = name => setSelected((name === selected) ? null : name);

  return (<div id="rightPanel" className="flex">
    <div className="sectionHeading">
      <p>employees</p>
    </div>
    <div id="rightPanelLiner">
      {employees.map((data, index) => {
        return <EmployeePanelButtons
          key={index}
          dispatch={dispatch}
          createActionType={CREATE_EMPLOYEE}
          deleteActionType={DELETE_EMPLOYEE}
          isAdminMode={isAdminMode}
          {...data}
          selected={selected === data.name}
          select={select}/>
      })}
    </div>
  </div>);
}

export default EmployeePanel;
