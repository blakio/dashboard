import React, { useEffect, useReducer } from 'react';
import Panel from './Panel';
import MainPanel from './MainPanel';
import EmployeePanel from './EmployeePanel';
import LogInForm from './LogInForm';
import { stringTypeAnnotation } from '@babel/types';

import TimeSheetContext from "./Context/State";
import Reducer from "./Context/Reducer";
import initialState from "./Context/InitialState";

import Types from "./Context/Types";

function App() {

  const [state, dispatch] = useReducer(Reducer, initialState);

  const hasToken = window.localStorage.data;

  return (<TimeSheetContext.Provider value={{...state, dispatch}}>
    <div id="dashboard" className="flex">
      {/*!hasToken && <LogInForm />*/}
      <Panel />
      <EmployeePanel />
      <MainPanel />
    </div>
  </TimeSheetContext.Provider>);
}

export default App;
