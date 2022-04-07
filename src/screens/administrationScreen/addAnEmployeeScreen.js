import React, { Component } from 'react';
import { Button, Text, View, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default class addAnEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {fullName: '', email: '', password1: '', password2: ''};
      }



    render() {
        return(
            <View style={styles.container}>
                
                <View style={styles.photo_view}>
                    <Text style={styles.title}>
                        Create a new Profile:
                    </Text>
                    <Image style={styles.Profile_Photo} source = {require('../../.././assets/Emma_Profile.jpg')}/>
                </View>
                <Text style={styles.text}>
                    Insert photo of profile:
                </Text>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        ID: 2342
                    </Text>
                    <Text style={styles.text}>
                        Full Name:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Type full name here"
                        onChangeText={(fullName) => this.setState({fullName})}
                        value={this.state.text}
                    />
                    <Text style={styles.text}>
                        E-mail:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Type E-mail here"
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.text}
                    />
                    <Text style={styles.text}>
                        Password:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        onChangeText={(password1) => this.setState({password1})}
                        value={this.state.text}
                    />
                    <Text style={styles.text}>
                        Confirm your Password:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password again"
                        onChangeText={(password2) => this.setState({password2})}
                        value={this.state.text}
                    />
                    <View style={styles.rowButton}>
                        <TouchableOpacity
                            style={styles.lightButton}
                            onPress={() => this.props.navigation.navigate('Administration')}
                        >
                        <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.darkButton}
                            onPress={() => this.props.navigation.navigate('Administration')}
                        >
                        <Text>Confirm/Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      paddingTop: 15,
      paddingLeft: 15,
      flex: 1, 
    },

    title: {
        fontFamily: 'ArimaMadurai-Bold',
        fontSize: 20,
      },

    text: {
      fontFamily: 'ArimaMadurai-Bold',
      fontSize: 15,
    },

    photo_view: {
      alignItems: "center",
    },

    Profile_Photo: {
      width: 200,
      height: 200,
      resizeMode: "center",
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontFamily: 'ArimaMadurai-Regular',
        borderRadius: 10,
        backgroundColor: "#82B3C9",
      },

    rowButton: {
        paddingTop: 10,
        paddingLeft: 60,
        paddingRight: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },

    lightButton: {
        backgroundColor: "#B3E5FC",
        borderRadius: 10,
        padding: 5,
    },

    darkButton: {
        backgroundColor: "#82B3C9",
        borderRadius: 10,
        padding: 5,
    }
    
    
  });

async function addEmployee() {
    if(items.length < 1 || items == undefined){
       return undefined;
    }
    const {fullName, email, password1, password2} = this.state;
    const matches = password === c_password;
    matches ? alert("MATCHED") : alert("NO MATCH");  
  
    const rawResponse = await fetch(baseUrl + "/addEmployee", {
       method: "POST",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
       },
       body:   {
        "id": 5,
        "fullName": fullName,
        "email": email,
        "password": password,
        "photo": false
      },
     })
       .then(function (res) {
         return res.text();
       })
       .catch((err) => {
         console.log(err);
       });
     return rawResponse;
    }