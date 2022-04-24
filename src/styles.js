import Constants from 'expo-constants';
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    tabnavigator: {
        marginTop: Constants.statusBarHeight,
        flex: 1,
    },
    container: {
      alignItems: "stretch",
      justifyContent: "center",
    },
    heading: {
        textAlign: "center",
        fontSize: 16,
        margin: 5,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 20,
        margin: 8,
        borderRadius: 5,
        // alignItems: "stretch",
        // justifyContent: "flex-start",
      },
      buttonText: {
        textAlign: "center",
        fontSize: 20,
        color: '#fff',
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        // alignItems: "stretch",
        // justifyContent: "flex-start",
      },
  })

