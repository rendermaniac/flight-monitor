import * as React from "react";
import { View } from "react-native";
import { Rotation, GyroChart} from '@components/gyro';
import styles from "../styles";

export function RotationScreen({ navigation }) {

    return (
      <View style={styles.container}>
        <GyroChart/>
        <Rotation/>
      </View>
    )
  }

