import data from "./data";

const initialState = {
  isAdminMode: false,
  isClockedIn: true,
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
