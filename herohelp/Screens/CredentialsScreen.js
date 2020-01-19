import React, {Component} from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import {Button, Input,CheckBox,ListItem} from "react-native-elements";
import { Constants } from 'expo';

export default class CredentialsScreen extends Component{
    constructor(){
        super();
        this.state = {
            opioidOverdose: false,
            CPR: false,
            firstResponder: false,
            medicalResponder: false,
            oxygenTherapy: false,
            wildernessFirstAid: false,
            nationalLifeguard: false,
            marineFirstAid: false,
            lifeguardCourse: false,
        }
    
      }
    render(){
        return (
            <View style={styles.container}>
                        <CheckBox
                            title="First Aid for Opioid Overdoses"
                            checked={this.state.opioidOverdose}
                            onPress={() => this.setState({ opioidOverdose: !this.state.opioidOverdose })}
                        />
                    
                        <CheckBox
                            title="CPR - Cardiopulmonary Resuscitation"
                            checked={this.state.CPR}
                            onPress={() => this.setState({ CPR: !this.state.CPR })}
                        />
                        <CheckBox
                            title="First Responder"
                            checked={this.state.firstResponder}
                            onPress={() => this.setState({ firstResponder: !this.state.firstResponder })}
                        />
                        <CheckBox
                            title="Emergency Medical Responder"
                            checked={this.state.medicalResponder}
                            onPress={() => this.setState({ medicalResponder: !this.state.medicalResponder })}
                        />
                        <CheckBox
                            title="Oxygen Therapy"
                            checked={this.state.oxygenTherapy}
                            onPress={() => this.setState({ oxygenTherapy: !this.state.oxygenTherapy })}
                        />
                        <CheckBox
                            title="Wilderness and Remote First Aid"
                            checked={this.state.wildernessFirstAid}
                            onPress={() => this.setState({ wildernessFirstAid: !this.state.wildernessFirstAid })}
                        />
                        <CheckBox
                            title="National Lifeguard Certification"
                            checked={this.state.nationalLifeguard}
                            onPress={() => this.setState({ nationalLifeguard: !this.state.nationalLifeguard })}
                        />
                        <CheckBox
                            title="Marine First Aid"
                            checked={this.state.marineFirstAid}
                            onPress={() => this.setState({ marineFirstAid: !this.state.marineFirstAid })}
                        />
                        <CheckBox
                            title="Lifeguard course"
                            checked={this.state.lifeguardCourse}
                            onPress={() => this.setState({ lifeguardCourse: !this.state.lifeguardCourse })}
                        />
                        <Button
                            title="Submit"
                            type="outline"
                            buttonStyle = {styles.Button}
                        />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });
