import data from "./data";

const initialState = {
  isAdminMode: false,
  isClockedIn: false,
  isAtLunch: false,
  deletions: {
    laborTypes: [],
    jobNumbers: [],
    employees: []
  },
  clickedTypes: [],
  ...data
};

export default initialState;
