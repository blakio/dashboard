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
  setSelected: (payload, state) => {
    return {
      ...state,
      selectedItems: payload
    }
  },

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

  updateEmployee: (payload, state) => {
    const {
      name,
      jobTitle,
      id,
      fn
    } = payload;
    Axios.put(`employees/${id}`, {
      name,
      jobTitle
    }, data => fn(data))
    return state;
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

  bulkDeactivate: (payload, state) => {
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
          deletions.push(null
            // Axios.delete(`${route}/${data.id}`)
          );
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
  resetDeletions: (payload, state) => {
    return {
      ...state,
      deletions: {
        laborTypes: [],
        jobNumbers: [],
        employees: []
      }
    }
  },

  clickIn: (payload, state) => {
    const fn = () => { Axios.clockIn(state.selectedEmployee, payload); }
    Axios.updateEmployee(state.selectedEmployee, state.selectedLaborType, state.selectedJobNumber, fn);
    const newMessage = breakRefAndCopy(state.message);
    newMessage.confirmation.status = true;
    newMessage.confirmation.message = "";
    return {
      ...state,
      message: newMessage,
      selectedItems: {
        laborTypes: [],
        jobNumbers: [],
        employees: []
      },
      activeButtonsList: [],
      selectedEmployee: "",
      selectedLaborType: "",
      selectedJobNumber: ""
    };
  },
  clockOut: (payload, state) => {
    const fn = () => { Axios.clockOut(state.selectedEmployee, payload); }
    Axios.updateEmployee(state.selectedEmployee, state.selectedLaborType, state.selectedJobNumber, fn);
    const newMessage = breakRefAndCopy(state.message);
    newMessage.confirmation.status = true;
    newMessage.confirmation.message = "";
    return {
      ...state,
      message: newMessage,
      selectedItems: {
        laborTypes: [],
        jobNumbers: [],
        employees: []
      },
      activeButtonsList: [],
      selectedEmployee: "",
      selectedLaborType: "",
      selectedJobNumber: ""
    };
  },
  toLunch: (payload, state) => {
    const fn = () => { Axios.startLunch(state.selectedEmployee, payload); }
    Axios.updateEmployee(state.selectedEmployee, state.selectedLaborType, state.selectedJobNumber, fn);
    const newMessage = breakRefAndCopy(state.message);
    newMessage.confirmation.status = true;
    newMessage.confirmation.message = "";
    return {
      ...state,
      message: newMessage,
      selectedItems: {
        laborTypes: [],
        jobNumbers: [],
        employees: []
      },
      activeButtonsList: [],
      selectedEmployee: "",
      selectedLaborType: "",
      selectedJobNumber: ""
    };
  },
  fromLunch: (payload, state) => {
    const fn = () => { Axios.endLunch(state.selectedEmployee, payload); }
    Axios.updateEmployee(state.selectedEmployee, state.selectedLaborType, state.selectedJobNumber, fn);
    const newMessage = breakRefAndCopy(state.message);
    newMessage.confirmation.status = true;
    newMessage.confirmation.message = "";
    return {
      ...state,
      message: newMessage,
      selectedItems: {
        laborTypes: [],
        jobNumbers: [],
        employees: []
      },
      activeButtonsList: [],
      selectedEmployee: "",
      selectedLaborType: "",
      selectedJobNumber: ""
    };
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
      clickedTypes: [],
      selectedItems: {
        laborTypes: [],
        jobNumbers: [],
        employees: []
      }
    };
  },

  selectEmployee: (payload, state) => {
    return {
      ...state,
      selectedEmployee: payload
    };
  },
  selectLaborType: (payload, state) => {
    return {
      ...state,
      selectedLaborType: payload
    };
  },
  selectJobNumber: (payload, state) => {
    return {
      ...state,
      selectedJobNumber: payload
    };
  },

  setActiveButtons: (payload, state) => {
    return {
      ...state,
      activeButtonsList: payload
    }
  },

  openMessage: (payload, state) => {
    const newMessage = breakRefAndCopy(state.message);
    newMessage[payload.type].status = true;
    newMessage[payload.type].message = payload.message;
    return {
      ...state,
      message: newMessage
    }
  },
  closeMessage: (payload, state) => {
    const newMessage = breakRefAndCopy(state.message);
    newMessage[payload].status = false;
    newMessage[payload].message = "";
    return {
      ...state,
      message: newMessage
    }
  }
}
