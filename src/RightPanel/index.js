import React from 'react';
import './RightPanel.css';

import RightPanelButton from "./RightPanelButton";

const sideButtons = [
  {
    title: "title",
    description: "description",
    iconClass: "fas fa-lightbulb"
  },
  {
    title: "title",
    description: "description",
    iconClass: "fas fa-lightbulb"
  },
  {
    title: "title",
    description: "description",
    iconClass: "fas fa-lightbulb"
  },
  {
    title: "title",
    description: "description",
    iconClass: "fas fa-lightbulb"
  },
  {
    title: "title",
    description: "description",
    iconClass: "fas fa-lightbulb"
  },
  {
    title: "title",
    description: "description",
    iconClass: "fas fa-lightbulb"
  },
  {
    title: "title",
    description: "description",
    iconClass: "fas fa-lightbulb"
  },
  {
    title: "title",
    description: "description",
    iconClass: "fas fa-lightbulb"
  },
  {
    title: "title",
    description: "description",
    iconClass: "fas fa-lightbulb"
  },
  {
    title: "title",
    description: "description",
    iconClass: "fas fa-lightbulb"
  },
  {
    title: "title",
    description: "description",
    iconClass: "fas fa-lightbulb"
  },
  {
    title: "title",
    description: "description",
    iconClass: "fas fa-lightbulb"
  },
  {
    title: "title",
    description: "description",
    iconClass: "fas fa-lightbulb"
  },
  {
    title: "title",
    description: "description",
    iconClass: "fas fa-lightbulb"
  },
  {
    title: "title",
    description: "description",
    iconClass: "fas fa-lightbulb"
  },
  {
    title: "title",
    description: "description",
    iconClass: "fas fa-lightbulb"
  },
  {
    title: "title",
    description: "description",
    iconClass: "fas fa-lightbulb"
  },
  {
    title: "title",
    description: "description",
    iconClass: "fas fa-lightbulb"
  },
  {
    title: "title",
    description: "description",
    iconClass: "fas fa-lightbulb"
  }
]

function RightPanel() {
  return (<div id="rightPanel" className="flex">
    <div className="sectionHeading">
      <p>options</p>
    </div>
    <div id="rightPanelLiner">
      {sideButtons.map(data => <RightPanelButton {...data}/>)}
    </div>
  </div>);
}

export default RightPanel;
