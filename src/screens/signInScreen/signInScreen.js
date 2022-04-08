import React, { Component } from 'react';
import { Button, Text, View, TextInput, StyleSheet, Image, TouchableOpacity, } from "react-native";

export default class signInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
    }
    render() {
        return (
            <View> 
                <Text style={styles.title}>Willcome to ShareFridge</Text>
                
                <Image style={styles.image} source = {require('../../.././assets/logo.png')}/>
                
                
                <Text style={styles.texts}>E-mail:</Text>
                <View style={styles.inputView}>

                    <TextInput
                        style={styles.TextInput}
                        placeholder="Type your here"
                        placeholderTextColor="#003f5c"
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.text}
                    />
                </View>
                <Text style={styles.texts}>Password:</Text>
                <View style={styles.inputView}>

                    <TextInput
                        style={styles.TextInput}
                        placeholder="Type password here"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.text}
                    />
                </View>
                <View>

                    <TouchableOpacity>
                        <Text style={styles.forgot_button}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginBtn}   
                    onPress={(onPress) => this.props.navigation.navigate('Administration')}>
                        <Text style={styles.loginText}>SignIn</Text>
                      
                    </TouchableOpacity>

                    <Button
                        title="administration"
                        onPress={() => this.props.navigation.navigate('Administration')}
                    />
                    <Button
                        title="menu"
                        onPress={() => this.props.navigation.navigate('Menu')}
                    />
                </View>
            </View>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },
    title:{
        fontSize: 25,
        fontStyle: 'italic',  
        flex : 1,      
    },
    texts:{
        fontSize: 15,
    },

    logo: {
        width: 50,
        height: 50,
    },
 
    inputView: {
        backgroundColor: "#82B3C9",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        height: 40,
        flex: 1,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
      },
     
      loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#B3E5FC",
      },
      image: {
          
        marginBottom: 40,
        width: 150,
        height: 150,
      },
});