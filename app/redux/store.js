import { createStore, combineReducers } from "redux";

import countdownReducer from "./reducers/countdownReducer";
import tasksReducer from "./reducers/tasksReducer";
import settingsReducer from "./reducers/settingsReducer";

const allReducers = combineReducers({
  countdown: countdownReducer,
  tasks: tasksReducer,
  settings: settingsReducer
});

const store = createStore(allReducers);

export default store;
