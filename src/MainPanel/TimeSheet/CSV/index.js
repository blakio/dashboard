import React, { useState, useContext } from "react";

import DatePicker from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TimeSheetContext from "../../../Context/State";
import Types from "../../../Context/Types";

export default () => {

  const {
    dispatch
  } = useContext(TimeSheetContext);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const closeDatePicker = () => {
    dispatch({
      type: Types.TOGGLE_DOWNLOAD_SCREEN,
      payload: false
    })
  }

  const ExampleCustomInput = ({ value, onClick }) => (
    <button
      style={{
        backgroundColor: "transparent",
        fontWeight: 400,
        border: "1px solid transparent"
      }}
      onClick={onClick}>
      {value}
    </button>
  );

  return (
    <div style={styles.parent}>
      <div
        onClick={closeDatePicker}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute"
        }}></div>
      <div style={styles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            width: "100%",
            height: "40%",
            backgroundColor: "#008280"
          }}
        >
          <p
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: "1.4rem",
              fontWeight: 300,
              margin: 0,
              marginBottom: 8
            }}
          >SELECT START AND END DATES</p>
        </div>

        <div style={{height: "60%"}}>
          <div className="flex">
            <div style={styles.button}>
              <div>start</div>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
            </div>
            <div style={styles.button}>
              <div>end</div>
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                selectsEnd
                endDate={endDate}
                minDate={startDate}
              />
            </div>
          </div>

          <div
            className="flex"
            style={{
              width: "100%"
            }}
          >
            <div style={{margin: 8}}>
              <div
                className={`topBarButton flex ${startDate && endDate && "active"}`}
                onClick={() => console.log("submit")}
              >
                <i className="fas fa-file-csv"></i>
              </div>
              <p className="topBarText">sumit</p>
            </div>
            <div style={{margin: 8}}>
              <div
                className="topBarButton flex active"
                onClick={() => console.log("submit")}>
                <i className="fas fa-file-csv"></i>
              </div>
              <p className="topBarText">download</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
  parent: {
    position: "absolute",
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    position: "absolute",
    height: "24em",
    width: "24em",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 4
  },
  button: {
    margin: 10,
    marginBottom: 40
  }
}
