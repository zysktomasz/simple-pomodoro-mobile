import React from "react";
import { View, Button } from "react-native";
import { connect } from 'react-redux'

import Countdown from "../countdown/Countdown";
import Tasks from "../tasks/Tasks";

class PomodoroScreen extends React.Component {
  static navigationOptions =  ({ navigation }) => {
    return {
      title: "Pomodoro",
      headerRight: <Button title="settings" onPress={() => navigation.navigate('Settings')}/>
    }
  };

  render() {
    return (
      <View style={{ backgroundColor: "#F5FCFF", flex: 1 }}>
        <Countdown />
        <Tasks />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    countdown: state.countdown,
    tasks: state.tasks,
    settings: state.settings
  }
}

export default connect(mapStateToProps)(PomodoroScreen);