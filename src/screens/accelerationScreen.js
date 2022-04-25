import * as React from "react";
import { View } from "react-native";
import { Acceleration, AccelerometerChart } from '@components/accelerometer';
import styles from "../styles";

export function AccelerationScreen({ navigation }) {

    return (
      <View style={styles.container}>
        <AccelerometerChart/>
        <Acceleration/>
      </View>
    )
  }

