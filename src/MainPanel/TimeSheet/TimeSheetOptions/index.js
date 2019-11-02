import React, { useState, useEffect, useContext } from 'react';
import TimeSheetContext from "../../../Context/State";
import Axios from "../../../Axios";
import Types from "../../../Context/Types";
import Util from "../../../Util";

import './TimeSheetOptions.css';

function TimeSheetOptions(props) {

  const {
    isAdminMode,
    dispatch,
    selectedItems
  } = useContext(TimeSheetContext);

  const {
    title,
    options,
    name,
    route,
    field,
    selectedItemType,
    type
  } = props;

  const selectItem = (data) => {
    const selected = Util.breakRefAndCopy(selectedItems);
    const selectedIds = selectedItems[selectedItemType].map(data => data.id);

    if(selectedIds.includes(data.id)){
      const index = selectedIds.indexOf(data.id);
      selected[selectedItemType].splice(index, 1);
    } else {
      if(isAdminMode){
        selected[selectedItemType].push(data)
      } else {
        selected[selectedItemType] = [data];
      }
    }
    dispatch({
      type: Types.SET_SELECTED_ITEMS,
      payload: selected
    })
  }

  const [inputValue, setInputValue] = useState(null);

  const activeButtons = [];
  const deactivatedButtons = [];
  options.forEach(data => (data.isActive) ? activeButtons.push(data) : deactivatedButtons.push(data));

  return (<div className="timeSheetSideOptions flex">
    <div className="sideOptionHeading sectionHeading flex">
      {isAdminMode ?
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
                [field]: inputValue.toUpperCase(),
                isActive: true
              }, () => {
                setInputValue("");
                Axios.fetchLaborTypes(dispatch);
                Axios.fetchJobNumbers(dispatch);
              })
            }
          }}/> :
        <p className="timesheetTitle">{title}</p>
      }
    </div>
    <div className="sideOptionBody flex">
      {activeButtons.map((data, index) => {

        const adminClass = isAdminMode && "activeClass";
        const selectedIds = selectedItems[name].map(data => data.id);
        const isSelected = selectedIds.includes(data.id) || (!isAdminMode && (selectedItems.employees[0][type] === data[field]));

        const className = `tag tagLabel ${adminClass} ${isSelected && "selected"}`;

        return (<div key={index}>
          <div
            onClick={() => selectItem(data) }
            className={className}>
            {data[field]}
          </div>
        </div>)})}
      {isAdminMode && deactivatedButtons.map((data, index) => {

        const adminClass = isAdminMode && "activeClass";
        const selectedIds = selectedItems[name].map(data => data.id);
        const isSelected = selectedIds.includes(data.id);
        const className = `tag tagLabel ${adminClass} ${isSelected && "selected"} deactivatedClass`;

        return (<div key={index}>
          <div
            onClick={() => selectItem(data) }
            className={className}>
            {data[field]}
          </div>
        </div>)})}
    </div>
  </div>);
}

export default TimeSheetOptions;
