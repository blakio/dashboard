import axios from "axios";
import moment from "moment";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'https://dashboard-api-02.herokuapp.com/api/'
});

export default {
  get: async (path, params, fn) => {
    await instance.get(path, { params })
      .then(function (response) {
        if(fn) fn(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
        // if(fn) fn();
     });
  },
  post: async (path, obj, fn) => {
    await instance.post(path, obj)
      .then(function (response) {
        if(fn) fn(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  put: async (path, obj, fn) => {
    await instance.put(path, obj)
      .then(function (response) {
        if(fn) fn(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  delete: async (path, obj, fn) => {
    await instance.delete(path, obj)
      .then(function (response) {
        if(fn) fn(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  clockIn: (id, fn) => {
    let url = `https://dashboard-api-02.herokuapp.com/api/employees/`
    url += id
    axios.put(url, {
      clockInTime: moment().format("YYYY/MM/DD HH:mm:ss")
    })
    .then(data => fn())
    .catch(error => { console.log(error) });
  },
  startLunch: (id, fn) => {
    let url = `https://dashboard-api-02.herokuapp.com/api/employees/`
    url += id
    axios.put(url, {
      startLunch: moment().format("YYYY/MM/DD HH:mm:ss")
    }).then(data => fn())
      .catch(error => console.log(JSON.stringify(error)));
  },
  endLunch: (id, fn) => {
    let url = `https://dashboard-api-02.herokuapp.com/api/employees/`
    url += id
    axios.put(url, {
      endLunch: moment().format("YYYY/MM/DD HH:mm:ss")
    }).then(data => fn())
    .catch(error => console.log(JSON.stringify(error)) );
  },
  clockOut: (id, fn) => {
    let url = `https://dashboard-api-02.herokuapp.com/api/employees/`
    url += id
    axios.put(url, {
      clockOutTime: moment().format("YYYY/MM/DD HH:mm:ss")
    }).then(data => fn())
      .catch(error => console.log(error));
  }
};
