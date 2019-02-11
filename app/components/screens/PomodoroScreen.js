import React from "react";
import { Container, Content, Button, Icon } from 'native-base'

import Countdown from "../countdown/Countdown";
import Tasks from "../tasks/Tasks";

import {AsyncStorage} from 'react-native';

// redux related stuff
import { connect } from 'react-redux'
import { updateTimes } from '../../redux/actions/countdownActions'
import { updateSettings } from '../../redux/actions/settingsActions'


class PomodoroScreen extends React.Component {
  static navigationOptions =  ({ navigation }) => {
    return {
      title: "Pomodoro",
      headerRight: (
        <Button transparent
            style={{marginTop: 7}}
            onPress={() => navigation.navigate('Settings')}>
            <Icon name='cog' style={{color: "black"}}/>
        </Button>
      )
    }
  };

  componentDidMount() {
    // this.props.updateTimes(3, 5)
    // this._saveSettingsFromStateToStorage(3, 5)
    this._loadSettingsFromAsyncStorage()
  }

  // poorly written, should fix
  _loadSettingsFromAsyncStorage = async () => {
    try {
      const activityTime = await AsyncStorage.getItem('activityTime');
      const breakTime = await AsyncStorage.getItem('breakTime');
      const playSoundOnCountdownEnd = await AsyncStorage.getItem('playSoundOnCountdownEnd');
      if (activityTime !== null && breakTime !== null && playSoundOnCountdownEnd !== null) {
        // if we have data stored in asyncstorage, load it into redux state
        this.props.updateTimes(activityTime, breakTime)

        // converts string to boolean
        this.props.updateSettings((playSoundOnCountdownEnd == 'true'))
        console.log("received data from storage, saving it into state")
        console.log("activityTime", activityTime);
        console.log("breakTime", breakTime);
        console.log("playSoundOnCountdownEnd", playSoundOnCountdownEnd)
      }
      else
      {
        // if no data retrieved from storage -> get default data from redux state and
        // save it into storage
        console.log("no data in storage, saving default from state")
        this._saveSettingsFromStateToStorage(
          this.props.countdown.activityTime, 
          this.props.countdown.breakTime, 
          this.props.settings.playSoundOnCountdownEnd)        
      }
    } catch (error) {
      console.log(error)
    }
  };

  _saveSettingsFromStateToStorage = async (activityTime, breakTime, playSoundOnCountdownEnd) => {
    try {
      await AsyncStorage.setItem('activityTime', activityTime.toString());
      await AsyncStorage.setItem('breakTime', breakTime.toString());
      await AsyncStorage.setItem('playSoundOnCountdownEnd', playSoundOnCountdownEnd.toString())
      console.log("saved data to storage")
    } catch (error) {
      console.log(error)
    }
  };

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flex:1}}>
          <Countdown />
          <Tasks />
        </Content>
      </Container>
    );
  }
}

// export default PomodoroScreen;

const mapStateToProps = state => {
  return {
      settings: state.settings,
      countdown: state.countdown,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      updateTimes: (activityTime, breakTime) => dispatch(updateTimes(activityTime, breakTime)),
      updateSettings: (playSoundOnCountdownEnd) => dispatch(updateSettings(playSoundOnCountdownEnd))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PomodoroScreen);