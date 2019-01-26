import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, ScrollView} from 'react-native';
const ACTIVITY_TIME = 10
const BREAK_TIME = 20

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activityCountdown: ACTIVITY_TIME,
      backgroundColor: '#F5FCFF'
    }

    this.activityInterval = null
  }

  startActivityCountdown() {
    this.setBackgroundColor('green')
    this.activityInterval = setInterval(() => this.decreaseActivityCountdown(), 1000)
  }

  stopActivityCountdown() {
    this.setBackgroundColor('#F5FCFF')
    clearInterval(this.activityInterval)
    this.setState({
      activityCountdown: ACTIVITY_TIME,
    })
  }

  // invoked each second (timer's tick)
  decreaseActivityCountdown() {
    console.log("licznik leci: ", this.state.activityCountdown)
    this.setState(prevState => ({
      activityCountdown: prevState.activityCountdown - 1
    }))
  }

  getBackgroundColor() {
    return {
      backgroundColor: this.state.backgroundColor
    }
  }

  setBackgroundColor(color) {
    this.setState({ backgroundColor: color })
  }

  render() {
    return (  
      <View style={[styles.container, this.getBackgroundColor()]}>
        {/* View containig timer and buttons */}
        <View style={{flex: 1}}>
          {/* timer countdown */}
            <Text style={{fontSize: 40, alignSelf: "center"}}>
              {this.state.activityCountdown}
            </Text>
          {/* timer buttons */}
          <View style={{flexDirection: "row", justifyContent: "space-around"}}>
            <Button onPress={() => this.startActivityCountdown()} title="START" color="green" />
            <Button onPress={() => this.stopActivityCountdown()} title="STOP" color="orange"/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  }
});
