import axios from "axios";
import moment from "moment";
import Types from "../Context/Types.js";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'https://dashboard-api-02.herokuapp.com/api/'
});

export default {
  get: async (path, params, fn) => {
    await instance.get(path, { params })
      .then(response => { fn && fn(response) })
      .catch(error => console.log(error));
  },
  post: async (path, obj, fn, errorFn) => {
    await instance.post(path, obj)
      .then(response => { fn && fn(response) })
      .catch(error => {
        console.log(error);
        if(errorFn) errorFn(error)
      });
  },
  put: async (path, obj, fn) => {
    await instance.put(path, obj)
      .then(response => { fn && fn(response) })
      .catch(error => console.log(error));
  },
  delete: async (path, obj, fn) => {
    await instance.delete(path, obj)
      .then(response => { fn && fn(response) })
      .catch(error => console.log(error));
  },
  seed: () => {
    const c = [false, false, false, false, false, false, false, false, false, false, false, false, true, true];
    const tt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2];
    const e = ["Mike Kowal", "Ryan McWilliams", "Joseph Nees", "Bill Croissette, Jr.", "Paul Wick", "Paul Bement", "Mark Schoonover", "Ben Vehabovic", "Shawn Savitz", "Craig Fuller", "Courtney Johnson", "Michael Clucas", "Lisa Thomas", "Amber", "Bill Croissette", "Jake Shellhammer"];
    const t = ["Shop Manager", "Mechanic/Tech", "Mechanic/Tech", "Mechanic/Tech", "Mechanic/Tech", "Department Manager", "Project Manager", "Application Engineer", "Designer", "Project Manager", "Project Manager and Production Planner", "Project Manager", "Office Administrator", "Shipper/Receiver", "Welder", "Welder"];
    const j = ["35000123", "35000234", "35000345", "35000456", "35000567", "35000678", "35000789", "35000891", "35000912", "35000321", "Other"];
    const l = ["Base", "Crate", "DP Switch", "adder: flex house", "pipping assembly", "adder: pumps", "paint", "rework", "test", "Other"];

    e.forEach((data, index) => {
      axios.post("https://dashboard-api-02.herokuapp.com/api/employees", {
        isActive: true,
        isContractor: c[index],
        jobTitle: t[index],
        name: data,
        travelTime: tt[index]
      })
    })
    j.forEach((data, index) => {
      axios.post("https://dashboard-api-02.herokuapp.com/api/jobs", {
        number: data,
        isActive: true
      })
    })
    l.forEach((data, index) => {
      axios.post("https://dashboard-api-02.herokuapp.com/api/laborTypes", {
        name: data,
        isActive: true
      })
    })
  },
  clockIn: (id, obj, fn) => {
    let url = `https://dashboard-api-02.herokuapp.com/api/clockin/${id}`;
    axios.put(url,  obj)
    .then(data => {if(fn) fn()})
    .catch(error => { console.log(error) });
  },
  startLunch: (id, obj, fn) => {
    let url = `https://dashboard-api-02.herokuapp.com/api/startlunch/${id}`;
    axios.put(url, obj)
      .then(data => {if(fn) fn()})
      .catch(error => console.log(JSON.stringify(error)));
  },
  endLunch: (id, obj, fn) => {
    let url = `https://dashboard-api-02.herokuapp.com/api/endlunch/${id}`;
    axios.put(url, obj)
    .then(data => {if(fn) fn()})
    .catch(error => console.log(JSON.stringify(error)));
  },
  clockOut: (id, obj, fn) => {
    let url = `https://dashboard-api-02.herokuapp.com/api/clockout/${id}`;
    axios.put(url, obj)
      .then(data => {if(fn) fn()})
      .catch(error => console.log(error));
  },
  reset: async (id, fn) => {
    const resetEmployee = await axios.put(`https://dashboard-api-02.herokuapp.com/api/reset/${id}`, {});
    const fetchEmployees = await axios.get("https://dashboard-api-02.herokuapp.com/api/employees");
    fn(fetchEmployees);
  },
  updateEmployee: (id, laborType, jobNumber, fn) => {
    let url = `https://dashboard-api-02.herokuapp.com/api/employees/`
    const updates = {};
    if(laborType.length){
      updates.laborType = laborType
    }
    if(jobNumber){
      updates.jobNumber = jobNumber
    }
    axios.put(url + id, updates).then(response => fn());
  },
  fetchEmployees: async (dispatch) => {
    const response = await axios.get("https://dashboard-api-02.herokuapp.com/api/employees");
    dispatch({
      type: Types.SET_EMPLOYEES,
      payload: response.data
    })
  },
  fetchLaborTypes: async (dispatch) => {
    const response = await axios.get("https://dashboard-api-02.herokuapp.com/api/labortypes");
    dispatch({
      type: Types.SET_LABOR_TYPES,
      payload: response.data
    })
  },
  fetchJobNumbers: async (dispatch) => {
    const response = await axios.get("https://dashboard-api-02.herokuapp.com/api/jobs");
    dispatch({
      type: Types.SET_JOB_NUMBERS,
      payload: response.data
    })
  },
  getCsvData: async (payload) => {
    const {
      dispatch,
      startDate,
      endDate
    } = payload;
    const response = await axios.post("https://dashboard-api-02.herokuapp.com/api/history", {
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD")
    });
    dispatch({
      type: Types.SET_CSV_DATA,
      payload: {
        data: response.data,
        startDate: moment(startDate).format("YYYY-MM-DD"),
        endDate: moment(endDate).format("YYYY-MM-DD")
      }
    })
  }
};
