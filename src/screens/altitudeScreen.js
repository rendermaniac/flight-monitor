import * as React from "react";
import { View } from "react-native";
import { Altitude, AltitudeChart, MaxAltitude } from '@components/altitude';

import styles from "../styles";

export function AltitudeScreen({ navigation }) {

    return (
      <View style={styles.container}>
        <AltitudeChart/>
        <Altitude/>
        <MaxAltitude/>
      </View>
    )
  }

