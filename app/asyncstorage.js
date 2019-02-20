import {AsyncStorage} from 'react-native';

// saves data from parameters (redux store) to async storage
export const _saveSettingsFromStateToStorage = async (activityTime, breakTime, playSoundOnCountdownEnd, playSoundOnCountdownLastTicks) => {
    try {
      await AsyncStorage.setItem('activityTime', activityTime.toString());
      await AsyncStorage.setItem('breakTime', breakTime.toString());
      await AsyncStorage.setItem('playSoundOnCountdownEnd', playSoundOnCountdownEnd.toString())
      await AsyncStorage.setItem('playSoundOnCountdownLastTicks', playSoundOnCountdownLastTicks.toString())
      console.log("saved data to storage")
    } catch (error) {
      console.log(error)
    }
  };


// loads settings from async storage
// returns null - if there aren't any settings in storage (so that we can .then() save default settings)
// returns settings objects - if there are settings in storage (so .then() we update state with these settings)
export const  _loadSettingsFromAsyncStorage = async () => {
    try {
        const activityTime = await AsyncStorage.getItem('activityTime');
        const breakTime = await AsyncStorage.getItem('breakTime');
        const playSoundOnCountdownEnd = await AsyncStorage.getItem('playSoundOnCountdownEnd');
        const playSoundOnCountdownLastTicks = await AsyncStorage.getItem('playSoundOnCountdownLastTicks');
        if (activityTime !== null || breakTime !== null || playSoundOnCountdownEnd !== null
            || playSoundOnCountdownLastTicks !== null) {
            return {
                activityTime,
                breakTime,
                playSoundOnCountdownEnd,
                playSoundOnCountdownLastTicks
            }
        }
        else
        {
            return null   
        }
    } catch (error) {
        console.log(error)
    }
    };