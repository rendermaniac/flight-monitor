import 'react-native-gesture-handler';

// https://www.brainstormcreative.co.uk/react-native-expo/how-to-set-up-expo-app-navigation-using-react-navigation/
// https://reactnavigation.org/docs/material-top-tab-navigator
// note this needs npm install react-native-reanimated@~2.2.0
// also add "react-native-reanimated/plugin" to the end of babel.config.js

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AltitudeScreen } from '@screens/altitudeScreen';
import { AccelerationScreen } from '@screens/accelerationScreen';
import { RotationScreen } from '@screens/rotationScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from "../styles";

const Tab = createBottomTabNavigator();

export function SensorsScreen() {

    return (
      <Tab.Navigator style={styles.tabnavigator}>
        <Tab.Screen name="Altitude"
          component={AltitudeScreen}
          options={{
            tabBarLabel: 'Altitude',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="balloon" color={color} size={size} />
            )}} />
        <Tab.Screen name="Accelerometer"
        component={AccelerationScreen}
        options={{
          tabBarLabel: 'Accelerometer',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="run-fast" color={color} size={size} />
          )}} />
        <Tab.Screen name="Gyro"
        component={RotationScreen}
        options={{
          tabBarLabel: 'Gyro',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="rotate-orbit" color={color} size={size} />
          )}} />
      </Tab.Navigator>
    );
  }
