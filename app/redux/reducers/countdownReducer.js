// import countdown action types
import { START_COUNTDOWN, STOP_COUNTDOWN, PAUSE_COUNTDOWN, DECREMENT_TIMER,
            SWITCH_TO_ACTIVITY_MODE, SWITCH_TO_BREAK_MODE, UPDATE_TIMES,
            UPDATE_TIME_BY_60_SECONDS} from '../actions/countdownActions'


const COUNTDOWN_ACTIVITY_MODE = 'focus'
const COUNTDOWN_BREAK_MODE = 'chill'

const initialState = {
    // default values
    activityTime: 1200,
    breakTime: 300,
    isCountdownRunning: false,
    countdownMode: COUNTDOWN_ACTIVITY_MODE,
    countdownTime: 0,
    wheelColor: 'orange'
}

export default function countdownReducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_TIME_BY_60_SECONDS:
            return {
                ...state,
                countdownTime: (action.payload.operation === "minus") ? state.countdownTime - 60 : state.countdownTime + 60
            }
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
                wheelColor: (state.countdownMode === COUNTDOWN_ACTIVITY_MODE) ? 'orange' : 'green'
            }
        case STOP_COUNTDOWN:
            return {
                ...state,
                isCountdownRunning: false,
                countdownMode: COUNTDOWN_ACTIVITY_MODE,
                countdownTime: state.activityTime,
                wheelColor: 'orange'
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
                wheelColor: 'orange'
            }
        case SWITCH_TO_BREAK_MODE:
            return {
                ...state,
                countdownMode: COUNTDOWN_BREAK_MODE,
                countdownTime: state.breakTime,
                wheelColor: 'green'
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