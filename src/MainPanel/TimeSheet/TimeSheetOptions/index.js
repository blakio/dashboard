import React, { useState, useEffect, useContext } from 'react';
import TimeSheetContext from "../../../Context/State";
import Axios from "../../../Axios";

import './TimeSheetOptions.css';

function TimeSheetOptions(props) {

  const {
    isAdminMode,
    isAdminLoggedIn,
    dispatch,
    deletions
  } = useContext(TimeSheetContext);

  const {
    title,
    options,
    createActionType,
    type,
    name,
    toggleType,
    route,
    setFunction,
    field
  } = props;

  const [inputValue, setInputValue] = useState(null);
  const [selected, setSelected] = useState([null]);

  useEffect(() => {
    if(name && !Object.keys(deletions[name]).length){
      setSelected([null])
    }
  }, [deletions])

  const select = (index, data) => {
    if(isAdminMode && isAdminLoggedIn){
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
      {(isAdminMode && isAdminLoggedIn) ?
        <input
          className="addInput tag"
          placeholder={`add ${title}`}
          value={inputValue}
          style={{
            fontWeight: 500,
            fontSize: "1.2rem"
          }}
          onChange={e => {
            setInputValue(e.target.value);
          }}
          onKeyPress={e => {
            if(e.key === "Enter" && inputValue.trim().length){
              Axios.post(route, {
                [field]: inputValue.toUpperCase()
              }, () => {
                setInputValue("");
                Axios.get(route, null, response => setFunction(response));
              })
            }
          }}/> :
        <p className="timesheetTitle">{title}</p>
      }
    </div>
    <div className="sideOptionBody flex">
      {options.map((data, index) => (<div key={index}>
        <div
          onClick={() => select(index, data)}
          className={`tag tagLabel ${(selected.includes(index)) && "selected"}`}>
          {data[field]}
        </div>
      </div>))}
    </div>
  </div>);
}

export default TimeSheetOptions;
