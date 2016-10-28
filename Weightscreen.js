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

const BTFacade = require('./BTFacade');

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
    this.bluetooth = new BTFacade();
  }
    
  onButtonPressed() {
    this.setState({
      lastWeight: this.state.lastWeight + 1,
    });
  }

  onDeviceDiscover(error, scannedDevice) {
      if (scannedDevice.name == 'Scale') {
        console.log(scannedDevice);
        var weightEncoded = scannedDevice.serviceData['0000181d-0000-1000-8000-00805f9b34fb'];
        var bytes = atob(weightEncoded);
        var intValue = bytes.charCodeAt(1)*256+bytes.charCodeAt(0);
        var weight = intValue*0.005;
        console.log(weight);
        this.setState({
          lastWeight: weight
        })
      }
  }
    
  componentDidMount() {
      this.bluetooth.startDeviceScan(this.onDeviceDiscover.bind(this));
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


