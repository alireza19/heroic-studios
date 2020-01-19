import React, { Component } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";

export default class LoginScreen extends Component {
  static navigationOptions = {
    headerShown: false
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Heroic</Text>
        <TextInput
          //   onChangeText={text => onChangeText(text)}
          //   value={value}
          placeholder="User ID"
          style={styles.loginInput}
        />
        <TextInput placeholder="Password" style={styles.loginInput} />
        <Button
          title="sign in"
          type="outline"
          color="#91BED4"
          buttonStyle={styles.Button}
          onPress={() => {
            this.getUser();
          }}
        />
          <Button
              title="Sign Up"
              type="outline"
              color="#91BED4"
              buttonStyle={styles.Button}
              onPress={() => { this.props.navigation.navigate('Signup');
              }}
          />
      </View>
    );
  }
  getUser = async () => {
    const response = axios
      .get("http://204.209.76.173/loginin", {
        email: "fatih@email.com",
        pass: "password"
      })
      .then(response => {
        if (response.data) {
          this.props.navigation.navigate("HomeScreen");
        } else {
          Alert.alert("Login failed");
        }
      })
      .catch(error => {
        console.log({ error });
      });
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    flexDirection: "column",
    justifyContent: "center"
  },
  loginInput: {
    fontSize: 20,
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "rgba(158, 150, 150, .5)",
    margin: 15
  },
  Button: {
    borderRadius: 5,
    margin: 15
  },
  title: {
    fontSize: 60,
    textAlign: "center",
    color: "#304269",
    fontWeight: "bold"
  }
});
