// import countdown action types
import { START_COUNTDOWN, STOP_COUNTDOWN, PAUSE_COUNTDOWN, DECREMENT_TIMER,
            SWITCH_TO_ACTIVITY_MODE, SWITCH_TO_BREAK_MODE, UPDATE_TIMES} from '../actions/countdownActions'


const ACTIVITY_TIME = 3 // 20 min
const BREAK_TIME = 3 // 5 min
const COUNTDOWN_ACTIVITY_MODE = 'COUNTDOWN_ACTIVITY_MODE'
const COUNTDOWN_BREAK_MODE = 'COUNTDOWN_BREAK_MODE'

const initialState = {
    // default values
    activityTime: 1200,
    breakTime: 300,
    isCountdownRunning: false,
    countdownMode: COUNTDOWN_ACTIVITY_MODE,
    countdownTime: 0,
    backgroundColor: '#F5FCFF'
}

export default function countdownReducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_TIMES:
            return {
                ...state,
                activityTime: action.payload.activityTime,
                breakTime: action.payload.breakTime,
                countdownTime: action.payload.activityTime
            }
        case START_COUNTDOWN:
            return {
                ...state,
                isCountdownRunning: true,
                backgroundColor: (state.countdownMode === COUNTDOWN_ACTIVITY_MODE) ? '#ffdbb0' : 'green'
            }
        case STOP_COUNTDOWN:
            return {
                ...state,
                isCountdownRunning: false,
                countdownMode: COUNTDOWN_ACTIVITY_MODE,
                countdownTime: state.activityTime,
                backgroundColor: '#F5FCFF'
            }
        case PAUSE_COUNTDOWN:
            return {
                ...state,
                isCountdownRunning: false
            }
        case SWITCH_TO_ACTIVITY_MODE:
            return {
                ...state,
                countdownMode: COUNTDOWN_ACTIVITY_MODE,
                countdownTime: state.activityTime,
                backgroundColor: '#ffdbb0'
            }
        case SWITCH_TO_BREAK_MODE:
            return {
                ...state,
                countdownMode: COUNTDOWN_BREAK_MODE,
                countdownTime: state.breakTime,
                backgroundColor: 'green'
            }
        case DECREMENT_TIMER:
            return {
                ...state,
                countdownTime: state.countdownTime - 1
            }
        default: 
            return state;
    }
}