import React, { useState } from 'react';
import './RightPanel.css';
<<<<<<< HEAD
import RightPanelButton from "./RightPanelButton";
import Strapi from 'strapi-sdk-javascript'
//Sample API Request
const strapi = new Strapi('http://localhost:1337');



=======

import EmployeePanelButtons from "./EmployeePanelButtons";

const sideButtons = [
  {
    name: "courtney rochelle",
    title: "project manager"
  },
  {
    name: "mitchell philmore",
    title: "chief informations officer"
  },
  {
    name: "isaiah harrison",
    title: "chief executive officer"
  },
 
]

// Sample Request to pull all employee names and job titles

// strapi.request('POST','/graphql',{
//   data:{
//     query:
//      `
//      query{
//       employees{
//         name
//         job_title
        
//       }
//     }
    
//     `
//   }
// }).then(({data:{employees}})=>console.log(employees))



function EmployeePanel() {

  const [selected, setSelected] = useState(null);

  const select = name => setSelected((name === selected) ? null : name);

  return (<div id="rightPanel" className="flex">
    <div className="sectionHeading">
      <p>employees</p>
    </div>
    <div id="rightPanelLiner">
      {sideButtons.map((data, index) => {
        return <EmployeePanelButtons
          key={index}
          {...data}
          selected={selected === data.name}
          select={select}/>
      })}
    </div>
  </div>);
}

export default EmployeePanel;
