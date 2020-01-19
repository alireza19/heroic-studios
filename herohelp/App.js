import React from "react";
import { StyleSheet, Text, View, Alert, AsyncStorage } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./Screens/login";
import SignUpScreen from "./Screens/signup";
import HelpScreen from "./Screens/help";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

import axios from "axios";
import CredentialsScreen from "./Screens/CredentialsScreen";
import ProfileScreen from "./Screens/profile";

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

  // POST the token to your backend server from where you can retrieve it to send push notifications.
}

class App extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <Text>Home</Text>,

      headerRight: () => (
        <Button
          onPress={() => navigation.navigate("Profile")}
          title="Profile"
          color="#fff"
        />
      )
    };
  };
  state = {
    notification: {},
    chosen: "",
    location: {
      coords: {
        longitude: 0,
        latitude: 0
      }
    }
  };

  // function to get data from device storage
  getData = async () => {
    try {
      let userEmail = await AsyncStorage.getItem("user");
      console.log("Logged in with : " + userEmail);
      Notifications.getExpoPushTokenAsync()
        .then(token => {
          // ExponentPushToken[3UgpXrDUr14B2I3Gemq2VO]
          console.log("EXPO TOKEN: ");
          console.log(token);

          axios.post(
            `http://204.209.76.173/expoToken?timestamp=${new Date().getTime()}`,
            {
              token: token,
              email: userEmail
            }
          );
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      alert(error);
    }
  };

  UNSAFE_componentWillMount() {
    if (Platform.OS === "android") {
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
      axios.post(`http://204.209.76.173/updateLoc?t=${new Date().getTime()}`, {
        lat: location.coords.latitude,
        long: location.coords.longitude,
        email: AsyncStorage.getItem("user")
      });
    });
  };
  componentDidMount() {
    this.getData();
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

  sendWarning = () => {
    axios
      .post(`http://204.209.76.173/warning?timestamp=${new Date().getTime()}`, {
        lat: this.state.location.coords.latitude,
        long: this.state.location.coords.longitude,
        type: "Overdose",
        email: "akfatih2@gmail.com"
      })
      .then(res => {
        // console.log(res);
        Alert.alert("sent");
      });
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.emergencyContainer}>
          <Text style={styles.emergency}>What is the Emergency?</Text>
        </View>
        <View style={styles.ButtonContainers}>
          <Button
            title="Overdose"
            type="outline"
            buttonStyle={styles.Button}
            // onPress={() => { this.props.navigation.navigate('Help', {chosen:"Overdoes"})}}
            onPress={() => {
              this.sendWarning();
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
  Signup: {
    screen: SignUpScreen
  },
  HomeScreen: {
    screen: App
  },
  Profile: {
    screen: ProfileScreen
  },

  Credentials: {
    screen: CredentialsScreen
  }
  // Credentials: {
  //   screen: CredentialsScreen
  // }
});

export default createAppContainer(AppNavigator);
