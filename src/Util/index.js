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
    const csvData = [
      ["firstname", "lastname", "email"],
      ["Ahmed", "Tomi", "ah@smthing.co.com"],
      ["Raed", "Labes", "rl@smthing.co.com"],
      ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    ];
    return csvData;
  }
}
