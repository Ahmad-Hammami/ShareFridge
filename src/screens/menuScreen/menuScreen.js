import React, { Component } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Button, ScrollView } from "react-native";
{/*import { ScrollView } from "react-native-gesture-handler";*/ }
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class menuScreen extends Component {
    constructor(props) {
        super(props)
        displayItems: true

    }
    setDrink = () => {
        this.setState({
            displayItems: true
        })
    }

    setFood = () => {
        this.setState({
            displayItems: false
        })
    }
    render() {
        return (
            <>
                <ScrollView>
                    <Text style={styles.title}>Menu</Text>
                    <Button
                        title="Profile"
                        style={styles.btnProfile}
                        onPress={() => this.props.navigation.navigate('SelectedProfile')}
                    />

                    <View style={styles.msgs}></View> {/**to use for the messages*/}
                    <Text style={styles.lineStyle}>               
    ______________________________________________________________
                        </Text>


                    {/** <View style={styles.buttinRow}>
                        <TouchableOpacity style={styles.switchButoon} onPress={this.setDrink}>
                            <Text style={[this.state.displayItems ? styles.blodBlack : styles.normalBlack]}>
                                Drinks
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.switchButoon} onPress={this.setFood}>
                            <Text style={[this.state.displayItems ? styles.normalBlack : styles.blodBlack]}>
                                Food
                            </Text>
                        </TouchableOpacity>
                    </View>
        */}
                </ScrollView>
            </>



        );

    }


}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontStyle: 'italic',
        flex: 1,
    },
    lineStyle:{
        borderWidth: "1",
        borderColor:'black',
        shadowColor: 'blue',
   },
   btnProfile:{
    width: "13%",
    borderRadius: 12,
    height: 50,
    alignItems: "right",
    justifyContent: "right",
    marginTop: 20,
    backgroundColor: 'black',
   },
    msgs: {

        height: 100,
        width: 300,
        backgroundColor: "blue",
    },
    blodBlack: {
        color: 'black',
        fontWeight: 'bold',
    },
    normalBlack: {
        color: 'black',
        fontWeight: 'normal'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',

    },
    switchButton: {
        backgroundColor: "red",
        height: 35,
        width: windowWidth * .5,
        alignItems: 'center',
        justifyContent: 'center',
    },

});