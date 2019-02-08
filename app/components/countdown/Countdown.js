import React from 'react'
import { View, Text, Button } from 'native-base'

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
      let timerMode = this.props.countdown.countdownMode
      // let timerMode = (this.props.countdown.countdownMode === COUNTDOWN_ACTIVITY_MODE) ? "FOCUS" : "CHILL"
      let formatedCountdownTime = new Date(this.props.countdown.countdownTime * 1000).toISOString().substr(14, 5);

      return (
      <View style={{backgroundColor: this.props.countdown.backgroundColor}}>
        {/* timer countdown */}
        <View style={{alignItems: "center"}}>
            <Text style={{fontSize: 40}}>{this.props.countdown.isCountdownRunning ? timerMode : 'WAITING'}</Text>
            <Text style={{fontSize: 50}}>{formatedCountdownTime}</Text>
        </View>
        {/* timer buttons */}
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