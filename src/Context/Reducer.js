import Types from "./Types";
import StateFunctions from "./StateFunctions";

export default (state, action) => {
  const { payload } = action;
  console.table(action)

  switch(action.type){
    // GET
    case Types.GET_EMPLOYEES:
      return StateFunctions.getEmployees(payload, state);

    // SET
    case Types.SET_EMPLOYEES:
      return StateFunctions.setEmployees(payload, state);
    case Types.SET_JOB_NUMBERS:
      return StateFunctions.setJobNumbers(payload, state);
    case Types.SET_LABOR_TYPES:
      return StateFunctions.setLaborTypes(payload, state);

    // CREATE
    case Types.CREATE_EMPLOYEE:
      return StateFunctions.createEmployee(payload, state);
    case Types.CREATE_LABOR_TYPE:
      return StateFunctions.createLaborType(payload, state);
    case Types.CREATE_JOB_NUMBER:
      return StateFunctions.createJobNumber(payload, state);

    case Types.CLOCK_IN:
      return StateFunctions.clickIn(payload, state);
    case Types.CLOCK_OUT:
      return StateFunctions.clockOut(payload, state);
    case Types.GO_TO_LUNCH:
      return StateFunctions.toLunch(payload, state);
    case Types.BACK_FROM_LUNCH:
      return StateFunctions.fromLunch(payload, state);

    // UPDATE
    case Types.UPDATE_EMPLOYEE:
      return StateFunctions.updateEmployee(payload, state);

    // DELETE
    case Types.DELETE_EMPLOYEE:
      return StateFunctions.deleteEmployee(payload, state);
    case Types.DELETE_LABOR_TYPE:
      return StateFunctions.deleteLaborType(payload, state);
    case Types.DELETE_JOB_NUMBER:
      return StateFunctions.deleteJobNumber(payload, state);
    case Types.BULK_DELETE:
      return StateFunctions.bulkDelete(payload, state);

    // OTHER
    case Types.UPDATE_DELETIONS:
      return StateFunctions.updateDeletions(payload, state);
    case Types.RESET_DELETIONS:
      return StateFunctions.resetDeletions(payload, state);
    case Types.TOGGLE_TYPE:
      return StateFunctions.toggleType(payload, state);
    case Types.TOGGLE_ADMIN_MODE:
      return StateFunctions.toggleAdminMode(payload, state);

    case Types.SELECT_EMPLOYEE:
      return StateFunctions.selectEmployee(payload, state);
    case Types.SELECT_LABOR_TYPE:
      return StateFunctions.selectLaborType(payload, state);
    case Types.SELECT_JOB_NUMBER:
      return StateFunctions.selectJobNumber(payload, state);

    case Types.SET_ACTION_BUTTONS:
      return StateFunctions.setActiveButtons(payload, state);

    default:
    return state;
  }
}
