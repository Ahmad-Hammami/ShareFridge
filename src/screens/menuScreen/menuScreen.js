import React, { Component } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, FlatList, ScrollView } from "react-native";
import Items from "../../db/items.json";
import { useNavigation  } from "@react-navigation/native"

const {height, width} = Dimensions.get('window');
let food = false;

const renderitemp = ({ item }) => <Itemp name={item.name} price={item.price} priority={item.priority} type={item.type}/>;
const renderitem = ({ item }) => <Item name={item.name} price={item.price} priority={item.priority} type={item.type}/>;
export default class MenuScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Behavior: "", 
          currentUser: "emma@gmail.com", //props.route.params."name",
          items: Items,
          food: false,
        };
      }

    foodFunction = () => {
        this.setState({ food: true });
        food = true;
      };
    drinksFunction = () => {
        this.setState({ food: false });
        food = false;
      };

    componentDidMount(){
        if(this.state.Behavior === ""){
            this.setState({ Behavior: "No new behavior detected, have a good day." });
        }
    }
    render() {

        return (
            <View>
                <View style={styles.containerBlackLine}>
                    <View style={styles.container}>
                        <View style={styles.containerCenter}>
                            <Text style={styles.title}>Menu</Text>
                        </View>

                        <View style={styles.btnstyle}>
                            <TouchableOpacity style={styles.profilebtn}
                                onPress={(onPress) => this.props.navigation.navigate('ESelectedProfile')}>
                                <Text style={styles.textbtn}>
                                    Profile
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.behaviorText}>
                                {this.state.Behavior}
                            </Text>
                        </View>
                    </View>
                </View>

                <View>
                    <View style={styles.rowButtons}>
                        <TouchableOpacity
                            style={styles.foodButton(this.state.food)}
                            onPress={() => this.foodFunction()}
                        >
                            <Text style={styles.textbtn}>
                                Food
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.drinksButton(this.state.food)}
                            onPress={() => this.drinksFunction()}
                        >
                            <Text style={styles.textbtn}>
                                Drinks
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={this.state.items}
                        renderItem={renderitemp}
                        keyExtractor={(item) => item.id}
                    />
                    <FlatList
                        data={this.state.items}
                        renderItem={renderitem}
                        keyExtractor={(item) => item.id}
                    />


                    <View style={styles.rowButtons}>
                        <TouchableOpacity
                            style={styles.lightButton}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Text style={styles.textbtn}>
                                Back
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.darkButton}
                            onPress={() => this.props.navigation.navigate('Cart')}
                        >
                            <Text style={styles.textbtn}>
                                Go to Cart
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}







const styles = StyleSheet.create({
    containerBlackLine: {
        paddingBottom: height * 0.03,
        borderBottomColor: 'black',
        borderBottomWidth: 4,
    },

    container: {
        marginTop: height * 0.08,
        marginLeft: width * 0.05,
        marginRight: width * 0.05,
    },

    containerCenter: {
        alignItems: 'center',
    },

    title: {
        fontSize: 30,
        fontFamily: 'ArimaMadurai-Bold',
        paddingRight: 270,
    },

    btnstyle: {
        alignItems: 'center', 
        width: "90%",
      },
      

    profilebtn: {
        marginLeft: 280,
        width: 100,
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#B3E5FC",
        marginTop: -35 ,
      },

    behaviorText: {
        fontSize: 15,
        marginTop: height * 0.02,
        fontFamily: 'ArimaMadurai-Bold',
        paddingBottom: height * 0.1,
        backgroundColor: "#B3E5FC",
    },

    rowButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    
    textbtn: {
        fontSize: 15,
        fontFamily: 'ArimaMadurai-Bold',
    },

    foodButton: function(food) {
        if (food){
            return {
                paddingHorizontal: width * 0.2,
                paddingVertical: height  * 0.02,
              }
        }else{
            return {
                paddingHorizontal: width * 0.2,
                paddingVertical: height  * 0.02,
                backgroundColor: "#B3E5FC",
            }
        } 
    },

    drinksButton: function(food) {
        if (food){
            return {
                paddingHorizontal: width * 0.2,
                paddingVertical: height  * 0.02,
                backgroundColor: "#B3E5FC",
              }
        }else{
            return {
                paddingHorizontal: width * 0.2,
                paddingVertical: height  * 0.02,
            }
        } 
    },
    items: {
        backgroundColor: "#82B3C9",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemButton: {
        backgroundColor: "#82B3C9",
        borderRadius: 10,
        padding: 5,
        
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



const Itemp = ({ name, price, priority, type }) => {
    const navigation = useNavigation(); 
    if(food){
        if(type === "food"){
            if(priority){
                return (    
                    <View style={styles.items}>
                        <TouchableOpacity
                            style={styles.itemButton}
                            onPress={() => navigation.navigate('CSelectedProfile', {})}
                        >
                            <Text style={styles.textbtn}>{name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.itemButton}
                            onPress={() => navigation.navigate('CSelectedProfile', {})}
                        >
                            <Text style={styles.textbtn}>{price} Kr.</Text>
                        </TouchableOpacity>
                    </View>
                );
            } else {
                return (    
                    <View>
                    </View>
                );
            }
            
        } else{
            return (    
                <View>
                </View>
            );
        }
    
    } else {
        if(type === "drinks"){
            if(priority){
                return (    
                    <View style={styles.items}>
                        <TouchableOpacity
                            style={styles.itemButton}
                            onPress={() => navigation.navigate('CSelectedProfile', {})}
                        >
                            <Text style={styles.textbtn}>{name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.itemButton}
                            onPress={() => navigation.navigate('CSelectedProfile', {})}
                        >
                            <Text style={styles.textbtn}>{price} Kr.</Text>
                        </TouchableOpacity>
                    </View>
                );
            } else {
                return (    
                    <View>
                    </View>
                );
            }
            
        } else{
            return (    
                <View>
                </View>
            );
        }
    }
  };

const Item = ({ name, price, priority, type }) => {
    const navigation = useNavigation(); 
    if(food){
        if(type === "food"){
            if(!priority){
                return (    
                    <View style={styles.items}>
                        <TouchableOpacity
                            style={styles.itemButton}
                            onPress={() => navigation.navigate('CSelectedProfile', {})}
                        >
                            <Text style={styles.textbtn}>{name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.itemButton}
                            onPress={() => navigation.navigate('CSelectedProfile', {})}
                        >
                            <Text style={styles.textbtn}>{price} Kr.</Text>
                        </TouchableOpacity>
                    </View>
                );
            } else {
                return (    
                    <View>
                    </View>
                );
            }
            
        } else{
            return (    
                <View>
                </View>
            );
        }
    
    } else {
        if(type === "drinks"){
            if(!priority){
                return (    
                    <View style={styles.items}>
                        <TouchableOpacity
                            style={styles.itemButton}
                            onPress={() => navigation.navigate('CSelectedProfile', {})}
                        >
                            <Text style={styles.textbtn}>{name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.itemButton}
                            onPress={() => navigation.navigate('CSelectedProfile', {})}
                        >
                            <Text style={styles.textbtn}>{price} Kr.</Text>
                        </TouchableOpacity>
                    </View>
                );
            } else {
                return (    
                    <View>
                    </View>
                );
            }
            
        } else{
            return (    
                <View>
                </View>
            );
        }
    }
  };