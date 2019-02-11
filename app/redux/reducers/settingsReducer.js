import { UPDATE_SETTINGS } from '../actions/settingsActions'

const initialState = {
    playSoundOnCountdownEnd: true
}

export default function settingsReducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_SETTINGS:
            return {
                ...state,
                playSoundOnCountdownEnd: action.payload.playSoundOnCountdownEnd
            }
        default: 
            return state;
    }
}