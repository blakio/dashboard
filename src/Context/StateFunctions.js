const breakRefAndCopy = (obj) => JSON.parse(JSON.stringify(obj));

export const createEmployee = (payload, state) => {
  return state;
}

export const createLaborType = (payload, state) => {
  const currentState = breakRefAndCopy(state);
  const { laborTypes } = currentState;
  if(laborTypes.indexOf(payload) === -1) laborTypes.push(payload.toUpperCase())
  return {
    ...state,
    laborTypes
  };
}

export const createProjectType = (payload, state) => {
  const currentState = breakRefAndCopy(state);
  const { projectTypes } = currentState;
  if(projectTypes.indexOf(payload) === -1) projectTypes.push(payload.toUpperCase())
  return {
    ...state,
    projectTypes
  };
}

export const createJobNumber = (payload, state) => {
  const currentState = breakRefAndCopy(state);
  const { jobNumbers } = currentState;
  if(jobNumbers.indexOf(payload) === -1) jobNumbers.push(payload.toUpperCase())
  return {
    ...state,
    jobNumbers
  };
}

export const getEmployee = (payload, state) => {
  return state;
}

export const getLaborType = (payload, state) => {
  return state;
}

export const getProjectType = (payload, state) => {
  return state;
}

export const getJobNumber = (payload, state) => {
  return state;
}

export const updateEmployee = (payload, state) => {
  return state;
}

export const updateLaborType = (payload, state) => {
  return state;
}

export const updateProjectType = (payload, state) => {
  return state;
}

export const updateJobNumber = (payload, state) => {
  return state;
}

export const deleteEmployee = (payload, state) => {
  return state;
}

export const deleteLaborType = (payload, state) => {
  const currentState = breakRefAndCopy(state);
  const { laborTypes } = currentState;
  let indexOfPayload;
  laborTypes.forEach((data, index) => {
    if(data.toLowerCase() === payload.toLowerCase()){
      indexOfPayload = index
    }
  })
  laborTypes.splice(indexOfPayload, 1);
  return {
    ...state,
    laborTypes
  };
}

export const deleteProjectType = (payload, state) => {
  const currentState = breakRefAndCopy(state);
  const { projectTypes } = currentState;
  debugger
  let indexOfPayload;
  projectTypes.forEach((data, index) => {
    if(data.toLowerCase() === payload.toLowerCase()){
      indexOfPayload = index
    }
  })
  projectTypes.splice(indexOfPayload, 1);
  return {
    ...state,
    projectTypes
  };
}

export const deleteJobNumber = (payload, state) => {
  const currentState = breakRefAndCopy(state);
  const { jobNumbers } = currentState;
  let indexOfPayload;
  jobNumbers.forEach((data, index) => {
    if(data.toLowerCase() === payload.toLowerCase()){
      indexOfPayload = index
    }
  })
  jobNumbers.splice(indexOfPayload, 1);
  return {
    ...state,
    jobNumbers
  };
}
