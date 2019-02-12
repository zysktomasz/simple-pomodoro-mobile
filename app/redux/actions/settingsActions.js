export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'

export const updateSettings = (playSoundOnCountdownEnd, playSoundOnCountdownLastTicks) => {
    return {
        type: UPDATE_SETTINGS,
        payload: {
            playSoundOnCountdownEnd,
            playSoundOnCountdownLastTicks
        }
    }
}