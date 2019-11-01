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
  selectedItems: {
    laborTypes: [],
    jobNumbers: [],
    employees: []
  },
  laborTypes: [],
  jobNumbers: [],
  employees: [],
};

export default initialState;
