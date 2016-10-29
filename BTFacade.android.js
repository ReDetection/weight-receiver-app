'use strict';

import {
  Alert
} from 'react-native';
const Permissions = require('react-native-permissions');
const BTLE = require('./BTLE');

class BTFacade {

    constructor() {
        this.btle = new BTLE();
    }

    startDeviceScan(onDeviceDiscover) {
        this.btle.startDeviceScan(onDeviceDiscover);
    }

    _waitForPoweredOnThenScan() {
        this.btle = new BTLE();
        var subscription = this.btle.onStateChange(response => {
            if (response == 'PoweredOn') {
                subscription.remove();
                
            }
        });
    }

}

module.exports = BTFacade;
