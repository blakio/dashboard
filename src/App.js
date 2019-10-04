import React from 'react';
import Panel from './Panel';
import MiddlePanel from './MiddlePanel';
import EmployeePanel from './EmployeePanel';

function App() {
  return (<div id="dashboard" className="flex">
    <EmployeePanel />
    <MiddlePanel />
    <Panel />
  </div>);
}

export default App;
