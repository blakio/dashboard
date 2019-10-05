import React, { useState, useContext } from 'react';
import TimeSheetContext from "../../../Context/State";

import './TimeSheetOptions.css';

function TimeSheetOptions(props) {

  const {
    isAdminMode
  } = useContext(TimeSheetContext);

  const [selected, setSelected] = useState(null);

  const select = (data) => {
    if(data !== selected){
      setSelected(data)
    } else {
      setSelected(null)
    }
  }

  const {
    title,
    options,
    action,
    dispatch
  } = props;

  return (<div className="timeSheetSideOptions flex">
    <div className="sideOptionHeading sectionHeading flex">
      <p>{title}</p>
      {isAdminMode && <i className="fas fa-plus-circle"></i>}
    </div>
    <div className="sideOptionBody flex">
      {options.sort().map((data, index) => (<div>
        <div
          onClick={() => select(index)}
          key={index}
          className={`tag tagLabel ${(selected === index) && "selected"}`}>
          {data}
          {isAdminMode && <i
            className="fas fa-minus-circle"
            onClick={() => dispatch({
              ...action,
              payload: data
            })}></i>}
        </div>
      </div>))}
    </div>
  </div>);
}

export default TimeSheetOptions;
