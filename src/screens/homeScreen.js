import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Altitude, AltitudeChart, MaxAltitude, Acceleration, Rotation } from '@components/sensors';
import { deployParachute } from '../mqtt';

export function HomeScreen({ navigation }) {

    return (
      <View>
        <Altitude/>
        <AltitudeChart/>
        <MaxAltitude/>
        <Acceleration/>
        <Rotation/>
        <TouchableOpacity onPress={deployParachute} style={styles.button}>
          <Text>Deploy Parachute!</Text>
        </TouchableOpacity>
      </View>
    )
  }

const styles = StyleSheet.create({
button: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 5,
},
buttonText: {
    fontSize: 20,
    color: '#fff',
},
})