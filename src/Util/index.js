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
      delete data.createdAt;
      delete data.updatedAt;
      if(csvData.length === 0){
        const headers = Object.keys(data);
        csvData.push(headers);
      }
      const innerData = [];
      for(let i in data){
        innerData.push(data[i]);
      }
      csvData.push(innerData);
    })
    return csvData;
  }
}
