import React, { Component } from 'react';
import { Button, Text, View, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";


export default class AdministrationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentUsertype: props.route.params.currentUsertype,
        };
      }
    render() {
        return(
        <View style={styles.container}>
            
            <Text style={styles.title}>
                Company reprisantative 
            </Text>
            <Text style={styles.text}>
                Company Name 
            </Text>

            <TouchableOpacity
                style={styles.darkButton}
                onPress={() => this.props.navigation.navigate('AddEmployee')}
            >
                <Text>Add employee</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.darkButton}
                onPress={() => this.props.navigation.navigate('AddItem')}
            >
                <Text>Add item</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.darkButton}
                onPress={() => this.props.navigation.navigate('SeeEmployees')}
            >
                <Text>See employees</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.darkButton}
                onPress={() => this.props.navigation.navigate('Menu', {
                    currentUsertype: this.state.currentUsertype,
                    cart: [],
              })}
            >
                <Text>Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.lightButton}
                onPress={() => this.props.navigation.navigate('SignIn')}
            >
                <Text>Sign out</Text>
            </TouchableOpacity>
        </View>
        );
        }



    }

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'space-evenly',
    },

    title: {
        fontFamily: 'ArimaMadurai-Bold',
        fontSize: 20,
      },

    text: {
      fontFamily: 'ArimaMadurai-Bold',
      fontSize: 15,
    },

    lightButton: {
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: "#B3E5FC",
        borderRadius: 10,
        width: "50%",
        height: "5%",
    },

    darkButton: {
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: "#82B3C9",
        borderRadius: 10,
        width: "50%",
        height: "5%",
    }
    
    
  });
