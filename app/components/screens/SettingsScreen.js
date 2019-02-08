import React from 'react';
import { Container, Content, Text, Card, CardItem, Body, Item, Label, Button, Picker, Toast } from 'native-base'

import {AsyncStorage} from 'react-native';

// redux related stuff
import { connect } from 'react-redux'
import { updateTimes } from '../../redux/actions/countdownActions'

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings",
  }

  // holds state of selected time values for each timer
  state = {
    activityTimePicked: '',
    breakTimePicked: '',
  }

  componentDidMount() {
    this.setState({ 
      activityTimePicked: (this.props.countdown.activityTime / 60).toString(),
      breakTimePicked: (this.props.countdown.breakTime / 60).toString()
    })
  }

  // prepares picker.items for each minute (1-59)
  displayPickerItems() {
    let pickerItems = Array();
    for (i = 1; i < 60; i++)
    {
      pickerItems.push(<Picker.Item label={i.toString()} value={i.toString()} key={i.toString()}/>)
    }
    return pickerItems;
  }

  onSaveSettings() {
    let activityTime = parseInt(this.state.activityTimePicked, 10) * 60
    let breakTime = parseInt(this.state.breakTimePicked, 10) * 60
    this._saveSettingsFromStateToStorage(activityTime, breakTime)
      .then(() => this.props.updateTimes(activityTime, breakTime))
      .then(() => Toast.show({
                    text: "Updated settings!",
                    buttonText: "cool",
                    type: "success"
                  }))
  }

  _saveSettingsFromStateToStorage = async (activityTime, breakTime) => {
    try {
      await AsyncStorage.setItem('activityTime', activityTime.toString());
      await AsyncStorage.setItem('breakTime', breakTime.toString());
      console.log("saved data to storage")
    } catch (error) {
      console.log(error)
    }
  };

  render() {

    return (  
      <Container>
        <Content contentContainerStyle={{flex:1}} padder>
          <Card style={{flex: 1}}>
            <CardItem>
              <Body>
                {/* Activity Time PICKER */}
                <Item picker>
                  <Picker
                    mode="dropdown"
                    placeholder="Select One"
                    placeholderStyle={{ color: "#2874F0" }}
                    note={false}
                    selectedValue={this.state.activityTimePicked}
                    onValueChange={(selected) => this.setState({activityTimePicked: selected})}
                  >
                  {this.displayPickerItems()}
                  </Picker>
                  <Label>Activity Time</Label>
                </Item>
                <Text style={{fontSize: 12, fontStyle: "italic"}}>Setup time for activity countdown (1-59 min)</Text>

                {/* Break Time PICKER */}
                <Item picker>
                  <Picker
                    mode="dropdown"
                    placeholder="Select One"
                    placeholderStyle={{ color: "#2874F0" }}
                    note={false}
                    selectedValue={this.state.breakTimePicked}
                    onValueChange={(selected) => this.setState({breakTimePicked: selected})}                  
                  >
                  {this.displayPickerItems()}
                  </Picker>
                  <Label>Break Time</Label>
                </Item>
                <Text style={{fontSize: 12, fontStyle: "italic"}}>Setup time for break countdown (1-59 min)</Text>
              </Body>
            </CardItem>
          </Card>
          <Button block onPress={() => this.onSaveSettings()}>
            <Text>Save settings</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

// export default SettingsScreen

const mapStateToProps = state => {
  return {
      settings: state.settings,
      countdown: state.countdown,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      updateTimes: (activityTime, breakTime) => dispatch(updateTimes(activityTime, breakTime)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);