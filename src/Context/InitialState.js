const initialState = {
  isAdminMode: false,
  isAdminLoggedIn: true,
  isClockedIn: false,
  isAtLunch: false,
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
