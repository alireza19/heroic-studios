import React, {Component} from 'react';
import {View, StyleSheet, Text, Alert, AsyncStorage} from 'react-native';
import {Button, Input} from "react-native-elements";
import axios from "axios";


// Need to fix label str colour
export default class SignUpScreen extends Component{
    state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
    }

    static navigationOptions = {

            headerTitle: () => <Text>Sign Up</Text>,


    }



    render(){

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Heroic</Text>
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

                onPress = {this.checkAccount}
                />
            <Button
                title= "Log In"
                type="outline"
                buttonStyle={styles.button}

                onPress = {
                    () => {this.props.navigation.navigate('Login');
                    }}
            />
        </View>

        );
    }


    checkAccount = async () => {

        axios.get(`http://204.209.76.173/signup?timestamp=${new Date().getTime()}`, {
                name: this.state.firstName.toLowerCase(),
                lastName: this.state.lastName.toLocaleLowerCase(),
                email: this.state.email.toLowerCase(),
                password: this.state.password.toLowerCase()
            })
            .then(response => {
                if (response.data) {
                    this.props.navigation.navigate("HomeScreen");
                } else {
                    Alert.alert("Account Already exists");
                }
            })
            .catch(error => {
                console.log({ error });
            });

            // call the saveData function when authentication is done
    };

    saveData = async () => {
        let user = this.email;
        AsyncStorage.setItem('user',user);
    }

    // function to get data from device storage
    getData = async () => {
        try {
            let userEmail = await AsyncStorage.getItem('user');
        }
        catch(error){
            alert(error);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.75,
        flexDirection: "column",
        justifyContent: "center"
    },
    title: {
        fontSize: 60,
        textAlign: "center",
        color: "#304269",
        fontWeight: "bold"
    },
    signUp: {
        fontSize: 36,
        color: "#304269"
    },
    input: {
        fontSize: 20,
        paddingLeft: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "rgba(158, 150, 150, .5)",
        margin: 15
    },
    button: {
        borderRadius: 5,
        margin: 15
    }
});


