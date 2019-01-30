import React from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
const ACTIVITY_TIME = 5
const BREAK_TIME = 20
const COUNTDOWN_ACTIVITY_MODE = 'COUNTDOWN_ACTIVITY_MODE'
const COUNTDOWN_BREAK_MODE = 'COUNTDOWN_BREAK_MODE'

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      // justifyContent: 'center',
      alignItems: 'center'
    }
})

class Countdown extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        isCountdownRunning: false,
        countdownMode: COUNTDOWN_ACTIVITY_MODE,
        countdownTime: ACTIVITY_TIME,
        backgroundColor: '#F5FCFF'
    }
    intervalID = null

    // starts countdown
  startCountdown() {
    let bgColor = (this.state.countdownMode === COUNTDOWN_ACTIVITY_MODE) ? '#ffdbb0' : 'green'
    
    this.setState({ 
      isCountdownRunning: true,
      backgroundColor: bgColor
    })
    this.intervalID = setInterval(() => this.decreaseCountdownTime(), 1000)
  }

  // pauses countdown
  pauseCountdown() {
    clearInterval(this.intervalID)
    this.setState({ isCountdownRunning: false })    
  }

  // stops activity countdown and sets it with original time
  stopCountdown() {
    clearInterval(this.intervalID)
    this.setState({ 
      isCountdownRunning: false,
      countdownMode: COUNTDOWN_ACTIVITY_MODE,
      countdownTime: ACTIVITY_TIME,
      backgroundColor: '#F5FCFF'
    })
  }

  // invoked each second (timer's tick)
  decreaseCountdownTime() {
    // switch between ACTIVITY and BREAK modes
    if (this.state.countdownTime <= 0)
    {
      // stop currently running timer
      clearInterval(this.intervalID)
      // change from ACTIVITY to BREAK mode
      if (this.state.countdownMode === COUNTDOWN_ACTIVITY_MODE)
      {
        this.setState({
          countdownMode: COUNTDOWN_BREAK_MODE,
          countdownTime: BREAK_TIME,
          backgroundColor: 'green'
        })
      }
      // change from BREAK to ACTIVITY mode
      else if (this.state.countdownMode === COUNTDOWN_BREAK_MODE)
      {
        this.setState({
          countdownMode: COUNTDOWN_ACTIVITY_MODE,
          countdownTime: ACTIVITY_TIME,
          backgroundColor: '#ffdbb0'
        })
      }    
      this.intervalID = setInterval(() => this.decreaseCountdownTime(), 1000)  
      return
    }

    this.setState(prevState => ({
      countdownTime: prevState.countdownTime - 1
    }))
  }



    render() {
        let timerMode = (this.state.countdownMode === COUNTDOWN_ACTIVITY_MODE) ? "FOCUS" : "CHILL"
        let formatedCountdownTime = new Date(this.state.countdownTime * 1000).toISOString().substr(14, 5);

        return (
        <View style={[styles.container, { backgroundColor: this.state.backgroundColor }]}>
            <Text style={{fontSize: 40}}>{this.state.isCountdownRunning ? timerMode : 'WAITING'}</Text>
            <Text style={{fontSize: 50}}>{formatedCountdownTime}</Text>
            <View style={{flexDirection: "row"}}>
                {!this.state.isCountdownRunning && 
                <Button onPress={() => this.startCountdown()} title="START" color="green" />}
                {this.state.isCountdownRunning && 
                <Button onPress={() => this.pauseCountdown()} title="PAUSE" color="blue" />}
                <Button onPress={() => this.stopCountdown()} title="STOP" color="orange"/>
            </View>
        </View>
        )
    }
}

export default Countdown;