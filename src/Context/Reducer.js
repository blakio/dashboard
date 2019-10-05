import {
  CREATE_EMPLOYEE,
  CREATE_LABOR_TYPE,
  CREATE_PROJECT_TYPE,
  CREATE_JOB_NUMBER,

  GET_EMPLOYEE,
  GET_LABOR_TYPE,
  GET_PROJECT_TYPE,
  GET_JOB_NUMBER,

  UPDATE_EMPLOYEE,
  UPDATE_LABOR_TYPE,
  UPDATE_PROJECT_TYPE,
  UPDATE_JOB_NUMBER,

  DELETE_EMPLOYEE,
  DELETE_LABOR_TYPE,
  DELETE_PROJECT_TYPE,
  DELETE_JOB_NUMBER
} from "./Types";

import {
  createEmployee,
  createLaborType,
  createJobType,
  createJobNumber,
  getEmployee,
  getLaborType,
  getJobType,
  getJobNumber,
  updateEmployee,
  updateLaborType,
  updateJobType,
  updateJobNumber,
  deleteEmployee,
  deleteLaborType,
  deleteJobType,
  deleteJobNumber,
} from "./StateFunctions";

export default (state, action) => {
  switch(action.type){
    case CREATE_EMPLOYEE:
      return createEmployee(action.payload, state);
    case CREATE_LABOR_TYPE:
      return createLaborType(action.payload, state);
    case CREATE_PROJECT_TYPE:
      return createJobType(action.payload, state);
    case CREATE_JOB_NUMBER:
      return createJobNumber(action.payload, state);

    case GET_EMPLOYEE:
      return getEmployee(action.payload, state);
    case GET_LABOR_TYPE:
      return getLaborType(action.payload, state);
    case GET_PROJECT_TYPE:
      return getJobType(action.payload, state);
    case GET_JOB_NUMBER:
      return getJobNumber(action.payload, state);

    case UPDATE_EMPLOYEE:
      return updateEmployee(action.payload, state);
    case UPDATE_LABOR_TYPE:
      return updateLaborType(action.payload, state);
    case UPDATE_PROJECT_TYPE:
      return updateJobType(action.payload, state);
    case UPDATE_JOB_NUMBER:
      return updateJobNumber(action.payload, state);

    case DELETE_EMPLOYEE:
      return deleteEmployee(action.payload, state);
    case DELETE_LABOR_TYPE:
      return deleteLaborType(action.payload, state);
    case DELETE_PROJECT_TYPE:
      return deleteJobType(action.payload, state);
    case DELETE_JOB_NUMBER:
      return deleteJobNumber(action.payload, state);

    default:
    return state;
  }
}
