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
  DELETE_JOB_NUMBER,

  BULK_DELETE,
  UPDATE_DELETIONS,
  CLOCK_IN,
  CLOCK_OUT,
  GO_TO_LUNCH,
  BACK_FROM_LUNCH
} from "./Types";

import {
  createEmployee,
  createLaborType,
  createProjectType,
  createJobNumber,
  getEmployee,
  getLaborType,
  getProjectType,
  getJobNumber,
  updateEmployee,
  updateLaborType,
  updateProjectType,
  updateJobNumber,
  deleteEmployee,
  deleteLaborType,
  deleteProjectType,
  deleteJobNumber,
  bulkDelete,
  updateDeletions,
  clickIn,
  clockOut,
  toLunch,
  fromLunch
} from "./StateFunctions";

export default (state, action) => {
  switch(action.type){
    case CREATE_EMPLOYEE:
      return createEmployee(action.payload, state);
    case CREATE_LABOR_TYPE:
      return createLaborType(action.payload, state);
    case CREATE_PROJECT_TYPE:
      return createProjectType(action.payload, state);
    case CREATE_JOB_NUMBER:
      return createJobNumber(action.payload, state);

    case GET_EMPLOYEE:
      return getEmployee(action.payload, state);
    case GET_LABOR_TYPE:
      return getLaborType(action.payload, state);
    case GET_PROJECT_TYPE:
      return getProjectType(action.payload, state);
    case GET_JOB_NUMBER:
      return getJobNumber(action.payload, state);

    case UPDATE_EMPLOYEE:
      return updateEmployee(action.payload, state);
    case UPDATE_LABOR_TYPE:
      return updateLaborType(action.payload, state);
    case UPDATE_PROJECT_TYPE:
      return updateProjectType(action.payload, state);
    case UPDATE_JOB_NUMBER:
      return updateJobNumber(action.payload, state);

    case DELETE_EMPLOYEE:
      return deleteEmployee(action.payload, state);
    case DELETE_LABOR_TYPE:
      return deleteLaborType(action.payload, state);
    case DELETE_PROJECT_TYPE:
      return deleteProjectType(action.payload, state);
    case DELETE_JOB_NUMBER:
      return deleteJobNumber(action.payload, state);

    case BULK_DELETE:
      return bulkDelete(action.payload, state);
    case UPDATE_DELETIONS:
      return updateDeletions(action.payload, state);
    case CLOCK_IN:
      return clickIn(action.payload, state);
    case CLOCK_OUT:
      return clockOut(action.payload, state);
    case GO_TO_LUNCH:
      return toLunch(action.payload, state);
    case BACK_FROM_LUNCH:
      return fromLunch(action.payload, state);

    default:
    return state;
  }
}
