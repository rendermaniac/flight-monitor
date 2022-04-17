import 'react-native-gesture-handler';

import { useEffect } from "react";
import { StyleSheet } from "react-native";

// https://www.brainstormcreative.co.uk/react-native-expo/how-to-set-up-expo-app-navigation-using-react-navigation/
// https://reactnavigation.org/docs/material-top-tab-navigator
// note this needs npm install react-native-reanimated@~2.2.0
// also add "react-native-reanimated/plugin" to the end of babel.config.js

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { HomeScreen } from '@screens/homeScreen';
import { SettingsScreen } from '@screens/settingsScreen';

import { mqtt_connect } from '../mqtt';

import { useSetRecoilState } from 'recoil';
import { altitudeAtom, maxAltitudeAtom, accelerationAtom, rotationAtom } from '../atoms';

const Tab = createMaterialTopTabNavigator();

export function RootScreen() {

    const setAltitude = useSetRecoilState(altitudeAtom);
    const setMaxAltitude = useSetRecoilState(maxAltitudeAtom);
    const setAcceleration = useSetRecoilState(accelerationAtom);
    const setRotation = useSetRecoilState(rotationAtom);

    function onMessage(message) {
        //console.log('Topic: ' + message.destinationName + ", Message: " + message.payloadString);
    
        switch (message.destinationName) {
            case "/rocket/telemetry/altitude":
            setAltitude(parseFloat(message.payloadString));
            break;
            case "/rocket/telemetry/altitude/max":
            setMaxAltitude(parseFloat(message.payloadString));
            break;
            case "/rocket/telemetry/acceleration":
            setAcceleration(JSON.parse(message.payloadString));
            break;
            case "/rocket/telemetry/rotation":
            setRotation(JSON.parse(message.payloadString));
            break;
        };
    }

    useEffect(() => {
        mqtt_connect(onMessage);
      }, []);

    return (
      <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  })