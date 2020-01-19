import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, AsyncStorage} from "react-native";
import { Button } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
export default class LoginScreen extends Component {
  static navigationOptions = {
    headerShown: false
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: ""
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Heroic</Text>
        <View style={{alignItems:'center'}}>
          <TextInput
            onChangeText={value => this.setState({ email: value })}
            value={this.state.email}
            placeholder="User ID"
            style={styles.loginInput}
          />
          <TextInput
            placeholder="Password"
            style={styles.loginInput}
            onChangeText={value => this.setState({ pass: value })}
            value={this.state.pass}
          />

        <Button
          title="sign in"
          // type="outline"
          color="#91BED4"
          buttonStyle={styles.Button}
          onPress={() => {
            this.getUser();
          }}
        />
        <Button
          title="Sign Up"
          // type="outline"
          color="#91BED4"
          buttonStyle={styles.Button}
          onPress={() => {
            this.props.navigation.navigate("Signup");
          }}
        />
        </View>
      </View>
    );
  }
  getUser = async () => {
    axios.post(`http://204.209.76.173/loginin?timestamp=${new Date().getTime()}`, {
      email: this.state.email.toLowerCase(),
      pass: this.state.pass.toLowerCase()
    })
    .then(response => {
      console.log({email: this.state.email, pass: this.state.pass, data: response.data});
      if (response.data.res == true) {
        AsyncStorage.setItem("user", this.state.email);
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
    fontSize: 25,
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "rgba(158, 150, 150, .5)",
    margin: 15,
    width: '80%',
    paddingLeft: 30,
    height: 50
  },
  Button: {
    borderRadius: 5,
    margin: 15,
    width: '80%'
  },
  title: {
    fontSize: 60,
    textAlign: "center",
    color: "#304269",
    fontWeight: "bold"
  }
});
