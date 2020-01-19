import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./Screens/login";
import SignUpScreen from "./Screens/signup";

class App extends React.Component {
  static navigationOptions = {
    headerShown: false
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.emergencyContainer}>
          <Text style={styles.emergency}>What is the Emergency?</Text>
        </View>
        <View style={styles.ButtonContainers}>
          <Button title="Overdose" type="outline" buttonStyle={styles.Button} />
          <View>
            <Button title="Alcohol" buttonStyle={{ ...styles.Button }} />
          </View>
          <Button
            title="Heart-attack"
            type="outline"
            buttonStyle={styles.Button}
          />
          <Button title="Drowning" type="outline" buttonStyle={styles.Button} />
          <Button
            title="Unconscious "
            type="outline"
            buttonStyle={styles.Button}
          />
          <View style={styles.infoPane}>
            <Text
              style={{
                color: "white",
                textAlign: "center"
              }}
            >
              HeroHelp sends your location to 911{" "}
            </Text>
            <Text
              style={{
                color: "white",
                textAlign: "center"
              }}
            >
              during an emergency.
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF"
    // backgroundColor: 'grey'
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  emergencyContainer: {
    flex: 2,
    paddingBottom: 30
    // backgroundColor: 'grey'
  },
  emergency: {
    fontSize: 36,
    color: "#F26101",
    marginTop: 30,
    marginLeft: 40
  },
  ButtonContainers: {
    // backgroundColor: 'grey',
    // marginTop: 40,
    alignItems: "center",
    flex: 8
  },
  Button: {
    marginBottom: 20,
    width: 300,
    height: 50,
    borderColor: "#304269"
  },
  infoPane: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#304269",
    width: "100%",
    // flex:2,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    marginTop: 40
  }
});

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  HomeScreen: {
    screen: App
  },
  Signup: {
    screen: SignUpScreen
  }
});

export default createAppContainer(AppNavigator);
