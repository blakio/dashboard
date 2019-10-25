import React, { useReducer } from 'react';
import Panel from './Panel';
import MainPanel from './MainPanel';
import EmployeePanel from './EmployeePanel';
import { stringTypeAnnotation } from '@babel/types';

import TimeSheetContext from "./Context/State";
import Reducer from "./Context/Reducer";
import initialState from "./Context/InitialState";

function App() {

  const [state, dispatch] = useReducer(Reducer, initialState);

  return (<TimeSheetContext.Provider value={{...state, dispatch}}>
    <div id="dashboard" className="flex">
      <Panel />
      <EmployeePanel />
      <MainPanel />
    </div>
  </TimeSheetContext.Provider>);
}

export default App;
