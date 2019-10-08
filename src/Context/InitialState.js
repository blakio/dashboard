import data from "./data";

const initialState = {
  isAdminMode: true,
  isClockedIn: false,
  isAtLunch: false,
  deletions: {
    laborTypes: [],
    projectTypes: [],
    jobNumbers: [],
    employees: []
  },
  clickedTypes: [],
  ...data
};

export default initialState;
