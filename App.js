import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* View containig timer and buttons */}
        <View style={{flex: 1}}>
          <View>
            <Text>25:00</Text>
          </View>
          <View>
            <Button title="START" />
            <Button title="STOP" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
