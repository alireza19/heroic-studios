import React, {Component} from 'react';
import {View, StyleSheet, Text, AsyncStorage, Alert} from 'react-native';
import {Button, Input, Avatar, Divider} from "react-native-elements";
import axios from "axios";

//GET DB

export default class ProfileScreen extends Component{

    constructor(){
        super();
        this.state = {
            email:''
        }
        }

    getEmail =async () => {

            axios.post("DB Addy")
                .then(response => {
                    if (response.data) {
                       this.setState({email:response.data})
                    }
                })
                .catch(error => {
                    console.log({ error });
                });

        };

    render(){
        return (
            <View style={styles.container}>
                <View>
                    <Avatar
                        size="xlarge"
                        rounded
                        title="GET FROM DB"
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                        showEditButton
                        // Images for Camera
                        // onEditPress={ () => }
                    />
            </View>
                <View>
                     {/*<Text style={{*/}
                     {/*    color:'black',*/}
                     {/*    textAlign:'center'}}>GET NAME FROM DB</Text>*/}
                     <Text style={{
                         color:'black',
                         textAlign:'center'}}>
                         {this.state.email}
                     </Text>

                    <Button
                        title="Add Credentials"
                        type="outline"
                        // buttonStyle = {styles.Button}

                    />
                 </View>
                </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        width: '100%',
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center'
    },



});
