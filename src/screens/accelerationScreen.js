import * as React from "react";
import { View } from "react-native";
import { Acceleration } from '@components/sensors';
import styles from "../styles";

export function AccelerationScreen({ navigation }) {

    return (
      <View style={styles.container}>
        <Acceleration/>
      </View>
    )
  }

