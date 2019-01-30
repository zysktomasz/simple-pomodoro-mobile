import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import Countdown from './Countdown';
import Tasks from './Tasks'

export default class App extends Component {
  state = {
    noteText: ''
  }
  render() {
    return (  
      <View style={{backgroundColor: '#F5FCFF', flex: 1}}>
        <Countdown />
        <Tasks />
      </View>
    );
  }
}


