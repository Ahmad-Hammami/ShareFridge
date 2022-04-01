import React, { Component } from 'react';
import { Button, Text, View } from "react-native";


export default class signInScreen extends Component {

    render() {
        return(
        <View>
            <Text>signIn</Text>
            <Button
                title="administration"
                onPress={() => this.props.navigation.navigate('Administration')} 
            />
            <Button
                title="menu"
                onPress={() => this.props.navigation.navigate('Menu')} 
            />
        </View>
        );
        
    }


}