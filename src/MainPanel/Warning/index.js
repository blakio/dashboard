import React, { useState, useEffect } from "react";

const Warning = () => {

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
  }

  return (<div style={{ ...styles.parent, ...fadeStlye }}>
    <i style={styles.icon} className="fas fa-hand-paper"></i>
    <p style={styles.text} >ARE YOU SURE?</p>
    <div style={styles.confirmBox}>
      <div
        onClick={confirm}
        style={styles.button}>YES</div>
      <div
        onClick={confirm}
        style={styles.button}>NO</div>
    </div>
  </div>)
}

const styles = {
  parent: {
    position: "absolute",
    backgroundColor: "#FF6363",
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
