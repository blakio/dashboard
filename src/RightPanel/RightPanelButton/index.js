import React from 'react';
import './RightPanelButton.css';

function RightPanelButton(props) {

  const {
    title,
    description,
    iconClass
  } = props;

  return (<div className="rightPanelButton flex">
    <div className="sideButton flex">
      <i className={iconClass}></i>
    </div>
    <div className="sideButtonDescription flex">
      <div className="sideButtonDescriptionTop sectionHeading">
        <p>{title}</p>
      </div>
      <div className="sideButtonDescriptionBottom sectionHeading">
        <p>{description}</p>
      </div>
    </div>
  </div>);
}

export default RightPanelButton;
