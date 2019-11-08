import moment from "moment";
import util from "./util";

export default {

  breakRefAndCopy: obj => (JSON.parse(JSON.stringify(obj))),

  getLaborType: state => {
    if(state.selectedItems.laborTypes[0]) return state.selectedItems.laborTypes[0].name;
    return state.selectedItems.employees[0].laborType
  },

  getJobNumber: state => {
    if(state.selectedItems.jobNumbers[0]) return state.selectedItems.jobNumbers[0].number;
    return state.selectedItems.employees[0].jobNumber
  },
  formatCSVData: (data) => {
    const csvData = [];
    data.forEach(data => {
      const usedData = util.breakRefAndCopy(data)
      delete usedData.createdAt;
      delete usedData.updatedAt;
      delete usedData.jobTitle;

      usedData.clockInTime = util.getTime("clockInTime", data);
      usedData.clockOutTime = util.getTime("clockOutTime", data);
      usedData.endLunch = util.getTime("endLunch", data);
      usedData.startLunch = util.getTime("startLunch", data);
      usedData.lunchTime = usedData.lunchTime || "no lunch taken"
      usedData.isContractor = data.isContractor ? "yes" : "no";
      usedData.totalHrs = (parseInt(data.totalHrs) / 60).toFixed(2);
      usedData.overTime = (parseInt(data.overTime) / 60).toFixed(2);
      usedData.lunchTime = (parseInt(data.lunchTime) / 60).toFixed(2);

      if(csvData.length === 0){
        const headers = [];
        const headersKeys = Object.keys(usedData);
        headersKeys.forEach(data => {
          const head = util.getHeader[data] || data;
          headers.push(head)
        })
        csvData.push(headers)
      }
      const innerData = [];
      for(let i in usedData){
        innerData.push(usedData[i]);
      }
      csvData.push(innerData);
    })
    return csvData;
  }
}
