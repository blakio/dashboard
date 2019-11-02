export default {

  breakRefAndCopy: obj => (JSON.parse(JSON.stringify(obj))),

  getLaborType: state => (state.selectedItems.laborTypes[0].name),

  getJobNumber: state => state.selectedItems.jobNumbers[0].number
}
