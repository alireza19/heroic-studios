import React, {Component} from 'react';
import {View, StyleSheet, Text,AsyncStorage} from 'react-native';
import {Button, Input, Avatar, Divider} from "react-native-elements";

//GET DB

export default class ProfileScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            // firstName: '',
            // lastName: '',
            email: 'a'
        }    
    }
    componentDidMount(){
        const email = navigation.getParam('userEmail', 'some email');
        this.setState({email});  
    }
    render(){
        return (
            <View style={styles.container}>
                <View>
                    <Avatar
                        size="xlarge"
                        rounded icon={{ name: 'person' }}
                        // title="GET FROM DB"
                        // onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                        // Images for Camera
                        // onEditPress={ () => }
                    />
                </View>
                {/* {this.state.firstName}
                {this.state.lastName}
                {this.state.email} */}
                
                <View>
                     <Text style={{
                        color:'black',
                        textAlign:'center'}}>{this.state.email}</Text>
                     
                     <Text style={{
                         color:'black',
                         textAlign:'center'}}>some text2</Text>
                         
                    <Text style={{
                        color:'black',
                        textAlign:'center'}}>some text3</Text>

                    <Button
                        title="Add Credentials"
                        type="outline"
                        onPress={() => navigation.navigate("CredentialsScreen")}
                    />
                 </View>
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
});
