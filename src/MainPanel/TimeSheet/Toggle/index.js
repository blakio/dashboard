import React from "react";

const Toggle = (props) => {

  const {
    isOn,
    onClick,
    offStlyes,
    onStlyes,
    parentStlyes,
    text,
    textStlyes
  } = props;

  return (<div style={parentStlyes} onClick={onClick}>
    {isOn ? <i style={onStlyes} className="fas fa-toggle-on"></i> :
            <i style={offStlyes} className="fas fa-toggle-off"></i>}
    <p style={textStlyes} className="topBarText">{text}</p>
  </div>)
}

export default Toggle;
