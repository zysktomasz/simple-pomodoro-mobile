import React from 'react';
import { Container, Content, Text, Card, CardItem, Body, Item, Label, Button, Picker, Toast, CheckBox, ListItem } from 'native-base'

// imports method related to storing state in async storage
import { _saveSettingsFromStateToStorage } from '../../asyncstorage'

// redux related stuff
import { connect } from 'react-redux'
import { updateTimes } from '../../redux/actions/countdownActions'
import { updateSettings } from '../../redux/actions/settingsActions'

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings",
  }

  // holds current state of settings
  // - selected time values for each timer
  // - playSoundOnCountdownEnd boolean flag
  state = {
    activityTimePicked: '',
    breakTimePicked: '',
    playSoundOnCountdownEndPicked: true
  }

  componentDidMount() {
    this.setState({ 
      activityTimePicked: (this.props.countdown.activityTime / 60).toString(),
      breakTimePicked: (this.props.countdown.breakTime / 60).toString(),
      playSoundOnCountdownEndPicked: this.props.settings.playSoundOnCountdownEnd
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
    // values of updates fields
    let activityTime = parseInt(this.state.activityTimePicked, 10) * 60
    let breakTime = parseInt(this.state.breakTimePicked, 10) * 60
    let playSoundOnCountdownEnd = this.state.playSoundOnCountdownEndPicked

    _saveSettingsFromStateToStorage(activityTime, breakTime, playSoundOnCountdownEnd)
      // updates Activity and Break Times in store.countdown
      .then(() => this.props.updateTimes(activityTime, breakTime))
      // updates playSoundOnCountdownEnd flag in store.settings
      .then(() => this.props.updateSettings(playSoundOnCountdownEnd))
      .then(() => Toast.show({
                    text: "Updated settings!",
                    buttonText: "cool",
                    type: "success"
                  }))
  }

  render() {
    return (  
      <Container>
        <Content contentContainerStyle={{flex:1}} padder>
          <Card 
            // style={{flex: 1}}
          >
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
            {/* play sound on countdown switch flag */}
            <ListItem>
              <CheckBox 
                checked={this.state.playSoundOnCountdownEndPicked}
                onPress={() => this.setState({playSoundOnCountdownEndPicked: !this.state.playSoundOnCountdownEndPicked})}
              />
              <Body>
                <Text>Play notification song on countdown's end</Text>
              </Body>
            </ListItem>
          </Card>
              {/* save settings button */}
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
      updateSettings: (playSoundOnCountdownEnd) => dispatch(updateSettings(playSoundOnCountdownEnd))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);