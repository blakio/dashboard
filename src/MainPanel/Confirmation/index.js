import React, { useState, useEffect, useContext } from "react";

import Types from "../../Context/Types";

import TimeSheetContext from "../../Context/State";

const Confirmation = () => {

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
        payload: "confirmation"
      })
    }, 600);
  }

  return (<div style={{ ...styles.parent, ...fadeStlye }}>
    <i style={styles.icon} className="fas fa-thumbs-up"></i>
    <p style={styles.text} >{`${message.confirmation.message || "ALL SET!"}`}</p>
    <div
      onClick={confirm}
      style={styles.button}>ok</div>
  </div>)
}

const styles = {
  parent: {
    position: "absolute",
    backgroundColor: "#008280",
    top: "10vh",
    left: "38vw",
    height: "24vw",
    width: "24vw",
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
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    padding: "0.8em 4em 0.8em 4em",
    color: "#eaeaea",
    fontSize: "1.4em",
    fontWeight: 300
  }
}

export default Confirmation;
