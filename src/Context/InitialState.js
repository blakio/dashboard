const initialState = {
  isAdminMode: false,
  isAdminLoggedIn: true,
  deletions: {
    laborTypes: [],
    jobNumbers: [],
    employees: []
  },
  clickedTypes: [],
  laborTypes: [],
  jobNumbers: [],
  employees: [],
  selectedEmployee: "",
  selectedLaborType: "",
  selectedJobNumber: "",
  activeButtonsList: []
};

export default initialState;
