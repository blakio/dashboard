import Axios from "../Axios";
import initialState from "./InitialState";

const breakRefAndCopy = (obj) => JSON.parse(JSON.stringify(obj));

export default {

  // SET
  setSelectedItems: (payload, state) => ({ ...state, selectedItems: payload }),
  setEmployees: (payload, state) =>  ({ ...state, employees: payload }),
  setLaborTypes: (payload, state) => ({ ...state, laborTypes: payload }),
  setJobNumbers: (payload, state) => ({ ...state, jobNumbers: payload }),

  // CREATE
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

  // DELETE
  bulkDelete: (payload, state) => {
    const map = {
      employees: "employees",
      laborTypes: "labortypes",
      jobNumbers: "jobs"
    }
    for(let i in state.selectedItems){
      if(state.selectedItems[i].length){
        state.selectedItems[i].forEach(data => Axios.delete(`${map[i]}/${data.id}`, null, payload.fn))
      }
    }
    return {
      ...state,
      selectedItems: breakRefAndCopy(initialState.selectedItems)
    };
  },

  // OTHER
  clickIn: (payload, state) => {
    const employeesId = state.selectedItems.employees[0].id;
    Axios.clockIn(employeesId, {
      laborType: state.selectedItems.laborTypes[0].name,
      jobNumber: state.selectedItems.jobNumbers[0].number
    });
    return {
      ...state,
      selectedItems: breakRefAndCopy(initialState.selectedItems)
    }
  },
  clockOut: (payload, state) => {
    const employeesId = state.selectedItems.employees[0].id;
    Axios.clockOut(employeesId, {
      laborType: state.selectedItems.laborTypes[0].name,
      jobNumber: state.selectedItems.jobNumbers[0].number
    });
    return {
      ...state,
      selectedItems: breakRefAndCopy(initialState.selectedItems)
    }
  },
  toLunch: (payload, state) => {
    const employeesId = state.selectedItems.employees[0].id;
    Axios.startLunch(employeesId, {
      laborType: state.selectedItems.laborTypes[0].name,
      jobNumber: state.selectedItems.jobNumbers[0].number
    });
    return {
      ...state,
      selectedItems: breakRefAndCopy(initialState.selectedItems)
    }
  },
  fromLunch: (payload, state) => {
    const employeesId = state.selectedItems.employees[0].id;
    Axios.endLunch(employeesId, {
      laborType: state.selectedItems.laborTypes[0].name,
      jobNumber: state.selectedItems.jobNumbers[0].number
    });
    return {
      ...state,
      selectedItems: breakRefAndCopy(initialState.selectedItems)
    }
  },
  bulkDeactivate: (payload, state) => {
    const map = {
      employees: "employees",
      laborTypes: "labortypes",
      jobNumbers: "jobs"
    }
    for(let i in state.selectedItems){
      if(state.selectedItems[i].length){
        state.selectedItems[i].forEach(data => Axios.put(`${map[i]}/${data.id}`, { isActive: false }, payload.fn))
      }
    }
    return {
      ...state,
      selectedItems: breakRefAndCopy(initialState.selectedItems)
    }
  },
  bulkActivate: (payload, state) => {
    const map = {
      employees: "employees",
      laborTypes: "labortypes",
      jobNumbers: "jobs"
    }
    for(let i in state.selectedItems){
      if(state.selectedItems[i].length){
        state.selectedItems[i].forEach(data => Axios.put(`${map[i]}/${data.id}`, { isActive: true }, payload.fn))
      }
    }
    return {
      ...state,
      selectedItems: breakRefAndCopy(initialState.selectedItems)
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
  },
  toggleDownloadScreen: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    currentState.isDownloadScreen = payload;
    return {
      ...state,
      isDownloadScreen: currentState.isDownloadScreen
    }
  }
}
