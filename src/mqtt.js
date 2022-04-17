// based on https://snack.expo.dev/@rizwanamjad/mqtt

import Paho from "paho-mqtt";
import {mqtt_username, mqtt_password, mqtt_server, mqtt_clientid} from 'mqtt_config';

const client = new Paho.Client(
    mqtt_server,
    Number(8884), // this has to be a port using websockets
    mqtt_clientid + parseInt(Math.random() * 100)
  );

export function onConnect() {
    console.log("connected")
    subscribeTopics ();
}
  
export function onFailure() {
    console.log("Failed to connect");
}

export function onConnectionLost(responseObject) {
    console.log("Connection Lost:", responseObject);
}

export const mqtt_options = {
    onSuccess: onConnect,
    onFailure: onFailure,
    userName: mqtt_username,
    password: mqtt_password,
    useSSL: true,
};

export function subscribeTopics () {
    client.subscribe("/rocket/telemetry/altitude");
    client.subscribe("/rocket/telemetry/altitude/max");
    client.subscribe("/rocket/telemetry/acceleration");
    client.subscribe("/rocket/telemetry/rotation");

    client.subscribe("/rocket/parachute/deploy");
}

export function mqtt_connect(onMessage) {
    client.connect(mqtt_options);
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessage;
}

export function deployParachute() {
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