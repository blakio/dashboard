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
    const a = [true, true, true, true, true, true, true, true, true, true];
    const c = [false, false, true, true, false, true, false, false, true, true];
    const tt = [0, 0, 1, 2, 0, 1, 0, 0, 2, 3];
    const e = ["E01", "E02", "E03", "E04", "E05", "E06", "E07", "E08", "E09", "E10"];
    const t = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10"];
    e.forEach((data, index) => {
      axios.post("https://dashboard-api-02.herokuapp.com/api/employees", {
        isActive: a[index],
        isContractor: c[index],
        jobTitle: t[index],
        name: data,
        travelTime: tt[index]
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
  }
};
