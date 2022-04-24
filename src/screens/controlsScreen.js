import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { mqtt_connect, mqtt_disconnect } from '../mqtt';

import { useSetRecoilState } from 'recoil';
import { altitudeAtom, maxAltitudeAtom, accelerationAtom, rotationAtom } from '../atoms';

import styles from "../styles";

export function ControlsScreen({ navigation }) {

    const setAltitude = useSetRecoilState(altitudeAtom);
    const setMaxAltitude = useSetRecoilState(maxAltitudeAtom);
    const setAcceleration = useSetRecoilState(accelerationAtom);
    const setRotation = useSetRecoilState(rotationAtom);

    function subscribeTopics (client) {
      client.subscribe("/rocket/telemetry/altitude");
      client.subscribe("/rocket/telemetry/altitude/max");
      client.subscribe("/rocket/telemetry/acceleration");
      client.subscribe("/rocket/telemetry/rotation");
    
      client.subscribe("/rocket/parachute/deploy");

      console.log("Subscribed to topics");
    }

    function onMessage(message) {

      console.log('Topic: ' + message.destinationName + ", Message: " + message.payloadString);
    
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

    // mqtt_disconnect(mqtt_client)

function deployParachute(client) {
    const message = new Paho.Message("1");
    message.destinationName = "/rocket/parachute/deploy";
    client.send(message);
    console.log("deploying parachute");
}

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => { mqtt_connect(onMessage, subscribeTopics);} } style={styles.button}>
          <Text style={styles.buttonText}>Connect</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { mqtt_connect(onMessage, deployParachute);} } style={styles.button}>
          <Text style={styles.buttonText}>Deploy Parachute</Text>
        </TouchableOpacity>
      </View>
    );
  }
