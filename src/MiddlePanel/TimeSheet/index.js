import React, { useState, useEffect, useContext } from 'react';
import './TimeSheet.css';

import TimeSheetContext from "../../Context/State";
import TimeSheetOptions from "./TimeSheetOptions";
import Axios from "../../Axios";

import {
  CREATE_LABOR_TYPE,
  CREATE_JOB_NUMBER,
  DELETE_LABOR_TYPE,
  DELETE_JOB_NUMBER,
  BULK_DELETE,
  UPDATE_DELETIONS,
  CLOCK_IN,
  CLOCK_OUT,
  GO_TO_LUNCH,
  BACK_FROM_LUNCH,
  TOGGLE_TYPE,
  Types
} from "../../Context/Types";

function TimeSheet() {

  useEffect(() => {
    Axios.get("labortypes", null, response => setLabor(response));
    Axios.get("jobs", null, response => setJobs(response));
  }, []);

  const {
    isAdminMode,
    isClockedIn,
    isAtLunch,
    dispatch,
    laborTypes,
    jobNumbers,
    clickedTypes,
    deletions
  } = useContext(TimeSheetContext);

  const setJobs = (response) => {
    const { data } = response;
    const payload = [];
    data.forEach(data => payload.push(data.number))
    dispatch({
      type: Types.SET_JOB_NUMBERS,
      payload: payload
    });
  }

  const setLabor = (response) => {
    const { data } = response;
    const payload = [];
    data.forEach(data => payload.push(data.name))
    dispatch({
      type: Types.SET_LABOR_TYPES,
      payload
    })
  }

  const [activeButtons, setActiveButtons] = useState(["to lunch", "from lunch", "message"]);

  useEffect(() => {
    if(clickedTypes.includes("employees") && !activeButtons.includes("clock in")
    && !isClockedIn){
      setActiveButtons([...activeButtons, "clock in"])
    } else if(clickedTypes.includes("employees") && !activeButtons.includes("clock out")
    && isClockedIn){
      setActiveButtons([...activeButtons, "clock out"])
    } else if(!clickedTypes.includes("employees") && activeButtons.includes("clock in")) {
      const newActiveButtons = JSON.parse(JSON.stringify(activeButtons));
      newActiveButtons.splice(activeButtons.indexOf("clock in"), 1);
      setActiveButtons(newActiveButtons);
    } else if(!clickedTypes.includes("employees") && activeButtons.includes("clock out")){
      const newActiveButtons = JSON.parse(JSON.stringify(activeButtons));
      newActiveButtons.splice(activeButtons.indexOf("clock out"), 1);
      setActiveButtons(newActiveButtons);
    }

    const activeDeletion = deletions.laborTypes.length || deletions.jobNumbers.length || deletions.employees.length;
    if(activeDeletion && !activeButtons.includes("trash")){
      setActiveButtons([...activeButtons, "trash"])
    } else if (!activeDeletion && activeButtons.includes("trash")) {
      const newActiveButtons = JSON.parse(JSON.stringify(activeButtons));
      newActiveButtons.splice(activeButtons.indexOf("trash"), 1);
      setActiveButtons(newActiveButtons);
    }
  }, [clickedTypes, deletions])

  const topButtons = [
    {
      isAdminButton: true,
      text: "trash",
      icon: "fas fa-trash-alt",
      function: (isActive) => {
        if(!isActive) return;
        dispatch({
          type: BULK_DELETE,
          payload: null
        })
      }
    },
    {
      isAdminButton: false,
      text: "clock in",
      icon: "fas fa-clock",
      function: (isActive) => {
        if(!isActive) return;
        dispatch({
          type: CLOCK_IN,
          payload: null
        })
      }
    },
    {
      isAdminButton: false,
      text: "clock out",
      icon: "fas fa-clock",
      function: (isActive) => {
        if(!isActive) return;
        dispatch({
          type: CLOCK_OUT,
          payload: null
        })
      }
    },
    {
      isAdminButton: false,
      text: "to lunch",
      icon: "fas fa-drumstick-bite",
      function: (isActive) => {
        if(!isActive) return;
        dispatch({
          type: GO_TO_LUNCH,
          payload: null
        })
      }
    },
    {
      isAdminButton: false,
      text: "from lunch",
      icon: "fas fa-bone",
      function: (isActive) => {
        if(!isActive) return;
        dispatch({
          type: BACK_FROM_LUNCH,
          payload: null
        })
      }
    },
    // {
    //   isAdminButton: false,
    //   text: "message",
    //   icon: "fas fa-envelope-open-text",
    //   function: (isActive) => {
    //     if(!isActive) return;
    //     dispatch({})
    //   }
    // }
  ]

  return (<div id="timesheet">
    <div id="topbar" className="flex">
      {topButtons.map((data, index) => {

        const isAdminButtonButNotOnAdminMode = data.isAdminButton && !isAdminMode;
        const removeClockedInButton = (data.text === "clock in") && (isClockedIn || isAtLunch);
        const removeClockedOutButton = (data.text === "clock out") && !isClockedIn;
        const removeToLunchButton = (data.text === "to lunch") && (!isClockedIn || isAtLunch);
        const removeFromLunchButton = (data.text === "from lunch") && (!isClockedIn || !isAtLunch);

        if(isAdminButtonButNotOnAdminMode ||
          removeClockedInButton ||
          removeClockedOutButton ||
          removeToLunchButton ||
          removeFromLunchButton){
          return <div key={index}></div>
        }

        const isActive = (text) => {
          return (
            (activeButtons.includes("trash") && text === "trash") ||
            (activeButtons.includes("clock in") && text === "clock in") ||
            (activeButtons.includes("clock out") && text === "clock out") ||
            (activeButtons.includes("to lunch") && text === "to lunch") ||
            (activeButtons.includes("from lunch") && text === "from lunch") ||
            (activeButtons.includes("message") && text === "message")
          )
        }

        return (<div key={index}>
          <div
            className={`topBarButton flex ${isActive(data.text) && "active"}`}
            onClick={() => data.function(isActive(data.text))}>
            <i className={data.icon}></i>
          </div>
          <p className="topBarText">{data.text}</p>
        </div>)
      })}
    </div>
    <div id="middlePanelMiddle" className="flex">

      <div className="middlePanelMiddleChild">
        <TimeSheetOptions
          title="Labor Type"
          options={laborTypes}
          createActionType={ CREATE_LABOR_TYPE }
          deleteActionType={ DELETE_LABOR_TYPE }
          name={"laborTypes"}
          type={UPDATE_DELETIONS}
          toggleType={TOGGLE_TYPE}
          dispatch={dispatch}
        />
      </div>

      <div className="middlePanelMiddleChild">
        <TimeSheetOptions
          title="Job Number"
          options={jobNumbers}
          createActionType={ CREATE_JOB_NUMBER }
          deleteActionType={ DELETE_JOB_NUMBER }
          name={"jobNumbers"}
          type={UPDATE_DELETIONS}
          toggleType={TOGGLE_TYPE}
          dispatch={dispatch}
        />
      </div>

    </div>
  </div>);
}

export default TimeSheet;
