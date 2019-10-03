import React from 'react';
import './LeftPanel.css';

function LeftPanel() {

  const icons = [
    { icon: "fas fa-clock" },
    { icon: "fas fa-envelope-open" },
    { icon: "fas fa-thumbtack" },
    { icon: "fas fa-flask" },
    { icon: "fas fa-apple-alt" }
  ];

  return (<div id="leftPanel" className="flex">
    <div id="leftPanelLiner" className="flex">
      {icons.map((data, index) => {
        if(index === 0){
          return (<div key={index}>
            <i className={`${data.icon} sideIcon`} style={{marginTop: "4em"}}></i>
          </div>)
        }
        return (<div key={index}>
          <i className={`${data.icon} sideIcon`}></i>
        </div>)})}
    </div>
  </div>);
}

export default LeftPanel;
