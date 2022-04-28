import React, { Component } from 'react';
import { Button, Text, View, Image, StyleSheet, TextInput, TouchableOpacity, FlatList, Dimensions, SafeAreaView, ScrollView,} from "react-native";
import Data from "../.././db/users.json";

const {height, width} = Dimensions.get('window');

export default class SelectedProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: Data, 
          currentUser: "emma@gmail.com",
          password1: '', password2: '', password3: ''
        };
        this.arrayholder = Data;
      }
    
    findUser = (currentUser) => {
        const updatedData = this.arrayholder.filter((user) => {
            const user_data = `${user.email})`;
            const text_data = currentUser;
            return user_data.indexOf(text_data) > -1;
        });
        this.setState({ data: updatedData });
    };
    
    componentDidMount()
    {
        this.findUser(this.state.currentUser);
    }

    render() {
        
        return(
            <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
            <View>
                {this.state.data.map(data => {
                  return (
                    <View style={styles.container}>
                        <Text style={styles.title}>
                            {data.name}
                        </Text>
                        <View style={styles.photo_view}>
                            <Image style={styles.Profile_Photo} source = {require('../../.././assets/Emma_Profile.jpg')}/>
                        </View>
                        <View style={styles.rowText}>
                            <Text style={styles.title}>
                                ID:
                            </Text>
                            <Text style={styles.title}>
                                {data.id}
                            </Text>
                        </View>
                        <View style={styles.rowText}>
                            <Text style={styles.title}>
                                Balance:
                            </Text>
                            <Text style={styles.title}>
                                {data.balance}
                            </Text>
                        </View>
                        <View style={styles.rowText}>
                            <Text style={styles.title}>
                                E-mail:
                            </Text>
                            <Text style={styles.title}>
                                {data.email}
                            </Text>
                        </View>
                        <View style={styles.containerCenter}>
                            <TouchableOpacity
                                style={styles.behaviorButton}
                                onPress={() => this.props.navigation.navigate('EViewBehavior')}
                            >
                                <Text>Behavior</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.title}>
                                Change Password:
                            </Text>
                            <Text style={styles.title}>
                                Your Password:
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                onChangeText={(password1) => this.setState({password1})}
                                value={this.state.password1}
                            />
                            <Text style={styles.title}>
                                New Password:
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                onChangeText={(password2) => this.setState({password2})}
                                value={this.state.password2}
                            />
                            <Text style={styles.title}>
                                Confirm new Password:
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                onChangeText={(password3) => this.setState({password3})}
                                value={this.state.password3}
                            />
                            <View style={styles.rowText}>
                                <TouchableOpacity
                                style={styles.lightButton}
                                onPress={() => this.props.navigation.navigate('SelectedProfile')}
                                >
                                    <Text>Back</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                style={styles.darkButton}
                                onPress={() => this.props.navigation.navigate('SelectedProfile')}
                                >
                                    <Text>Save</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                    </View>
                    );
                })}
            </View>
            </ScrollView>
            </SafeAreaView>
        );
    }


}


const styles = StyleSheet.create({
    ex: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
        },

    container: {
        marginTop: 15,
        padding: 2,
    },
    containerCenter: {
        marginTop: 15,
        padding: 2,
        alignItems: "center",
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

    rowText: {
        paddingTop: 10,
        paddingLeft: 60,
        paddingRight: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        
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

    behaviorButton: {
        backgroundColor: "#B3E5FC",
        borderRadius: 10,
        padding: 5,
        width: width * 0.5,
        alignItems: 'center', 
        justifyContent: 'center',
    },

    lightButton: {
        backgroundColor: "#B3E5FC",
        borderRadius: 10,
        padding: 5,
        width: width * 0.2,
        alignItems: 'center', 
        justifyContent: 'center',
    },

    darkButton: {
        backgroundColor: "#82B3C9",
        borderRadius: 10,
        padding: 5,
        width: width * 0.2,
        alignItems: 'center', 
        justifyContent: 'center',
        
    },
    
    
  });