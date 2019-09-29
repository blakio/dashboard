import React from 'react';
import './HourBar.css';

function HourBar(props) {

  const { hours, day } = props;

  const getStyle = () => {
    if(hours > 7) return { backgroundColor: "#ff581a", height: "90%" }
    if(hours > 6) return { backgroundColor: "#ff6b33", height: "80%" }
    if(hours > 5) return { backgroundColor: "#ff7e4d", height: "70%" }
    if(hours > 4) return { backgroundColor: "#ff9066", height: "60%" }
    if(hours > 3) return { backgroundColor: "#ffa380", height: "50%" }
    if(hours > 2) return { backgroundColor: "#ffb599", height: "40%" }
    if(hours > 1) return { backgroundColor: "#ffc8b3", height: "30%" }
    if(hours > 0) return { backgroundColor: "#F1F0F6", height: "20%" }
  }

  const getHeight = () => {
    if(hours > 7) return { height: "80%" }
    if(hours > 6) return { height: "75%" }
    if(hours > 5) return { height: "70%" }
    if(hours > 4) return { height: "65%" }
    if(hours > 3) return { height: "60%" }
    if(hours > 2) return { height: "55%" }
    if(hours > 1) return { height: "50%" }
    if(hours > 0) return { height: "45%" }
  }

  return (<div className="timeSection flex" style={getHeight()}>
    <div className="timeBox" style={getStyle()}></div>
    <div className="timeText sectionHeading">
      <p>{day}</p>
    </div>
  </div>);
}

export default HourBar;
