// based on https://snack.expo.dev/@rizwanamjad/mqtt

import {mqtt_username, mqtt_password, mqtt_server, mqtt_port} from 'mqtt_config';

import * as React from "react";
import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Paho from "paho-mqtt";

const client = new Paho.Client(
  mqtt_server,
  Number(mqtt_port),
  "flight-monitor-" + parseInt(Math.random() * 100)
);

function subscribeTopics () {

  client.subscribe("/rocket/telemetry/altitude");
  client.subscribe("/rocket/telemetry/altitude/max");

  client.subscribe("/rocket/telemetry/acceleration/x");
  client.subscribe("/rocket/telemetry/acceleration/y");
  client.subscribe("/rocket/telemetry/acceleration/z");

  client.subscribe("/rocket/telemetry/rotation/x");
  client.subscribe("/rocket/telemetry/rotation/y");
  client.subscribe("/rocket/telemetry/rotation/z");

  client.subscribe("/rocket/parachute/deploy");
}

function onFailure() {
  console.log("Failed to connect");
}

function onConnectionLost(responseObject) {
  console.log("Connection Lost" + responseObject);
}

function deployParachute() {
  client.connect({
    onSuccess: function () {
      const message = new Paho.Message("1");
      message.destinationName = "/rocket/parachute/deploy";
      client.send(message);
      console.log("deploying parachute");
  },
    onFailure: onFailure,
    userName: mqtt_username,
    password: mqtt_password,
    useSSL: true,
  });
}

export default function App() {

  const [connected, setConnected] = useState(false);

  const [altitude, setAltitude] = useState(0.0);
  const [maxAltitude, setMaxAltitude] = useState(0.0);

  const [accelerationX, setAccelerationX] = useState(0.0);
  const [accelerationY, setAccelerationY] = useState(0.0);
  const [accelerationZ, setAccelerationZ] = useState(0.0);

  const [rotationX, setRotationX] = useState(0.0);
  const [rotationY, setRotationY] = useState(0.0);
  const [rotationZ, setRotationZ] = useState(0.0);

  const mqtt_options = {
    onSuccess: onConnect,
    onFailure: onFailure,
    userName: mqtt_username,
    password: mqtt_password,
    useSSL: true,
  };

  function onConnect() {
    console.log("connected")
    setConnected(true);
    subscribeTopics ();
  }

  function onMessage(message) {
    //console.log('Topic: ' + message.destinationName + ", Message: " + message.payloadString);
  
    switch (message.destinationName) {
      case "/rocket/telemetry/altitude":
        setAltitude(parseFloat(message.payloadString));
        break;
      case "/rocket/telemetry/altitude/max":
        setMaxAltitude(parseFloat(message.payloadString));
        break;
      case "/rocket/telemetry/acceleration/x":
        setAccelerationX(parseFloat(message.payloadString));
        break;
      case "/rocket/telemetry/acceleration/y":
        setAccelerationY(parseFloat(message.payloadString));
        break;
      case "/rocket/telemetry/acceleration/z":
        setAccelerationZ(parseFloat(message.payloadString));
        break;
      case "/rocket/telemetry/rotation/x":
        setRotationX(parseFloat(message.payloadString));
        break;
      case "/rocket/telemetry/rotation/y":
        setRotationY(parseFloat(message.payloadString));
        break;
      case "/rocket/telemetry/rotation/z":
        setRotationZ(parseFloat(message.payloadString));
        break;
    };
  }

  if (!connected)
  {
    client.connect(mqtt_options);
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessage;
  }

  return (
    <View style={styles.container}>
      <Text>Altitude is: {Number(altitude).toFixed(2)} </Text>
      <Text>Max Altitude is: {Number(maxAltitude).toFixed(2)} </Text>
      <Text>Acceleration is: {Number(accelerationX).toFixed(2)} {Number(accelerationY).toFixed(2)} {Number(accelerationZ).toFixed(2)} </Text>
      <Text>Rotation is: {Number(rotationX).toFixed(2)} {Number(rotationY).toFixed(2)} {Number(rotationZ).toFixed(2)} </Text>

      <TouchableOpacity onPress={deployParachute} style={styles.button}>
        <Text>Deploy Parachute!</Text>
      </TouchableOpacity>
    </View>
  )
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
