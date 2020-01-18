import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './Screens/login'
import SignUpScreen from './Screens/signup'

class App extends React.Component{
  render(){
    return (


      <View style={styles.container}>
          <View style={{width: '100%', alignItems:'flex-end'}}>
          <Button
              title="Add Credential"
              type="outline"
              buttonStyle = {styles.add}
          />
        </View>

        <View>
          <Text style={styles.emergency}>Emergency?</Text>
        </View>

        <Button
          title="Overdose"
          type="outline"
          buttonStyle = {styles.Button}
        />
        <Button
          title="Heart-attack"
          type="outline"
          buttonStyle = {styles.Button}
        />
        <Button
          title="Drowning"
          type="outline"
          buttonStyle = {styles.Button}
        />
        <Button
          title="Unconscious"
          type="outline"
          buttonStyle = {styles.Button}
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  emergency: {
    fontSize: 36,
    color: "#304269"
  },
  Button: {
    marginBottom: 20,
    width: 300
  },
  add: {


  }
});

const AppNavigator = createStackNavigator({
  HomeScreen: {
    screen: App,
  },
  // Login:{
  //   screen: LoginScreen
  // },
  // Signup: {
  //   screen: SignUpScreen
  // }
});

export default createAppContainer(AppNavigator);
