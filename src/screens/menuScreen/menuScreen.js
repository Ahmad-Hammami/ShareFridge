import React, { Component } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Button, ScrollView } from "react-native";
{/*import { ScrollView } from "react-native-gesture-handler";*/ }



export default class MenuScreen extends Component {

    render() {

        return (
            <>
                <View style={styles.container}>
                    <Text style={styles.title}>Menu</Text>
                </View>

                <View style={styles.btnstyle}>

                    <TouchableOpacity style={styles.profilebtn}
                        onPress={(onPress) => this.props.navigation.navigate('Administration')}>
                        <Text style={styles.textbtn} >Profile</Text>

                    </TouchableOpacity>


                </View>
            </>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    title: {
        marginTop: 50,
        fontSize: 30,
        fontFamily: 'ArimaMadurai-Bold',
        paddingRight: 270,
    },
    profilebtn: {
        marginLeft: 280,
        width: 100,
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#B3E5FC",
        marginTop: -35 ,
      },
    textbtn: {
        fontSize: 15,
        fontFamily: 'ArimaMadurai-Bold',
    },
    btnstyle: {
        alignItems: 'center', 
        width: "90%",
      },
});