// based on https://snack.expo.dev/@rizwanamjad/mqtt

import Paho from "paho-mqtt";
import * as SecureStore from 'expo-secure-store';

export const mqtt_broker_key = "mqtt_broker";
export const mqtt_username_key = "mqtt_username";
export const mqtt_password_key = "mqtt_password";

export async function getMQTTCredentials() {
    const broker = await SecureStore.getItemAsync(mqtt_broker_key);
    const username = await SecureStore.getItemAsync(mqtt_username_key);
    const password = await SecureStore.getItemAsync(mqtt_password_key);

    const settings = {
        broker: broker,
        userName: username,
        password: password,
    };
    return settings;
  }

export async function mqtt_connect(
     onMessage=(message)=>{ console.log('Topic: ' + message.destinationName + ", Message: " + message.payloadString); },
     onConnect=(client)=>{ console.log("Connected to broker", client); }
     ) {

    const mqtt_credentials = await getMQTTCredentials();
    // console.log("credentials are:", mqtt_credentials);

    client = new Paho.Client(
        mqtt_credentials.broker,
        Number(8884), // this has to be a port using websockets
        `flight-monitor-${parseInt(Math.random() * 100)}`
    );

    client.onConnectionLost = (responseObject)=>{ console.log("Connection lost", responseObject)};
    client.onMessageArrived = onMessage;

    mqtt_option = {
        onSuccess: ()=>{ onConnect(client) },
        onFailure: ()=>{ console.log("Failed to connect")},
        userName: mqtt_credentials.userName,
        password: mqtt_credentials.password,
        useSSL: true,
    }

    client.connect(mqtt_option);
    return client;
}

export function mqtt_disconnect(client) {
    client.disconnect();
    console.log("disconnected");
}
