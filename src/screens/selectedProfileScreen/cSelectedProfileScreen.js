import React, { Component, Fragment } from 'react';
import { Button, Text, View, Image, StyleSheet, TextInput, TouchableOpacity, FlatList, Dimensions, SafeAreaView, ScrollView,} from "react-native";
import Data from "../../db/users.json";

const {height, width} = Dimensions.get('window');

export default class ESelectedProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: Data, 
          currentUser: props.route.params.param,
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
            <View>
                {this.state.data.map(data => {
                  return (
                    <Fragment key={data.id}>
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
                        <View style={styles.container}>
                            <View style={styles.rowText}>
                                <TouchableOpacity
                                style={styles.lightButton}
                                onPress={() => this.props.navigation.navigate('SeeEmployees')}
                                >
                                    <Text>Back</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                style={styles.redButton}
                                onPress={() => this.props.navigation.navigate('SeeEmployees')}
                                >
                                    <Text>Delete</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                    </View>
                    </Fragment>
                    );
                })}
            </View>
        );
    }


}


const styles = StyleSheet.create({
    container: {
        marginTop: height * 0.08,
        marginLeft: width * 0.05,
        marginRight: width * 0.05,
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
        paddingTop: height * 0.02,
        paddingLeft: width * 0.1,
        paddingRight: width * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },

    lightButton: {
        backgroundColor: "#B3E5FC",
        borderRadius: 10,
        width: width * 0.2,
        height: height * 0.03,
        alignItems: 'center', 
        justifyContent: 'center',
    },

    redButton: {
        backgroundColor: "#EB6A6A",
        borderRadius: 10,
        width: width * 0.2,
        height: height * 0.03,
        alignItems: 'center', 
        justifyContent: 'center',
        
    },
    
    
  });