import Axios from "../Axios";
import initialState from "./InitialState";

import Util from "../Util";

export default {

  // SET
  setSelectedItems: (payload, state) => ({ ...state, selectedItems: payload }),
  setEmployees: (payload, state) =>  ({ ...state, employees: payload }),
  setLaborTypes: (payload, state) => ({ ...state, laborTypes: payload }),
  setJobNumbers: (payload, state) => ({ ...state, jobNumbers: payload }),

  // CREATE
  createEmployee: (payload, state) => {
    const currentState = Util.breakRefAndCopy(state);
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
    const currentState = Util.breakRefAndCopy(state);
    const { laborTypes } = currentState;
    if(laborTypes.indexOf(payload) === -1) laborTypes.push(payload.toUpperCase())
    return {
      ...state,
      laborTypes
    };
  },
  createJobNumber: (payload, state) => {
    const currentState = Util.breakRefAndCopy(state);
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
      selectedItems: Util.breakRefAndCopy(initialState.selectedItems)
    };
  },

  // OTHER
  clickIn: (payload, state) => {
    const employeesId = state.selectedItems.employees[0].id;
    Axios.clockIn(employeesId, {
      laborType: Util.getLaborType(state),
      jobNumber: Util.getJobNumber(state)
    }, payload);
    return {
      ...state,
      selectedItems: Util.breakRefAndCopy(initialState.selectedItems)
    }
  },
  clockOut: (payload, state) => {
    const employeesId = state.selectedItems.employees[0].id;
    Axios.clockOut(employeesId, {
      laborType: Util.getLaborType(state),
      jobNumber: Util.getJobNumber(state),
      ...state.selectedItems.employees[0]
    }, payload);
    return {
      ...state,
      selectedItems: Util.breakRefAndCopy(initialState.selectedItems)
    }
  },
  toLunch: (payload, state) => {
    const employeesId = state.selectedItems.employees[0].id;
    Axios.startLunch(employeesId, {
      laborType: Util.getLaborType(state),
      jobNumber: Util.getJobNumber(state)
    }, payload);
    return {
      ...state,
      selectedItems: Util.breakRefAndCopy(initialState.selectedItems)
    }
  },
  fromLunch: (payload, state) => {
    const employeesId = state.selectedItems.employees[0].id;
    Axios.endLunch(employeesId, {
      laborType: Util.getLaborType(state),
      jobNumber: Util.getJobNumber(state)
    }, payload);
    return {
      ...state,
      selectedItems: Util.breakRefAndCopy(initialState.selectedItems)
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
      selectedItems: Util.breakRefAndCopy(initialState.selectedItems)
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
      selectedItems: Util.breakRefAndCopy(initialState.selectedItems)
    };
  },
  updateEmployee: (payload, state) => {
    const {
      name,
      jobTitle,
      id,
      isContractor,
      fn
    } = payload;
    Axios.put(`employees/${id}`, {
      name,
      jobTitle,
      isContractor
    }, data => fn(data))
    return state;
  },
  toggleAdminMode: (payload, state) => {
    const currentState = Util.breakRefAndCopy(state);
    currentState.isAdminMode = !currentState.isAdminMode;
    return {
      ...state,
      isAdminMode: currentState.isAdminMode,
      clickedTypes: [],
      selectedItems: {
        laborTypes: [],
        jobNumbers: [],
        employees: []
      },
      isContractor: false
    };
  },
  openMessage: (payload, state) => {
    const newMessage = Util.breakRefAndCopy(state.message);
    newMessage[payload.type].status = true;
    newMessage[payload.type].message = payload.message;
    return {
      ...state,
      message: newMessage
    }
  },
  closeMessage: (payload, state) => {
    const newMessage = Util.breakRefAndCopy(state.message);
    newMessage[payload].status = false;
    newMessage[payload].message = "";
    return {
      ...state,
      message: newMessage
    }
  },
  toggleDownloadScreen: (payload, state) => {
    const currentState = Util.breakRefAndCopy(state);
    currentState.isDownloadScreen = payload;
    return {
      ...state,
      isDownloadScreen: currentState.isDownloadScreen
    }
  },
  toggleIsContractor: (payload, state) => {
    const currentState = Util.breakRefAndCopy(state);
    currentState.isContractor = payload;
    return {
      ...state,
      isContractor: currentState.isContractor
    }
  }
}
