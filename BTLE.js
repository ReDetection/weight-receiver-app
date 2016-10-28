'use strict';


import { BleManager } from 'react-native-ble-plx';

class BTLE {

	constructor() {
		this.bluetooth = new BleManager();
	}

	startDeviceScan(onDeviceDiscover) {
        var btOptions = {
            "allowDuplicates": true, // iOS: Devices will be scanned more frequently if true, by default false
            "autoConnect": false,     // Android: allows to connect to devices which are not in range.
        }
        this.bluetooth.startDeviceScan(null, btOptions, onDeviceDiscover);		
	}

	onStateChange(listener) {
		return this.bluetooth.onStateChange(listener);
	}

}

module.exports = BTLE;
