import React, { useState, useContext } from "react";

import { CSVLink } from "react-csv";
import DatePicker from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TimeSheetContext from "../../../Context/State";
import Types from "../../../Context/Types";

import moment from "moment";

export default () => {

  const {
    dispatch,
    csvData
  } = useContext(TimeSheetContext);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const closeDatePicker = () => {
    dispatch({
      type: Types.TOGGLE_DOWNLOAD_SCREEN,
      payload: false
    })
  }

  const requestData = () => {
    dispatch({
      type: Types.CLEAR_CSV_DATA
    })
    dispatch({
      type: Types.GET_CSV_DATA,
      payload: {
        startDate,
        endDate,
        dispatch
      }
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
              <div>START</div>
              <DatePicker
                maxDate={new Date()}
                selected={startDate}
                onChange={date => {
                  const isAfterEndDate = moment(date).diff(endDate, 'hours') > 0;
                  if(isAfterEndDate){
                    setEndDate(date);
                  }
                  setStartDate(date);
                  dispatch({
                    type: Types.CLEAR_CSV_DATA
                  })
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
            </div>
            <div style={styles.button}>
              <div>END</div>
              <DatePicker
                maxDate={new Date()}
                selected={endDate}
                onChange={date => {
                  setEndDate(date)
                  dispatch({
                    type: Types.CLEAR_CSV_DATA
                  })
                }}
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
                onClick={requestData}
              >
                <i class="fas fa-search"></i>
              </div>
              <p className="topBarText">search</p>
            </div>
            <CSVLink
              data={csvData.data}
              style={{textDecoration: "none"}}
              filename={`cummins-wagner_timesheet__from:${csvData.startDate}-to:${csvData.endDate}.csv`}
              onClick={() => csvData.data.length > 0}>
              <div style={{margin: 8}}>
                <div className={`topBarButton flex ${csvData.data.length && "active"}`}>
                  <i class="fas fa-cloud-download-alt"></i>
                </div>
                <p className="topBarText" style={{color: "#000"}}>download</p>
              </div>
            </CSVLink>
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
