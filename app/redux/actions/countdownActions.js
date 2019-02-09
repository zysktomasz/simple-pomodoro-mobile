const COUNTDOWN_ACTIVITY_MODE = 'focus'
const COUNTDOWN_BREAK_MODE = 'chill'

// actions types
export const START_COUNTDOWN = 'START_COUNTDOWN'
export const STOP_COUNTDOWN = 'STOP_COUNTDOWN'
export const PAUSE_COUNTDOWN = 'PAUSE_COUNTDOWN'
export const DECREMENT_TIMER = 'DECREMENT_TIMER'

export const UPDATE_TIMES = 'UPDATE_TIMES'

export const SWITCH_TO_ACTIVITY_MODE = 'SWITCH_TO_ACTIVITY_MODE'
export const SWITCH_TO_BREAK_MODE = 'SWITCH_TO_BREAK_MODE'

// action creators

export const updateTimes = (activityTime, breakTime) => {
    return {
        type: UPDATE_TIMES,
        payload: {
            activityTime,
            breakTime
        }
    }
}

export const startCountdown = () => {
    return {
        type: START_COUNTDOWN
    }
}

export const stopCountdown = () => {
    return {
        type: STOP_COUNTDOWN
    }
}

export const pauseCountdown = () => {
    return {
        type: PAUSE_COUNTDOWN
    }
}

export const decrementTimer = () => {
    return {
        type: DECREMENT_TIMER
    }
}

export const toggleMode = (currentMode) => {
    let type = (currentMode === COUNTDOWN_ACTIVITY_MODE) ? SWITCH_TO_BREAK_MODE : SWITCH_TO_ACTIVITY_MODE
    return {
        type
    }
}