import React, { Component, Fragment } from 'react';
import { Button, Text, View, Image, StyleSheet, TextInput, TouchableOpacity, FlatList, Dimensions, SafeAreaView, ScrollView,} from "react-native";
import Item from "../../db/items.json";

const {height, width} = Dimensions.get('window');

export default class SelectedItemScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          item: Item, 
          selectedItem: "Coca-Cola",//props.route.params.selectedItemName,
        };
        this.arrayholder = Item;
      }
    
    findItem = (selectedItem) => {
        const updatedData = this.arrayholder.filter((item) => {
            const item_data = `${item.name})`;
            const text_data = selectedItem;
            return item_data.indexOf(text_data) > -1;
        });
        this.setState({ item: updatedData });
    };
    
    componentDidMount()
    {
        this.findItem(this.state.selectedItem);
    }
    render() {
        return(
            <View>
                {this.state.item.map(item => {
                  return (
                    <Fragment key={item.id}>
                    <View style={styles.container}>
                        <Text style={styles.title}>
                            {item.name}
                        </Text>
                        <View style={styles.photo_view}>
                            <Image style={styles.Profile_Photo} source = {{uri: item.picture}}/>
                        </View>
                        <View style={styles.rowText}>
                            <Text style={styles.title}>
                                Price:
                            </Text>
                            <Text style={styles.title}>
                                {item.price}
                            </Text>
                        </View>
                        <View style={styles.rowText}>
                            <Text style={styles.title}>
                                Amount to be added to cart
                            </Text>
                            <Text style={styles.title}>
                                {item.balance}
                            </Text>
                        </View>
                        <View style={styles.rowText}>
                            <Text style={styles.title}>
                                
                            </Text>
                            <Text style={styles.title}>
                                {item.email}
                            </Text>
                        </View>
                        <View style={styles.rowText}>
                            <Text style={styles.title}>
                                description
                            </Text>
                            <Text style={styles.title}>
                                {item.description}
                            </Text>
                        </View>
                        <View style={styles.container}>
                            <View style={styles.rowText}>
                                <TouchableOpacity
                                style={styles.lightButton}
                                onPress={() => this.props.navigation.navigate('EditItem')}
                                >
                                    <Text>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                style={styles.darkButton}
                                onPress={() => this.props.navigation.navigate('Menu')}
                                >
                                    <Text>Add to Cart</Text>
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

    darkButton: {
        backgroundColor: "#82B3C9",
        borderRadius: 10,
        width: width * 0.2,
        height: height * 0.03,
        alignItems: 'center', 
        justifyContent: 'center',
        
    },
    
    
  });