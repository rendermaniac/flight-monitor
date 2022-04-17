import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

export function SettingsScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>This is the Settings page</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
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
