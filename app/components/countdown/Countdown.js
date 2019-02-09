import React from 'react'
import { View, Text, Button } from 'native-base'

import CircularCountdown from './CircularCountdown'

// redux related stuff
import { connect } from 'react-redux'
import { startCountdown, stopCountdown, pauseCountdown, decrementTimer,
        toggleMode
      } from '../../redux/actions/countdownActions'

class Countdown extends React.Component {
  constructor(props) {
      super(props)
  }
  intervalID = null

  componentWillReceiveProps(nextProps) {
    // check if countdown got to 00:00
    // if so, automatically switch between countdown modes (break vs activity)
    if (nextProps.countdown.countdownTime <= 0)
    {
      // stop currently running timer
      clearInterval(this.intervalID)
      // change countdown modes (sends currently running mode as parameter)
      this.props.toggleMode(nextProps.countdown.countdownMode);
      // start timer with updated mode
      this.intervalID = setInterval(() => this.onDecrementTimer(), 1000)  
      console.log("SWITCH MODE")
    }
  }

  onStartCountdown() {
    this.intervalID = setInterval(() => this.onDecrementTimer(), 1000)
    this.props.startCountdown()
  }

  onStopCountdown() {
    clearInterval(this.intervalID)
    this.props.stopCountdown()
  }

  onDecrementTimer() {
    this.props.decrementTimer()
  }

  onPauseCountdown() {
    clearInterval(this.intervalID)
    this.props.pauseCountdown()  
  }


  render() {
      return (
      <View>
        {/* timer countdown */}
        <CircularCountdown 
          countdownState={this.props.countdown}
        />
        {/* countdown buttons */}
        <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
            {!this.props.countdown.isCountdownRunning && 
              // <Button success onPress={() => this.startCountdown()}>
              <Button success onPress={() => this.onStartCountdown()}>
                <Text>START</Text>
              </Button>
            }
            {this.props.countdown.isCountdownRunning && 
              <Button info onPress={() => this.onPauseCountdown()}>
                <Text>PAUSE</Text>
              </Button>
            }
            <Button warning onPress={() => this.onStopCountdown()}>
              <Text>STOP</Text>
            </Button>
        </View>
      </View>
      )
    }
}



const mapStateToProps = state => {
  return {
      countdown: state.countdown,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      startCountdown: () => dispatch(startCountdown()),
      stopCountdown: () => dispatch(stopCountdown()),
      pauseCountdown: () => dispatch(pauseCountdown()),
      decrementTimer: () => dispatch(decrementTimer()),
      toggleMode: (currentMode) => dispatch(toggleMode(currentMode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);