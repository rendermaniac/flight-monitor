import 'react-native-gesture-handler';

// https://www.brainstormcreative.co.uk/react-native-expo/how-to-set-up-expo-app-navigation-using-react-navigation/
// https://reactnavigation.org/docs/material-top-tab-navigator
// note this needs npm install react-native-reanimated@~2.2.0
// also add "react-native-reanimated/plugin" to the end of babel.config.js

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ControlsScreen } from '@screens/controlsScreen';
import { AltitudeScreen } from '@screens/altitudeScreen';
import { AccelerationScreen } from '@screens/accelerationScreen';
import { RotationScreen } from '@screens/rotationScreen';
import { SettingsScreen } from '@screens/settingsScreen';

import styles from "../styles";

const Tab = createMaterialTopTabNavigator();

export function RootScreen() {

    return (
      <NavigationContainer>
      <Tab.Navigator style={styles.tabnavigator}>
        <Tab.Screen name="Controls" component={ControlsScreen} />
        <Tab.Screen name="Altitude" component={AltitudeScreen} />
        {/* <Tab.Screen name="Acceleration" component={AccelerationScreen} />
        <Tab.Screen name="Rotation" component={RotationScreen} /> */}
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
      </NavigationContainer>
    );
  }
