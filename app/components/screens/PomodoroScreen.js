import React from "react";
import { View, Button } from "react-native";

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

export default PomodoroScreen;