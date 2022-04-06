import React, { Component } from 'react';
import { Button, Text, View, Image, StyleSheet, TextInput } from "react-native";

export default class addAnEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {fullName: '', email: ''};
      }

    render() {
        return(
            <View style={styles.container}>
                <Text>Create a new Profile:</Text>
                <Text>Insert photo of profile:</Text>
                <Image
                    source={{ uri: '../../../assets/Emma_Profile.jpg' }}
                    style={styles.Profile_Photo}
                />
                <Text>ID: 2342</Text>
                <Text>Full Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Type full name here"
                    onChangeText={(fullName) => this.setState({fullName})}
                    value={this.state.text}
                />
                <Text>E-mail:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Type E-mail here"
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.text}
                />
                <Text>Password:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.text}
                />
                <Text>Confirm your Password:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password again"
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.text}
                />
                <View style={{ flexDirection:"row" }}>
                    <Button
                        title="Cancel"
                        onPress={() => this.props.navigation.navigate('Administration')}
                    />
                    <Button
                        title="Confirm/Save"
                        onPress={() => this.props.navigation.navigate('Administration')}
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
    Profile_Photo: {
      width: 50,
      height: 50,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
  });
