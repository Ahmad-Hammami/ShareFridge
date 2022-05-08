import React, { Component, useState } from 'react';
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Dimensions, ScrollView} from "react-native";
import { RadioButton, Button, Checkbox } from 'react-native-paper';
//import { ScrollView } from 'react-native-virtualized-view';
import MultiSelect from 'react-native-multiple-select';
import Item from "../../db/items.json";



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

export default class EditItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: Item, 
            selectedItem: props.route.params.selectedItemName,

            name: '', price: "0", amount: "0", description: '', priority: false, picture: "https://i.ibb.co/4gFLMD3/coffee.png", type: '',
            suger: false, caffeine: false, fat: false, salt: false,
        };

        this.arrayholder = Item;
        
    }


    findItem = async (selectedItem) => {
        let updatedData = await this.arrayholder.filter((item) => {
            const item_data = `${item.name})`;
            const text_data = selectedItem;
            return item_data.indexOf(text_data) > -1;
        });
        await this.setState({ item: updatedData });
                    
        this.state.item.map(item => {
            this.setState({ suger: item.suger });
            this.setState({ caffeine: item.caffeine });
            this.setState({ fat: item.fat });
            this.setState({ salt: item.salt });
            this.setState({ name: item.name });
            this.setState({ price: item.price });
            this.setState({ amount: item.amount });
            this.setState({ description: item.description });
            this.setState({ priority: item.priority });
            this.setState({ picture: item.picture });
            this.setState({ type: item.type });
        });
    };
    
    componentDidMount()
    {
        this.findItem(this.state.selectedItem);
    }

    render() {
        const { name, price, amount, description, priority, picture, type } = this.state;
        const { suger, caffeine, fat, salt } = this.state;

        return (
            <SafeAreaView>
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.rowDeleteButton}>
                    <Text style={styles.title}>
                        {name}
                    </Text>
                    <TouchableOpacity
                        style={styles.redButton}
                        onPress={() => this.props.navigation.navigate('Menu')}
                    >
                        <Text>Delete</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.photo_view}>
                    
                    <Image style={styles.Profile_Photo} source={{uri: picture}} />
                </View>
                <View>
                    <View style={styles.rowButton}>
                        <Text style={styles.text}>
                            Priority:
                        </Text>
                        <Checkbox
                            status={priority ? 'checked' : 'unchecked'}
                            onPress={() => { this.setState({ priority: !priority }); }}
                        />
                    </View>
                    
                    <Text style={styles.text}>
                        Price:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="in DKK"
                        onChangeText={(price) => this.setState({ price })}
                        value={price}
                    />
                    <Text style={styles.text}>
                        Amount:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="amount"
                        onChangeText={(amount) => this.setState({ amount })}
                        value={amount}
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
                            value={type} 
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
                <Text style={styles.title}>
                    Contents
                </Text>
                <View style={styles.rowButton}>
                    <Text style={styles.text}>
                        suger
                    </Text>
                    <Checkbox
                        status={suger ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ suger: !suger }); }}
                    />
                    <Text style={styles.text}>
                        caffeine
                    </Text>
                    <Checkbox
                        status={caffeine ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ caffeine: !caffeine }); }}
                    />
                </View>
                <View style={styles.rowButton}>
                    <Text style={styles.text}>
                        fat
                    </Text>
                    <Checkbox
                        status={fat ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ fat: !fat }); }}
                    />
                    <Text style={styles.text}>
                        salt
                    </Text>
                    <Checkbox
                        status={salt ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ salt: !salt }); }}
                    />
                </View>

                {/*
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
                */}
                
                
                
 
                <Text style={styles.text}>
                    Description:
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Short text about the item."
                    onChangeText={(description) => this.setState({ description })}
                    value={description}
                />

                <View style={styles.rowButton}>
                    <TouchableOpacity
                        style={styles.lightButton}
                        onPress={() => this.props.navigation.navigate('Menu', {
                            cart: []
                        })}
                    >
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.darkButton}
                        onPress={() => this.props.navigation.navigate('Menu',{
                            cart:[]
                        })}
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

    rowDeleteButton: {
        paddingLeft: 10,
        paddingRight: 10,
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
