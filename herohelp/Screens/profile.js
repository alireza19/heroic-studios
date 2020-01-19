import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, Input, Avatar, Divider} from "react-native-elements";
import ImagePicker from 'react-native-image-picker';


export default class CredentialsScreen extends Component{
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
                     <Text style={{
                         color:'black',
                         textAlign:'center'}}>GET NAME FROM DB</Text>
                     <Text style={{
                         color:'black',
                         textAlign:'center'}}>EMAIL</Text>
                    <Text style={{
                        color:'black',
                        textAlign:'center'}}>???</Text>


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
