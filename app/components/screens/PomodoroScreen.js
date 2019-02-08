import React from "react";
import { Container, Content, Button, Icon } from 'native-base'

import Countdown from "../countdown/Countdown";
import Tasks from "../tasks/Tasks";

import {AsyncStorage} from 'react-native';

// redux related stuff
import { connect } from 'react-redux'
import { updateTimes } from '../../redux/actions/countdownActions'

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
    this._loadSettingsFromAsyncStorage()
  }

  _loadSettingsFromAsyncStorage = async () => {
    try {
      const activityTime = await AsyncStorage.getItem('activityTime');
      const breakTime = await AsyncStorage.getItem('breakTime');
      if (activityTime !== null && breakTime !== null) {
        // if we have data stored in asyncstorage, load it into redux state
        console.log("received data from storage, saving it into state")
        this.props.updateTimes(activityTime, breakTime)
        console.log("activityTime", activityTime);
        console.log("breakTime", breakTime);
      }
      else
      {
        // if no data retrieved from storage -> get default data from redux state and
        // save it into storage
        console.log("no data in storage, saving default from state")
        this._saveSettingsFromStateToStorage(this.props.settings.activityTime, this.props.settings.breakTime)        
      }
    } catch (error) {
      console.log(error)
    }
  };

  _saveSettingsFromStateToStorage = async (activityTime, breakTime) => {
    try {
      await AsyncStorage.setItem('activityTime', activityTime.toString());
      await AsyncStorage.setItem('breakTime', breakTime.toString());
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
      countdown: state.countdown,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      updateTimes: (activityTime, breakTime) => dispatch(updateTimes(activityTime, breakTime)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PomodoroScreen);