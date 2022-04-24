import * as React from "react";
import { View } from "react-native";
import { Rotation } from '@components/sensors';
import styles from "../styles";

export function RotationScreen({ navigation }) {

    return (
      <View style={styles.container}>
        <Rotation/>
      </View>
    )
  }

