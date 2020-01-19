import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Button, Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./Screens/login";
import SignUpScreen from "./Screens/signup";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Axios from "axios";

const PUSH_ENDPOINT = "https://exp.host/--/api/v2/push/send";

async function registerForPushNotificationsAsync() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  // only asks if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  // On Android, permissions are granted on app installation, so
  // `askAsync` will never prompt the user
  // Stop here if the user did not grant permissions
  if (status !== "granted") {
    alert("No notification permissions!");
    return;
  }
  // Get the token that identifies this device
  Notifications.getExpoPushTokenAsync().then(token => {
    // ExponentPushToken[3UgpXrDUr14B2I3Gemq2VO]
    Axios.post("http://204.209.76.173/expoToken", {
      token
    });
    // return 
    // fetch(PUSH_ENDPOINT, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     token: {
    //       value: token
    //     },
    //     user: {
    //       username: "alireza19"
    //     }
    //   })
    // });
  });
  // POST the token to your backend server from where you can retrieve it to send push notifications.
}

class App extends React.Component {
  static navigationOptions = {
    headerShown: false
  };
  state = {
    notification: {}
  };

  componentDidMount() {
    registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }
  _handleNotification = notification => {
    // do whatever you want to do with the notification
    this.setState({ notification: notification });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.emergencyContainer}>
          <Text style={styles.emergency}>What is the Emergency?</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Origin: {this.state.notification.origin}</Text>
          <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
        </View>
        <View style={styles.ButtonContainers}>
          <Button
            title="Overdose"
            type="outline"
            buttonStyle={styles.Button}
            onPress={() => {
              Axios.get("http://204.209.76.173/warning", {
                lat: 53.525684,
                long: -113.519277,
                "type": "Overdose",
                "email": "akfatih2@gmail.com"
              })
            }}
          />
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
