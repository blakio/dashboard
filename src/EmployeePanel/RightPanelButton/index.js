import React from 'react';
import './RightPanelButton.css';

function RightPanelButton(props) {

  const {
    name,
    title
  } = props;

  return (<div className="rightPanelButton flex">
    <div className="sideButtonDescription flex">
      <div className="sideButtonDescriptionTop sectionHeading">
        <p>{name}</p>
      </div>
      <div className="sideButtonDescriptionBottom sectionHeading">
        <p>{title}</p>
      </div>
    </div>
  </div>);
}

export default RightPanelButton;
