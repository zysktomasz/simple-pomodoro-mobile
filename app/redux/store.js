import { createStore, combineReducers } from 'redux'

import countdownReducer from './countdownReducer'
import tasksReducer from './tasksReducer'
import settingsReducer from './settingsReducer'

const allReducers = combineReducers({
    countdown: countdownReducer,
    tasks: tasksReducer,
    settings: settingsReducer
})

const store = createStore(allReducers)

export default store