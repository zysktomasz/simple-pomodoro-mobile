import React from "react";
import { View, Text, Button } from "native-base";

import CircularCountdown from "./CircularCountdown";

// redux related stuff
import { connect } from "react-redux";
import {
  startCountdown,
  stopCountdown,
  pauseCountdown,
  decrementTimer,
  toggleMode,
  updateTimeBy60Seconds
} from "../../redux/actions/countdownActions";

import Sound from "react-native-sound";

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    Sound.setCategory("Playback");
  }
  intervalID = null;
  countdownSwitchSound = new Sound(
    "countdown_switch.mp3",
    Sound.MAIN_BUNDLE,
    error => {
      if (error) console.log("error", error);
    }
  );

  singleClockTickSound = new Sound(
    "single_clock_tick.mp3",
    Sound.MAIN_BUNDLE,
    error => {
      if (error) console.log("error", error);
    }
  );

  componentWillReceiveProps(nextProps) {
    // check if countdown got to 00:00
    // if so, automatically switch between countdown modes (break vs activity)
    if (nextProps.countdown.countdownTime <= 0) {
      clearInterval(this.intervalID);
      // change countdown modes (sends currently running mode as parameter)
      // migh consider using thunk (and use getState inside action instead of parameter)
      this.props.toggleMode(nextProps.countdown.countdownMode);
      // start timer with updated mode
      this.intervalID = setInterval(() => this.onDecrementTimer(), 1000);
      // play notification sound
      if (this.props.settings.playSoundOnCountdownEnd) {
        this.countdownSwitchSound.play();
      }
    }
  }

  onStartCountdown() {
    this.intervalID = setInterval(() => this.onDecrementTimer(), 1000);
    this.props.startCountdown();
  }

  onStopCountdown() {
    clearInterval(this.intervalID);
    this.props.stopCountdown();
  }

  onDecrementTimer() {
    this.props.decrementTimer();
  }

  onPauseCountdown() {
    clearInterval(this.intervalID);
    this.props.pauseCountdown();
  }

  // skips any left time from current mode and starts countdown with next mdoe
  skipSession() {
    clearInterval(this.intervalID);
    this.props.toggleMode(this.props.countdown.countdownMode);
    this.onStartCountdown();
  }

  // based on operation ("minus" or "plus") calculates new countdownTime
  // countdownTime is restricted between 1s and maxSeconds for current countdown mode
  updateTimeBy60Seconds(operation) {
    let minSeconds = 1;
    let maxSeconds =
      this.props.countdown.countdownMode === "focus"
        ? this.props.countdown.activityTime
        : this.props.countdown.breakTime;
    let currentCountdownTime = this.props.countdown.countdownTime;
    // if operation possible
    if (operation === "minus") {
      newCountdownTime =
        currentCountdownTime - 60 >= minSeconds
          ? currentCountdownTime - 60
          : minSeconds;
      this.props.updateTimeBy60Seconds(newCountdownTime);
    } else if (operation === "plus") {
      newCountdownTime =
        currentCountdownTime + 60 <= maxSeconds
          ? currentCountdownTime + 60
          : maxSeconds;
      this.props.updateTimeBy60Seconds(newCountdownTime);
    }
  }

  render() {
    return (
      <View>
        {/* countdown buttons - +/- 60s to countdown time */}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            style={{ position: "absolute", left: 60, top: 10 }}
            rounded
            light
            onPress={() => this.updateTimeBy60Seconds("minus")}
          >
            <Text style={{ fontSize: 11 }}>-60s</Text>
          </Button>
          <Button
            style={{ position: "absolute", right: 60, top: 10 }}
            rounded
            light
            onPress={() => this.updateTimeBy60Seconds("plus")}
          >
            <Text style={{ fontSize: 11 }}>+60s</Text>
          </Button>
        </View>
        {/* timer countdown */}
        <CircularCountdown
          countdownState={this.props.countdown}
          singleClockTickSound={this.singleClockTickSound}
          playClockTickSound={this.props.settings.playSoundOnCountdownLastTicks}
        />
        {/* countdown buttons - start/stop/skip*/}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20
          }}
        >
          {!this.props.countdown.isCountdownRunning && (
            <Button success onPress={() => this.onStartCountdown()}>
              <Text>START</Text>
            </Button>
          )}
          {this.props.countdown.isCountdownRunning && (
            <Button info onPress={() => this.onPauseCountdown()}>
              <Text>PAUSE</Text>
            </Button>
          )}
          <Button warning onPress={() => this.onStopCountdown()}>
            <Text>STOP</Text>
          </Button>
          <Button
            info
            onPress={() => this.skipSession()}
            disabled={!this.props.countdown.isCountdownRunning}
          >
            <Text>SKIP</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings,
    countdown: state.countdown
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startCountdown: () => dispatch(startCountdown()),
    stopCountdown: () => dispatch(stopCountdown()),
    pauseCountdown: () => dispatch(pauseCountdown()),
    decrementTimer: () => dispatch(decrementTimer()),
    toggleMode: currentMode => dispatch(toggleMode(currentMode)),
    updateTimeBy60Seconds: newCountdownTime =>
      dispatch(updateTimeBy60Seconds(newCountdownTime))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Countdown);
