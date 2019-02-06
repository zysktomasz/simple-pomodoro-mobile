import React from "react";
import { Container, Content, Button, Icon } from 'native-base'

import Countdown from "../countdown/Countdown";
import Tasks from "../tasks/Tasks";

class PomodoroScreen extends React.Component {
  static navigationOptions =  ({ navigation }) => {
    return {
      title: "Pomodoro",
      headerRight: (
        <Button transparent
            style={{marginTop: 7}}
            onPress={() => navigation.navigate('Settings')}>
            <Icon name='cog' style={{color: "black"}}/>
        </Button>
      )
    }
  };

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flex:1}}>
          <Countdown />
          <Tasks />
        </Content>
      </Container>
    );
  }
}

export default PomodoroScreen;