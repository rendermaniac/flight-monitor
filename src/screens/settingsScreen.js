import * as React from "react";
import { View } from "react-native";
import { MQTTLogin } from "../components/login";

import styles from "../styles";

export function SettingsScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <MQTTLogin/>
      </View>
    );
  }

