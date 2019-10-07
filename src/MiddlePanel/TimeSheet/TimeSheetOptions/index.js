import React, { useState, useEffect, useContext } from 'react';
import TimeSheetContext from "../../../Context/State";

import './TimeSheetOptions.css';

function TimeSheetOptions(props) {

  const {
    isAdminMode,
    dispatch,
    deletions
  } = useContext(TimeSheetContext);

  const {
    title,
    options,
    createActionType,
    type,
    name,
    toggleType
  } = props;

  const [inputValue, setInputValue] = useState(null);
  const [selected, setSelected] = useState([null]);

  useEffect(() => {
    if(!Object.keys(deletions[name]).length){
      setSelected([null])
    }
  }, [deletions])

  const select = (index, data) => {
    if(isAdminMode){
      if(selected.includes(index)){
        const newSelected = [...selected];
        newSelected.splice(selected.indexOf(index), 1);
        setSelected(newSelected);
        dispatch({
          type,
          payload: {
            type: "remove",
            name,
            data
          }
        })
      } else {
        setSelected([...selected, index])
        dispatch({
          type,
          payload: {
            type: "add",
            name,
            data
          }
        })
      }
    } else {
      if(!selected.includes(index)){
        setSelected([index]);
        dispatch({
          type: toggleType,
          payload: { type: "add", name }
        });
      } else {
        setSelected([]);
        dispatch({
          type: toggleType,
          payload: { type: "remove", name }
        });
      }
    }
  }

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
    </div>
    <div className="sideOptionBody flex">
      {options.sort().map((data, index) => (<div>
        <div
          onClick={() => select(index, data)}
          key={index}
          className={`tag tagLabel ${(selected.includes(index)) && "selected"}`}>
          {data}
        </div>
      </div>))}
    </div>
  </div>);
}

export default TimeSheetOptions;
