import React from 'react';
import { View, Text } from 'react-native';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings",
  }

  render() {
    return (  
      <View style={{flex: 1}}>
        <Text>Tutaj beda ustawienia</Text>
      </View>
    );
  }
}

export default SettingsScreen