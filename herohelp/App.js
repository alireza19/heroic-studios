import React from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import {Button, Icon} from 'react-native-elements';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.emergency}>Emergency?</Text>
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
        title="Unconcious"
        type="outline"
        buttonStyle = {styles.Button}
      />
    </View>
  );
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

  },
  Button: {
    marginBottom: 20,
    width: 300
  }
});
