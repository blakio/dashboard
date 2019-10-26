import Axios from "../Axios";
import initialState from "./InitialState";

const breakRefAndCopy = (obj) => JSON.parse(JSON.stringify(obj));

export default {
  getEmployees: (payload, state) => {
    Axios.get("employees", null, payload.fn);
    return state;
  },

  setJobNumbers: (payload, state) => ({ ...state, jobNumbers: payload }),
  setLaborTypes: (payload, state) => ({ ...state, laborTypes: payload }),
  setEmployees: (payload, state) =>  ({ ...state, employees: payload }),


  createEmployee: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    const { employees } = currentState;
    employees.push({
      id: (employees.length + 1),
      ...payload
    })
    return {
      ...state,
      employees
    };
  },
  createLaborType: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    const { laborTypes } = currentState;
    if(laborTypes.indexOf(payload) === -1) laborTypes.push(payload.toUpperCase())
    return {
      ...state,
      laborTypes
    };
  },
  createJobNumber: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    const { jobNumbers } = currentState;
    if(jobNumbers.indexOf(payload) === -1) jobNumbers.push(payload.toUpperCase())
    return {
      ...state,
      jobNumbers
    };
  },

  deleteEmployee: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    const { employees } = currentState;
    let indexOfPayload;
    employees.forEach((data, index) => {
      if(data.id === payload){
        indexOfPayload = index
      }
    })
    employees.splice(indexOfPayload, 1);
    return {
      ...state,
      employees
    };
  },
  deleteLaborType: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    const { laborTypes } = currentState;
    let indexOfPayload;
    laborTypes.forEach((data, index) => {
      if(data.toLowerCase() === payload.toLowerCase()){
        indexOfPayload = index
      }
    })
    laborTypes.splice(indexOfPayload, 1);
    return {
      ...state,
      laborTypes
    };
  },
  deleteJobNumber: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    const { jobNumbers } = currentState;
    let indexOfPayload;
    jobNumbers.forEach((data, index) => {
      if(data.toLowerCase() === payload.toLowerCase()){
        indexOfPayload = index
      }
    })
    jobNumbers.splice(indexOfPayload, 1);
    return {
      ...state,
      jobNumbers
    };
  },
  bulkDelete: (payload, state) => {
    const routes = {
      employees: "employees",
      jobNumbers: "jobs",
      laborTypes: "labortypes"
    }
    const deletions = [];
    for(let i in state.deletions){
      const route = routes[i];
      if(state.deletions[i].length){
        state.deletions[i].forEach(data => {
          deletions.push(Axios.delete(`${route}/${data.id}`));
        })
      }
    }
    Promise.all(deletions)
          .then(obj => payload.fn())
          .catch(e => console.log(e))
    return {
      ...state,
      deletions: breakRefAndCopy(initialState.deletions)
    };
  },
  updateDeletions: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    const deletions = currentState.deletions;
    if(payload.type === "remove"){
      deletions[payload.name].splice(state.deletions[payload.name].indexOf(payload.data), 1);
    } else if(payload.type === "add"){
      deletions[payload.name].push(payload.data)
    }
    return {
      ...state,
      deletions
    };
  },

  clickIn: (payload, state) => {
    return state;
  },
  clockOut: (payload, state) => {
    return state;
  },
  toLunch: (payload, state) => {
    return state;
  },
  fromLunch: (payload, state) => {
    return state;
  },

  toggleType: ({type, name}, state) => {
    const currentState = breakRefAndCopy(state);
    if(type === "add" && !currentState.clickedTypes.includes(name)){
      currentState.clickedTypes.push(name);
    } else if (type === "remove"){
      currentState.clickedTypes.splice(state.clickedTypes.indexOf(name), 1);
    }
    return {
      ...state,
      clickedTypes: [...currentState.clickedTypes]
    };
  },

  toggleAdminMode: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    currentState.isAdminMode = !currentState.isAdminMode;
    return {
      ...state,
      isAdminMode: currentState.isAdminMode,
      clickedTypes: []
    };
  },
}
