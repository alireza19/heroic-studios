import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Button, Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./Screens/login";
import SignUpScreen from "./Screens/signup";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

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
    return fetch(PUSH_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: {
          value: token
        },
        user: {
          username: "alireza19"
        }
      })
    });
  });
  // POST the token to your backend server from where you can retrieve it to send push notifications.
}

class App extends React.Component {
  static navigationOptions = {
    headerShown: false
  };
  state = {
    notification: {},
    location: null,
    errorMessage: null
  };

  UNSAFE_componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    Location.getCurrentPositionAsync({}).then(location => {
      this.setState({ location });
    });
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
    let text = "Waiting..";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    return (
      <View style={styles.container}>
        <View style={styles.emergencyContainer}>
          <Text style={styles.emergency}>What is the Emergency?</Text>
        </View>
        <View>
          <Text>{text}</Text>
        </View>
        <View style={styles.ButtonContainers}>
          <Button
            title="Overdose"
            type="outline"
            buttonStyle={styles.Button}
            onPress={() => {}}
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
  // Login: {
  //   screen: LoginScreen
  // },
  HomeScreen: {
    screen: App
  },
  Signup: {
    screen: SignUpScreen
  }
});

export default createAppContainer(AppNavigator);
