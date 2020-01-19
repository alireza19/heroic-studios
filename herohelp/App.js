import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Button, Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./Screens/login";
import SignUpScreen from "./Screens/signup";

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.emergency}>Emergency?</Text>
        </View>
        <Button title="Overdose" type="outline" buttonStyle={styles.Button} />
        <Button
          title="Heart-attack"
          type="outline"
          buttonStyle={styles.Button}
        />
        <Button title="Drowning" type="outline" buttonStyle={styles.Button} />
        <Button title="Unconcious" type="outline" buttonStyle={styles.Button} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center"
  },
  emergency: {
    fontSize: 36,
    color: "#304269"
  },
  Button: {
    marginBottom: 20,
    width: 300
  }
});

const AppNavigator = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen
  },
  HomeScreen: {
    screen: App
  }
  // SignupScreen: {
  //   screen: SignUpScreen
  // }
});

export default createAppContainer(AppNavigator);
