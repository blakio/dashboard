import React from 'react';
import './RightPanel.css';
import RightPanelButton from "./RightPanelButton";
import Strapi from 'strapi-sdk-javascript'
//Sample API Request
const strapi = new Strapi('http://localhost:1337');




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
  return (<div id="rightPanel" className="flex">
    <div className="sectionHeading">
      <p>employees</p>
    </div>
    <div id="rightPanelLiner">
      {sideButtons.map((data, index) => <RightPanelButton key={index} {...data}/>)}
    </div>
  </div>);
}

export default EmployeePanel;
