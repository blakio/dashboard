import axios from "axios";

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
  }
};
