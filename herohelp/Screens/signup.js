import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Input} from "react-native-elements";

// Need to fix label str colour
export default class SignUpScreen extends Component{
    state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
    }


    signedUp = (email, pass) => {
        alert('email: ' + email + ' password: ' + pass)
    }

    render(){

    return (
        <View style={styles.container}>
            <Input style={styles.input}
                   label = "First Name"
                   underlineColorAndroid="transparent"
                   placeholder="John"
                   placeholderTextColor = "gray"
                   onChangeText={(text) => this.setState({firstName: text})}
            />

            <Input style = {styles.input}
                   label = "Last Name"
                   underlineColorAndroid = "transparent"
                   placeholder = "Doe"
                   placeholderTextColor = "gray"
                   onChangeText = {(text) => this.setState({lastName: text})}
            />

            <Input style = {styles.input}
                   label = "Email"
                   underlineColorAndroid = "transparent"
                   placeholder = "Email@address.com"
                   placeholderTextColor = "gray"
                   onChangeText = {(text) => this.setState({email: text})}
            />

            <Input style = {styles.input}
                   label = "Password"
                   underlineColorAndroid = "transparent"
                   placeholder = "Password"
                   placeholderTextColor = "gray"
                   onChangeText = {(text) => this.setState({password: text})}
            />

            <Button
                title= "Sign Up"
                type="outline"
                buttonStyle={styles.button}

                onPress = {
                    () => this.signedUp(this.state.email, this.state.password)
                }
                />
        </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "#FFFFFF",
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    signUp: {
        fontSize: 36,
        color: "#304269"
    },
    input: {
        height: "20%",
        width: '100%',
        borderColor: 'black',
        borderWidth: 1
    },
    button: {
        marginBottom: 20,
        width: '100%'
    }
});


