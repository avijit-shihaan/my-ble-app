import React, { useEffect } from 'react';
import { BleManager } from 'react-native-ble-plx';
import { Text, View } from 'react-native';


export default function HomeScreen() {
  const manager = new BleManager();

  useEffect(() => {
    const subscription = manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        startScan();
        subscription.remove();
      }
    }, true);

    return () => {
      manager.destroy();
    };
  }, [manager]);

  const startScan = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(`Found device: ${device.name}`);
    });
  };

  return (
    <View>
      <Text>Bluetooth Low Energy Scanner</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
