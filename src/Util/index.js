export default {

  isEmployeeClockedIn: (employee) => {
    return employee.clockInTime && employee.clockInTime.length;
  },

  isEmployeeAtLunch: (employee) => {
    return employee.startLunch && employee.startLunch.length;
  },

  isEmployeeFromLunch: (employee) => {
    return employee.endLunch && employee.endLunch.length;
  },

  isEmployeeClockedOut: (employee) => {
    return employee.clockOutTime && employee.clockOutTime.length;
  },

  getActionButtons: (isClockedIn, isAtLunch, isFromLunch, isClockedOut) => {
    let activeButtonsList = ["trash", "deactivate"];
    if(!isClockedIn){
      activeButtonsList.push("clock in")
    } else if (!isAtLunch) {
      activeButtonsList.push("to lunch")
      activeButtonsList.push("clock out")
    } else if (!isFromLunch) {
      activeButtonsList.push("from lunch")
      activeButtonsList.push("clock out")
    } else if (!isClockedOut) {
      activeButtonsList.push("clock out")
    }
    return activeButtonsList;
  }

}
