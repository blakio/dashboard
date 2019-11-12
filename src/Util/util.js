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
    lunchTime: "Lunch Total Time",
    name: "Employee Name",
    startLunch: "Lunch Start Time",
    totalHrs: "Total Hours Worked",
    overTime: "Total Overtime (hrs)"
  },

  getTimeFromString: (time) => {
    if(time === "Invalid date") return "0";
    const split = time.split(":");
    return `${split[0] || 0} hr : ${split[1] || 0} min : ${split[2] || 0} sec`;
  }

}
