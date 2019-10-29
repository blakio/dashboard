const initialState = {
  isAdminMode: false,
  isAdminLoggedIn: true,
  message: {
    confirmation: {
      status: false,
      message: ""
    },
    error: {
      status: false,
      message: ""
    },
    warning: {
      status: false,
      message: ""
    }
  },
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
