import React from 'react';
import LeftPanel from './LeftPanel';
import MiddlePanel from './MiddlePanel';
import RightPanel from './RightPanel';

function App() {
  return (<div id="dashboard" className="flex">
    <LeftPanel />
    <MiddlePanel />
    <RightPanel />
  </div>);
}

export default App;
