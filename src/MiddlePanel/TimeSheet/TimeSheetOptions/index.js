import React, { useState, useContext } from 'react';
import TimeSheetContext from "../../../Context/State";

import './TimeSheetOptions.css';

function TimeSheetOptions(props) {

  const [inputValue, setInputValue] = useState(null);

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
    createActionType,
    deleteActionType,
    dispatch
  } = props;

  return (<div className="timeSheetSideOptions flex">
    <div className="sideOptionHeading sectionHeading flex">
      {isAdminMode ?
        <input
          className="addInput tag"
          placeHolder={`add ${title}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}/> :
        <p className="timesheetTitle">{title}</p>
      }

      {isAdminMode && <i
        className="fas fa-plus-circle"
        onClick={() => {
          dispatch({
            type: createActionType,
            payload: inputValue
          });
          setInputValue("");
        }}></i>}
    </div>
    <div className="sideOptionBody flex">
      {options.sort().map((data, index) => (<div>
        <div
          onClick={() => select(index)}
          key={index}
          style={{paddingRight: isAdminMode ? "3.3em" : "auto"}}
          className={`tag tagLabel ${(selected === index) && "selected"}`}>
          {data}
          {isAdminMode && <i
            className="fas fa-times-circle"
            onClick={() => dispatch({
              type: deleteActionType,
              payload: data
            })}></i>}
        </div>
      </div>))}
    </div>
  </div>);
}

export default TimeSheetOptions;
