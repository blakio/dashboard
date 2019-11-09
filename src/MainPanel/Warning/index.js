import React, { useState, useEffect, useContext } from "react";

import Types from "../../Context/Types";
import Axios from "../../Axios";

import TimeSheetContext from "../../Context/State";

const Warning = () => {

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

  const confirm = (yes) => {
    setFadeStlye({
      opacity: 0,
      top: "-5em"
    })

    setTimeout(() => {
      dispatch({
        type: Types.CLOSE_MESSAGE,
        payload: "warning"
      })
    }, 600);

    dispatch({
      type: Types.BULK_DELETE,
      payload: {
        fn: () => {
          Axios.fetchEmployees(dispatch)
          Axios.fetchLaborTypes(dispatch);
          Axios.fetchJobNumbers(dispatch);
        }
      },
    })
  }

  const cancel = (yes) => {
    setFadeStlye({
      opacity: 0,
      top: "-5em"
    })

    setTimeout(() => {
      dispatch({
        type: Types.CLOSE_MESSAGE,
        payload: "warning"
      })
    }, 600);
  }

  return (<div style={{ ...styles.parent, ...fadeStlye }}>
    <i style={styles.icon} className="fas fa-hand-paper"></i>
    <p style={styles.text} >{`${message.warning.message || "ARE YOU SURE?"}`}</p>
    <div style={styles.confirmBox}>
      <div
        onClick={confirm}
        style={styles.button}>YES</div>
      <div
        onClick={cancel}
        style={styles.button}>NO</div>
    </div>
  </div>)
}

const styles = {
  parent: {
    position: "absolute",
    backgroundColor: "#FF6363",
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
  confirmBox: {
    display: "flex",
    justifyContent: "space-around",
    width: "80%"
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    padding: "0.8em 1em 0.8em 1em",
    color: "#eaeaea",
    fontSize: "1.4em",
    fontWeight: 300
  }
}

export default Warning;
