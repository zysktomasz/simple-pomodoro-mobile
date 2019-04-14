import React from "react";
import { Container, Content, Button, Icon } from "native-base";

import Countdown from "../countdown/Countdown";
import Tasks from "../tasks/Tasks";

// imports method related to storing state in async storage
import {
  _saveSettingsFromStateToStorage,
  _loadSettingsFromAsyncStorage
} from "../../asyncstorage";

// redux related stuff
import { connect } from "react-redux";
import { updateTimes } from "../../redux/actions/countdownActions";
import { updateSettings } from "../../redux/actions/settingsActions";

class PomodoroScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Pomodoro",
      headerRight: (
        <Button
          transparent
          style={{ marginTop: 7 }}
          onPress={() => navigation.navigate("Settings")}
        >
          <Icon name="cog" style={{ color: "black" }} />
        </Button>
      )
    };
  };

  componentDidMount() {
    // loads and deals with settings from async storage
    _loadSettingsFromAsyncStorage().then(settingsFromStorage => {
      if (settingsFromStorage !== null) {
        // if we have data stored in asyncstorage, load it into redux state
        this.props.updateTimes(
          settingsFromStorage.activityTime,
          settingsFromStorage.breakTime
        );
        // converts string flag received from storage to boolean
        this.props.updateSettings(
          settingsFromStorage.playSoundOnCountdownEnd == "true",
          settingsFromStorage.playSoundOnCountdownLastTicks == "true"
        );
      } else {
        _saveSettingsFromStateToStorage(
          this.props.countdown.activityTime,
          this.props.countdown.breakTime,
          this.props.settings.playSoundOnCountdownEnd,
          this.props.settings.playSoundOnCountdownLastTicks
        );
      }
    });
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1 }}>
          <Countdown />
          <Tasks />
        </Content>
      </Container>
    );
  }
}

// export default PomodoroScreen;

const mapStateToProps = state => {
  return {
    settings: state.settings,
    countdown: state.countdown
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTimes: (activityTime, breakTime) =>
      dispatch(updateTimes(activityTime, breakTime)),
    updateSettings: (playSoundOnCountdownEnd, playSoundOnCountdownLastTicks) =>
      dispatch(
        updateSettings(playSoundOnCountdownEnd, playSoundOnCountdownLastTicks)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PomodoroScreen);
