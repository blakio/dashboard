import moment from "moment";

export default {

  breakRefAndCopy: obj => (JSON.parse(JSON.stringify(obj))),

  getTime: (field, data) => {
    let time = (data[field] ? moment.utc(data[field]).local().format("hh:mm:ssA") : "no time recorded");
    return time;
  },

  getHeader: {
    clockInTime: "Clock In Time",
    clockOutTime: "Clock Out Time",
    date: "Date",
    endLunch: "Lunch End Time",
    id: "Employee ID",
    isContractor: "Is A Contractor",
    jobNumber: "Job Number",
    laborType: "Labor Type",
    lunchTime: "Lunch Total Time (hrs)",
    name: "Employee Name",
    startLunch: "Lunch Start Time",
    totalHrs: "Total Hours Worked (hrs)",
    overTime: "Total Overtime (hrs)"
  }

}
