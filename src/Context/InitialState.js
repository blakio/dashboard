import data from "./data";

const initialState = {
  isAdminMode: false,
  deletions: {
    laborTypes: [],
    projectTypes: [],
    jobNumbers: [],
    employees: []
  },
  ...data
};

export default initialState;
