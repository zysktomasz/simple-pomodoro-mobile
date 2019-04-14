// action types
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const TOGGLE_CHECKED = "TOGGLE_CHECKED";

// action creators

// adds new task with name from params and id, checked flag specified in tasksReducer
export const addTask = name => {
  return {
    type: ADD_TASK,
    payload: {
      name
    }
  };
};

// deletes task from array by its id
export const deleteTask = id => {
  return {
    type: DELETE_TASK,
    payload: {
      id
    }
  };
};

// toggle task's checked flag based on task's id
export const toggleChecked = id => {
  return {
    type: TOGGLE_CHECKED,
    payload: {
      id
    }
  };
};
