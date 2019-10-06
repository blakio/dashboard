import data from "./data";

const initialState = {
  isAdminMode: true,
  deletions: {
    laborTypes: [],
    projectTypes: [],
    jobNumbers: [],
    employees: []
  },
  ...data
};

export default initialState;
