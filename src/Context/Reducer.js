import {
  Types,

  CREATE_EMPLOYEE,
  CREATE_LABOR_TYPE,
  CREATE_JOB_NUMBER,

  GET_EMPLOYEE,
  GET_LABOR_TYPE,
  GET_JOB_NUMBER,

  UPDATE_EMPLOYEE,
  UPDATE_LABOR_TYPE,
  UPDATE_JOB_NUMBER,

  DELETE_EMPLOYEE,
  DELETE_LABOR_TYPE,
  DELETE_JOB_NUMBER,

  BULK_DELETE,
  UPDATE_DELETIONS,
  CLOCK_IN,
  CLOCK_OUT,
  GO_TO_LUNCH,
  BACK_FROM_LUNCH,
  TOGGLE_TYPE
} from "./Types";

import {
  createEmployee,
  createLaborType,
  createJobNumber,
  getEmployee,
  getLaborType,
  getJobNumber,
  updateEmployee,
  updateLaborType,
  updateJobNumber,
  deleteEmployee,
  deleteLaborType,
  deleteJobNumber,
  bulkDelete,
  updateDeletions,
  clickIn,
  clockOut,
  toLunch,
  fromLunch,
  toggleType,

  setEmployees,
  setJobNumbers,
  setLaborTypes
} from "./StateFunctions";

export default (state, action) => {
  const { payload } = action;
  console.table(action)

  switch(action.type){
    // SET
    case Types.SET_EMPLOYEES:
      return setEmployees(payload, state);
    case Types.SET_JOB_NUMBERS:
      return setJobNumbers(payload, state)
    case Types.SET_LABOR_TYPES:
      return setLaborTypes(payload, state)

    // CREATE
    case CREATE_EMPLOYEE:
      return createEmployee(payload, state);
    case CREATE_LABOR_TYPE:
      return createLaborType(payload, state);
    case CREATE_JOB_NUMBER:
      return createJobNumber(payload, state);

    // READ
    case GET_EMPLOYEE:
      return getEmployee(payload, state);
    case GET_LABOR_TYPE:
      return getLaborType(payload, state);
    case GET_JOB_NUMBER:
      return getJobNumber(payload, state);

    // UPDATE
    case UPDATE_EMPLOYEE:
      return updateEmployee(payload, state);
    case UPDATE_LABOR_TYPE:
      return updateLaborType(payload, state);
    case UPDATE_JOB_NUMBER:
      return updateJobNumber(payload, state);
    case CLOCK_IN:
      return clickIn(payload, state);
    case CLOCK_OUT:
      return clockOut(payload, state);
    case GO_TO_LUNCH:
      return toLunch(payload, state);
    case BACK_FROM_LUNCH:
      return fromLunch(payload, state);

    // DELETE
    case DELETE_EMPLOYEE:
      return deleteEmployee(payload, state);
    case DELETE_LABOR_TYPE:
      return deleteLaborType(payload, state);
    case DELETE_JOB_NUMBER:
      return deleteJobNumber(payload, state);
    case BULK_DELETE:
      return bulkDelete(payload, state);

    // OTHER
    case UPDATE_DELETIONS:
      return updateDeletions(payload, state);
    case TOGGLE_TYPE:
      return toggleType(payload, state);

    default:
    return state;
  }
}
