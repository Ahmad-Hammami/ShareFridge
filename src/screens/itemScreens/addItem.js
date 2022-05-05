import React, { Component, useState } from 'react';
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Dimensions, } from "react-native";
import { RadioButton } from 'react-native-paper';
import { ScrollView } from 'react-native-virtualized-view';
import MultiSelect from 'react-native-multiple-select';



const {height, width} = Dimensions.get('window');

const contents = [{
    id: 'Suger',
    name: 'Suger'
  }, {
    id: 'Caffeine',
    name: 'Caffeine'
  }, {
    id: 'Fat',
    name: 'Fat'
  }, {
    id: 'Salt',
    name: 'Salt'
  }
];

export default class AddItem extends Component {
    constructor(props) {
        super(props);

        this.state = {name: '', price: '', amount: '', description: '',
                        type: 'food',

                        selectedContents : []
        };
    }

    onSelectedItemsChange = selectedContents => {
        if (selectedContents === []) {
            this.clearSelectedCategories
        } else {
            this.setState({ selectedContents });
        }
        
      };

    clearSelectedCategories = () => {
        this._multiSelect._removeAllItems();
     };

    render() {     
        const { selectedContents } = this.state;

        return (
            <SafeAreaView>
            <ScrollView>
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
                        onChangeText={(amount) => this.setState({ amount })}
                        value={this.state.text}
                    />
                </View>
                <View style={styles.rowButton}>
                    <View>
                        <Text style={styles.text}>
                            Item type: 
                        </Text>
                    </View>
                    <View>
                        <RadioButton.Group 
                            onValueChange={value => { this.setState({ type: value })}}
                            value={this.state.type} 
                        >
                        <RadioButton.Item
                            value= "food"
                            label= "food"
                            labelStyle={styles.text}
                        />
                        <RadioButton.Item
                            value= "drinks"
                            label= "drinks"
                            labelStyle={styles.text}
                        />
                        </RadioButton.Group>
                    </View>
                </View>

                <MultiSelect
                    hideTags
                    items={contents}
                    uniqueKey="id"
                    ref={(component) => { this.multiSelect = component }}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={selectedContents}
                    selectText="Contents"
                    searchInputPlaceholderText="Search Items..."
                    onChangeInput={ (text)=> console.log(text)}
                    altFontFamily="ArimaMadurai-Regular"
                    fontFamily="ArimaMadurai-Regular"
                    itemFontFamily="ArimaMadurai-Regular"
                    selectedItemFontFamily="ArimaMadurai-Regular"
                    tagRemoveIconColor="#82B3C9"
                    backgroundColor="#B3E5FC"
                    tagBorderColor="#82B3C9"
                    tagTextColor="#000000"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#B3E5FC"
                    itemTextColor="#000000"
                    displayKey="name"
                    searchInputStyle={{ color: '#82B3C9' }}
                    submitButtonColor="#82B3C9"
                    submitButtonText="Submit"
                />
                <View>
                    { this.multiSelect ? this.multiSelect.getSelectedItemsExt(selectedContents) : null}
                </View>
                
                
                
                
 
                <Text style={styles.text}>
                    Description:
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Short text about the item."
                    onChangeText={(description) => this.setState({ description })}
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
            </ScrollView>
            </SafeAreaView>
        );
    }


}


const styles = StyleSheet.create({
    container: {
        marginTop: height * 0.08,
        marginLeft: width * 0.05,
        marginRight: width * 0.05,
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
        height: height * 0.05,
        width: width * 0.8,
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
        width: width * 0.2,
        height: height * 0.03,
        alignItems: 'center', 
        justifyContent: 'center',
    },

    darkButton: {
        backgroundColor: "#82B3C9",
        borderRadius: 10,
        width: width * 0.3,
        height: height * 0.03,
        alignItems: 'center', 
        justifyContent: 'center',
    }


});
