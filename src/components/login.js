import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

import { mqtt_broker_key, mqtt_username_key, mqtt_password_key } from "../mqtt";
import * as SecureStore from 'expo-secure-store';

import styles from "../styles";

export function MQTTLogin({ navigation }) {

    const [mqtt_broker, setMqttBroker] = useState("");
    const [mqtt_username, setMqttUserName] = useState("");
    const [mqtt_password, setMqttPassword] = useState("");

    // hard code broker on component load
    useEffect(() => {
      setMqttBroker("dcde065acd4347f89fdff07c133e6fb7.s1.eu.hivemq.cloud");
    }, []);

    async function saveMQTTSettings() {
        await SecureStore.setItemAsync(mqtt_username_key, mqtt_username);
        await SecureStore.setItemAsync(mqtt_password_key, mqtt_password);
        await SecureStore.setItemAsync(mqtt_broker_key, mqtt_broker);
      }

    function saveMQQTsettingsButtonPress() {
        saveMQTTSettings()
        .catch(e => { console.log("Could not save Setting", e); })
        .then(v => { console.log("Saved settings");} );
    }

    return (
      <View>

        <Text style={styles.heading}>MQTT Server Settings</Text>

        <TextInput style={styles.input} placeholder="Broker"
         autoCorrect={false}
         autoCapitalize="none"
         onChangeText ={text => setMqttBroker(text)}/>

        <TextInput style={styles.input} placeholder="User Name"
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText ={text => setMqttUserName(text)}/>

        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText ={text => setMqttPassword(text)}/>

        <TouchableOpacity onPress={() => { 
          saveMQQTsettingsButtonPress();}} style={styles.button}>
        <Text style={styles.buttonText}>Save MQTT Broker Settings</Text>
        </TouchableOpacity>

      </View>
    );
  }

