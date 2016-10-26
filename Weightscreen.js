'use strict';
 
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native';
import { BleManager } from 'react-native-ble-plx';

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
},
button: {
  height: 36,
  flex: 1,
  flexDirection: 'row',
  backgroundColor: '#48BBEC',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  }
});

class Weightscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastWeight: 1,
    };
    this.bluetooth = new BleManager();
  }
    
  onButtonPressed() {
    this.setState({
      lastWeight: this.state.lastWeight + 1,
    });
  }

  onDeviceDiscover(error, scannedDevice) {
      console.log(error);
      console.log(scannedDevice);
  }
    
  componentDidMount() {
      var btOptions = {
          "allowDuplicates": true, // iOS: Devices will be scanned more frequently if true, by default false
          "autoConnect": false,     // Android: allows to connect to devices which are not in range.
      }
      this.bluetooth.startDeviceScan(null, btOptions, this.onDeviceDiscover);
  }
      
  componentWillUnmount() {
      this.bluetooth.destroy();
  }
    
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Waiting for signal...
        </Text>
        <TouchableHighlight style={styles.button} underlayColor='#99d9f4'
          onPress={this.onButtonPressed.bind(this)}>
          <Text style={styles.buttonText}>Go</Text>
        </TouchableHighlight>
        <Text style={styles.description}>
            {this.state.lastWeight}
        </Text>
      </View>
    );
  }
}

module.exports = Weightscreen;


