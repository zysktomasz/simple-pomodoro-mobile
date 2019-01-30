import React, {Component} from 'react';
import {View} from 'react-native';
import Countdown from './Countdown';
import Tasks from './Tasks'

export default class App extends Component {
  render() {
    return (  
      <View style={{backgroundColor: '#F5FCFF', flex: 1}}>
        <Countdown />
        <Tasks />
      </View>
    );
  }
}


