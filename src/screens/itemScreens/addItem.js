import React, { Component } from 'react';
import { Button, Text, View, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { RadioButton } from 'react-native-paper';

//const [checked, setChecked] = React.useState('food');

export default class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', price: '', amount: '', discription: '', type: '' };

    }

    

    render() {
        //const [checked, setChecked] = React.useState('food');
        return (
           
            <View style={styles.container}>
                <View style={styles.photo_view}>
                    <Text style={styles.title}>
                        Add a new item:
                    </Text>
                    <Image style={styles.Profile_Photo} source={require('../../.././assets/coffee.png')} />
                </View>
                <Text style={styles.text}>
                    Insert photo of profile:
                </Text>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        Name of the item:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Type the name here"
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.text}
                    />
                    <Text style={styles.text}>
                        Price:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="in DKK"
                        onChangeText={(price) => this.setState({ price })}
                        value={this.state.text}
                    />
                    <Text style={styles.text}>
                        Amount:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="amount"
                        onChangeText={(type) => this.setState({ type })}
                        value={this.state.text}
                    />
                </View>
             {/**  
                <View>
                    <RadioButton>
                        value="food"
                        status={checked === 'food' ? 'cheched' : 'unchecked'}
                        onPress={() => setChecked('food')}
                    </RadioButton>
                    <RadioButton>
                    value="drinks"
                        status={checked === 'drinks' ? 'cheched' : 'unchecked'}
                        onPress={() => setChecked('drinks')}
                    </RadioButton>
                    </View>
 */}
 
                <Text style={styles.text}>
                    Discription:
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Short text about the item."
                    onChangeText={(discription) => this.setState({ discription })}
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
        width: 350,
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
