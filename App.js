import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'

import PomodoroScreen from './app/components/screens/PomodoroScreen'
import SettingsScreen from './app/components/screens/SettingsScreen'


const AppNavigator = createStackNavigator(
  {
  Pomodoro: PomodoroScreen,
  Settings: SettingsScreen
  },
  {
    initialRouteName: "Pomodoro"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}