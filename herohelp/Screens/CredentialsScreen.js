import React, {Component} from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import {Button, Input,CheckBox,ListItem} from "react-native-elements";
import { Constants } from 'expo';
import Axios from 'axios';

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

    // handleClick(){
    //     var credentials = [
    //         ['opioidOverdose', this.state.opioidOverdose],
    //         ['CPR', this.state.CPR],
    //         ['firstResponder', this.state.firstResponder],
    //         ['medicalResponder', this.state.medicalResponder],
    //         ['oxygenTherapy', this.state.oxygenTherapy],
    //         ['wildernessFirstAid', this.state.wildernessFirstAid],
    //         ['nationalLifeguard', this.state.nationalLifeguard],
    //         ['marineFirstAid', this.state.marineFirstAid],
    //         ['lifeguardCourse', this.state.lifeguardCourse]];
        
    //     for(var i =0 ; i < credentials.length;i++){
    //         if(credentials[i][1]){
    //             console.log(credentials[i][0]);

    //         }
    //     }

    // }

    render(){
        return (
            <View style={styles.container}>
                        <CheckBox
                            title="First Aid for Opioid Overdoses Training"
                            checked={this.state.opioidOverdose}
                            onPress={() => this.setState({ opioidOverdose: !this.state.opioidOverdose })}
                        />
                    
                        <CheckBox
                            title="CPR - Cardiopulmonary Resuscitation Training"
                            checked={this.state.CPR}
                            onPress={() => this.setState({ CPR: !this.state.CPR })}
                        />
                        <CheckBox
                            title="First Responder Training"
                            checked={this.state.firstResponder}
                            onPress={() => this.setState({ firstResponder: !this.state.firstResponder })}
                        />
                        <CheckBox
                            title="Emergency Medical Responder Training"
                            checked={this.state.medicalResponder}
                            onPress={() => this.setState({ medicalResponder: !this.state.medicalResponder })}
                        />
                        <CheckBox
                            title="Oxygen Therapy Course"
                            checked={this.state.oxygenTherapy}
                            onPress={() => this.setState({ oxygenTherapy: !this.state.oxygenTherapy })}
                        />
                        <CheckBox
                            title="Wilderness and Remote First Aid Certification"
                            checked={this.state.wildernessFirstAid}
                            onPress={() => this.setState({ wildernessFirstAid: !this.state.wildernessFirstAid })}
                        />
                        <CheckBox
                            title="National Lifeguard Certification"
                            checked={this.state.nationalLifeguard}
                            onPress={() => this.setState({ nationalLifeguard: !this.state.nationalLifeguard })}
                        />
                        <CheckBox
                            title="Marine First Aid Certification"
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
                            onPress = {() => {
                                this.handleClick();
                            }}
                        />
            </View>
        );
    }
    handleClick = async () => {
        var credentials = {};

        if(this.state.opioidOverdose){
            credentials.opioidOverdose = "First Aid for Opioid Overdoses Training";
        }
        if(this.state.CPR){
            credentials.CPR = "CPR - Cardiopulmonary Resuscitation Training"
        }
        if(this.state.firstResponder){
            credentials.firstResponder = "First Responder Training"
        }
        if(this.state.medicalResponder){
            credentials.medicalResponder = "Emergency Medical Responder Training"
        }
        if(this.state.oxygenTherapy){
            credentials.oxygenTherapy = "Oxygen Therapy Course"
        }
        if(this.state.wildernessFirstAid){
            credentials.wildernessFirstAid = "Wilderness and Remote First Aid Certification"
        }
        if(this.state.nationalLifeguard){
            credentials.nationalLifeguard = "National Lifeguard Certification"
        }
        if(this.state.marineFirstAid){
            credentials.marineFirstAid = "Marine First Aid Certification"
        }
        if(this.state.lifeguardCourse){
            credentials.lifeguardCourse = "Lifeguard course"
        }

        Axios.post(12321312,
            credentials)
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
