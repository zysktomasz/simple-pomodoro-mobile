export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'

export const updateSettings = (playSoundOnCountdownEnd) => {
    return {
        type: UPDATE_SETTINGS,
        payload: {
            playSoundOnCountdownEnd: playSoundOnCountdownEnd
        }
    }
}