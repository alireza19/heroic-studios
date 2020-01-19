import React, { Component } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";


export default class help extends Component {
    static navigationOptions = {
        title: 'Help',
        headerStyle: {
        backgroundColor: '#f4511e',
    },
    headerTitleStyle: {
        fontWeight: 'bold',},
    };

    // state = {
    //     chosenType: ''
    // };


    render(){

        return (
            Alert.alert(this.props.navigation.getParam('chosen','chosen'))

        );
    }
}
