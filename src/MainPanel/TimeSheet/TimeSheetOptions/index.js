import React, { useState, useEffect, useContext } from 'react';
import TimeSheetContext from "../../../Context/State";
import Axios from "../../../Axios";
import Types from "../../../Context/Types";

import './TimeSheetOptions.css';

function TimeSheetOptions(props) {

  const {
    isAdminMode,
    isAdminLoggedIn,
    dispatch,
    deletions,
    selectedItems
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
    field,
    updateType,
    selectedItemType
  } = props;

  const breakRefAndCopy = (obj) => JSON.parse(JSON.stringify(obj));

  const selectItem = (name) => {
    const selected = breakRefAndCopy(selectedItems);
    if(selected[selectedItemType].includes(name)){
      const index = selected[selectedItemType].indexOf(name);
      selected[selectedItemType].splice(index, 1);
    } else {
      if(isAdminMode){
        selected[selectedItemType].push(name)
      } else {
        selected[selectedItemType] = [name];
      }
    }
    dispatch({
      type: Types.SET_SELECTED,
      payload: selected
    })
  }

  const [inputValue, setInputValue] = useState(null);
  const [selected, setSelected] = useState([""]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    setSelected([]);
    setSelectedId("");
    dispatch({
      type: Types.RESET_DELETIONS
    });
  }, [isAdminMode]);

  useEffect(() => {
    dispatch({
      type: updateType,
      payload: selectedId
    })
  }, [selected])

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
        setSelectedId(data[field])
        dispatch({
          type: toggleType,
          payload: { type: "add", name }
        });
      } else {
        setSelected([]);
        setSelectedId("")
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
            fontWeight: 400
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
          onClick={() => {
            selectItem(data[field])
            select(index, data)
          }}
          className={`tag tagLabel ${(selected.includes(index)) && "selected"}`}>
          {data[field]}
        </div>
      </div>))}
    </div>
  </div>);
}

export default TimeSheetOptions;
