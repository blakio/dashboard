import React, { useState, useEffect, useContext } from "react";

import Types from "../../Context/Types";

import TimeSheetContext from "../../Context/State";

const Error = () => {

  const {
    dispatch,
    message
  } = useContext(TimeSheetContext);

  const [fadeStlye, setFadeStlye] = useState({
    opacity: 0,
    top: "-5em"
  })

  useEffect(() => {
    setFadeStlye({
      opacity: 1,
      top: "5em"
    })
  }, [])

  const confirm = () => {
    setFadeStlye({
      opacity: 0,
      top: "-5em"
    })

    setTimeout(() => {
      dispatch({
        type: Types.CLOSE_MESSAGE,
        payload: "error"
      })
    }, 600);
  }

  return (<div style={{ ...styles.parent, ...fadeStlye }}>
    <i style={styles.icon} className="fas fa-exclamation"></i>
    <p style={styles.text} >{`${message.error.message || "ERROR"}`}</p>
    <div
      onClick={confirm}
      style={styles.button}>ok</div>
  </div>)
}

const styles = {
  parent: {
    position: "absolute",
    backgroundColor: "#b3a43e",
    top: "10vh",
    left: "40vw",
    height: "20em",
    width: "20em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    transition: "all 0.5s"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: "10em"
  },
  text: {
    color: "#eaeaea",
    fontSize: "1.4em",
    fontWeight: 300
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: "0.8em 4em 0.8em 4em",
    color: "#eaeaea",
    fontSize: "1.4em",
    fontWeight: 300
  }
}

export default Error;
