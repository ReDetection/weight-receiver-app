'use strict';

import {
  Alert
} from 'react-native';
const Permissions = require('react-native-permissions');
const BTLE = require('./BTLE');

class BTFacade {

    startDeviceScan(onDeviceDiscover) {
        this.listener = onDeviceDiscover;
        Permissions.getPermissionStatus('bluetooth')
            .then(response => {
                console.log('bluetooth permissions:');
                console.log(response);
                this.permission = response;
                if (response == 'denied') {
                    this._alertForPermission();
                } else {
                    this._waitForPoweredOnThenScan();
                }
            })
    }

    _waitForPoweredOnThenScan() {
        this.btle = new BTLE();
        var subscription = this.btle.onStateChange(response => {
            if (response == 'PoweredOn') {
                subscription.remove();
                this.btle.startDeviceScan(this.listener);
            }
        });
    }

    _alertForPermission() {
        Alert.alert(
          'Can we access bluetooth?',
          'Without bluetooth we can\'t communicate scale',
          [
            {text: 'No', onPress: () => console.log('permission denied'), style: 'cancel'},
            this.permission == 'undetermined'? 
              {text: 'OK', onPress: this._requestPermission.bind(this)}
              : {text: 'Open Settings', onPress: Permissions.openSettings}
          ]
        )
    }

    _requestPermission() {
        Permissions.requestPermission('bluetooth')
          .then(response => {
            //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            console.log(response);
            // if (response == 'authorized') {
                this._waitForPoweredOnThenScan();
            // } 
          });
    }

}

module.exports = BTFacade;
