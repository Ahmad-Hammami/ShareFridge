import React, { Component } from 'react';
import { Button, Text, View, Image, StyleSheet, TextInput, TouchableOpacity, FlatList  } from "react-native";
import { SearchBar } from 'react-native-elements';
import Data from "../.././db/users.json";


const renderItem = ({ item }) => <User name={item.name} email={item.email} />;
export default class EmployeeViewListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          data: Data,
          error: null,
          searchValue: "",
        };
        this.arrayholder = Data;
      }
    
    searchFunction = (text) => {
        const updatedData = this.arrayholder.filter((user) => {
            const user_data = `${user.name.toUpperCase()})`;
            const text_data = text.toUpperCase();
            return user_data.indexOf(text_data) > -1;
        });
        this.setState({ data: updatedData, searchValue: text });
      };

    render() {
        return(
            <View style={styles.container}>
            <Text style={styles.title}>
                Employee List:
            </Text>
            <SearchBar
              placeholder="Search Here..."
              lightTheme
              round
              value={this.state.searchValue}
              onChangeText={(text) => this.searchFunction(text)}
              autoCorrect={false}
            />
            <View style={styles.container}>
                <View style={styles.employee_view}>
                <View style={styles.rowText}>
                    <Text style={styles.title}>
                        Name
                    </Text>
                    <Text style={styles.title}>
                        E-mail
                    </Text>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
                </View>
            </View>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.lightButton}
                    onPress={() => this.props.navigation.navigate('Administration')}
                >
                    <Text>Back</Text>
                </TouchableOpacity>
            </View>
            
          </View>
        );
    }

}


const User = ({ name, email }) => {
    return (
        
      <View style={styles.user}>
        <TouchableOpacity
            style={styles.darkButton}
            onPress={() => navigation.navigate('Administration')}
        >
            <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.darkButton}
            onPress={() => navigation.navigate('Administration')}
        >
            <Text style={styles.text}>{email}</Text>
        </TouchableOpacity>
      </View>
    );
  };



const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        padding: 2,
    },

    user: {
        backgroundColor: "#82B3C9",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    title: {
        fontFamily: 'ArimaMadurai-Bold',
        fontSize: 20,
      },

    text: {
      fontFamily: 'ArimaMadurai-Bold',
      fontSize: 15,
    },

    employee_view: {
      backgroundColor: "#B3E5FC",
    },

    rowText: {
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
        width: "20%",
        alignItems: 'center', 
        justifyContent: 'center',
    },

    darkButton: {
        backgroundColor: "#82B3C9",
        borderRadius: 10,
        padding: 5,
        
    },
    
    
  });