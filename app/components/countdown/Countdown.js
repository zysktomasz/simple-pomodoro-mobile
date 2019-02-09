import React from 'react'
import { View, Text, Button } from 'native-base'

import CircularCountdown from './CircularCountdown'

// redux related stuff
import { connect } from 'react-redux'
import { startCountdown, stopCountdown, pauseCountdown, decrementTimer,
        toggleMode, updateTimeBy60Seconds
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
      clearInterval(this.intervalID)
      // change countdown modes (sends currently running mode as parameter)
      // migh consider using thunk (and use getState inside action instead of parameter)
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

  // skips any left time from current mode and starts countdown with next mdoe
  skipSession() {
    clearInterval(this.intervalID)
    this.props.toggleMode(this.props.countdown.countdownMode);
    this.onStartCountdown()
  }

  // TODO
  // TODO : zrobic to jakos madrzej
  // TODO
  updateTimeBy60Seconds(operation) {
    let minSeconds = 1
    let maxSeconds = (this.props.countdown.countdownMode === "focus") ? this.props.countdown.activityTime : this.props.countdown.breakTime
    // if operation possible
    if (operation === "minus" && this.props.countdown.countdownTime - 60 >= minSeconds)
    {
      this.props.updateTimeBy60Seconds("minus")
    }
    else if (operation === "plus" && this.props.countdown.countdownTime + 60 <=  maxSeconds)
    {
      this.props.updateTimeBy60Seconds("plus")
    }
  }

  render() {
      return (
      <View>
        <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <Button 
                      style={{position: "absolute", left: 70}}
                      transparent onPress={() => this.updateTimeBy60Seconds("minus")}>
                        <Text>-60s</Text>
                    </Button>
                    <Button 
                      style={{position: "absolute", right: 70}}
                      transparent onPress={() => this.updateTimeBy60Seconds("plus")}>
                        <Text>+60s</Text>
                    </Button>
                </View>
        {/* timer countdown */}
        <CircularCountdown 
          countdownState={this.props.countdown}
        />
        {/* countdown buttons */}
        <View style={{flexDirection: "row", justifyContent: "space-evenly", marginTop: 20}}>
            {!this.props.countdown.isCountdownRunning && 
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
            {this.props.countdown.isCountdownRunning && 
              <Button info onPress={() => this.skipSession()}>
                <Text>SKIP</Text>
              </Button>
            }
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
      toggleMode: (currentMode) => dispatch(toggleMode(currentMode)),
      updateTimeBy60Seconds: (operation) => dispatch(updateTimeBy60Seconds(operation))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);