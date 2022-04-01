import React, { Component } from 'react';
import { Button, Text, View } from "react-native";


export default class administrationScreen extends Component {

    render() {
        return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>administrationScreen</Text>

            <Button
                title="Add employee"
                onPress={() => this.props.navigation.navigate('AddEmployee')} 
            />
            <Button
                title="Add item"
                onPress={() => this.props.navigation.navigate('AddItem')}
            />
            <Button
                title="See employees"
                onPress={() => this.props.navigation.navigate('SeeEmployees')}
            />
            <Button
                title="Menu"
                onPress={() => this.props.navigation.navigate('Menu')}
            />
            <Button
                title="Sign out"
                onPress={() => this.props.navigation.navigate('SignIn')}
            />
        </View>
        );
        }



    }