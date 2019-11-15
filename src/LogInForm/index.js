import React, { useState, useContext } from 'react';
import TimeSheetContext from "../Context/State";
import Axios from "../Axios";

import Types from "../Context/Types";
import './LogInForm.css';

function LogInForm() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    dispatch,
    isAdminMode
  } = useContext(TimeSheetContext);

  const submitForm = () => {
    if(username.trim().length && password.trim().length){
      Axios.logIn(username, password, response => {
        dispatch({
          type: Types.LOG_IN,
          payload: {
            isLoggedIn: true,
            token: response.data
          }
        })
      })
    }
  }

  return (<div id="logInForm" className="flex">
    <div id="formBox" className="flex">
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        onKeyPress={e => {
          if(e.key === "Enter") submitForm();
        }}
        placeholder="user name"/>
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        onKeyPress={e => {
          if(e.key === "Enter") submitForm();
        }}
        placeholder="password"/>
      <button onClick={() => submitForm()}>log in</button>
    </div>
  </div>);
}

export default LogInForm;
