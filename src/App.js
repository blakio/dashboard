import React, { useReducer } from 'react';
import Panel from './Panel';
import MiddlePanel from './MiddlePanel';
import EmployeePanel from './EmployeePanel';
import Strapi from 'strapi-sdk-javascript';
import { stringTypeAnnotation } from '@babel/types';

import TimeSheetContext from "./Context/State";
import Reducer from "./Context/Reducer";
import initialState from "./Context/InitialState";

//Sample API Request

const strapi = new Strapi('http://localhost:1337');


// strapi.request('POST','/graphql',{
//   data:{
//     query:
//      `
//      query{
//       employees{
//         name
//       }
//     }

//     `
//   }
// }).then(({data:{employees}})=>console.log(employees.map(employees=>employees.name)))


strapi.request('POST','/graphql',{
  data:{
    query:
    `
    query{
      currentjobs{
        jobnumber
      }

    }
    `
  }
}).then(({data:{currentjobs}})=>console.log(currentjobs.map(job=>job.jobnumber)))

const isAdminMode = true;

function App() {

  const [state, dispatch] = useReducer(Reducer, initialState);

  return (<TimeSheetContext.Provider value={{...state}}>
    <div id="dashboard" className="flex">
      <EmployeePanel />
      <MiddlePanel />
      <Panel />
    </div>
  </TimeSheetContext.Provider>);
}

export default App;
