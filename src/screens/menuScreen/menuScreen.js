import React, { Component } from 'react';
import { Button, Text, View, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, FlatList, ScrollView } from "react-native";

import { useNavigation } from "@react-navigation/native"

const { height, width } = Dimensions.get('window');
let food = false;
let currentUsertype = "";
let cart = new Array();

const renderitemp = ({ item }) => <Itemp name={item.name} price={item.price} priority={item.priority} type={item.type} />;
const renderitem = ({ item }) => <Item name={item.name} price={item.price} priority={item.priority} type={item.type} />;
export default class MenuScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Behavior: "",
            currentUsertype: props.route.params.currentUsertype,
            currentUser: props.route.params.currentUser,

            cart: props.route.params.cart,
            items: null,
            food: false,
            update: props.route.params,
        };
    }


    getItems = () => {
        fetch("https://sharefridgebackend.herokuapp.com/items")
            .then((res) => (res.json()))
            .then((result) => {
                console.log(result)
                this.setState({ items: result })

            })
            .catch((error) => {
                console.error(error)
            });
    }

    componentDidMount() {
        this.getItems();
        if (this.state.Behavior === "") {
            this.setState({ Behavior: "No new behavior detected, have a good day." });
        }
        currentUsertype = this.state.currentUsertype
        cart = this.state.cart;
        this.setState({random: false})
    }

    renderitemp = ({ item }) => {
        const {navigation} = this.props
        if (food) {
            if (item.type === "food") {
                if (item.priority) {
                    if (currentUsertype === "employee") {
                        return (
                            <TouchableOpacity
                                style={styles.itemButton}
                                onPress={() => navigation.navigate('SelectedItem', {
                                    selectedItemName: item.name,
                                    cart: cart,
                                })}
                            >
                                <View style={styles.items}>
                                    <Text style={styles.textSide}>{item.name}</Text>
                                    <Text style={styles.textMiddel}>{item.price} Kr.</Text>
                                    <Text style={styles.textSide}>add to cart</Text>
                                    <TouchableOpacity
                                        style={styles.addToCartButton}
                                        onPress={() => cart.push(item.name)}
                                    >
                                        <Text>+</Text>
                                    </TouchableOpacity>
    
                                </View>
                            </TouchableOpacity>
                        );
                    } else if (currentUsertype === "companyRepresentative") {
                        return (
                            <TouchableOpacity
                                style={styles.itemButton}
                                onPress={() => navigation.navigate('EditItem', {
                                    selectedItemName: item.name,
                                })}
                            >
                                <View style={styles.items}>
                                    <Text style={styles.textSide}>{item.name}</Text>
                                    <Text style={styles.textSide}>{item.price} Kr.</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    } else {
                        return (<View></View>);
                    }
                } else {
                    return (<View></View>);
                }
    
            } else {
                return (<View></View>);
            }
    
        } else {
            if (item.type === "drinks") {
                if (item.priority) {
                    if (currentUsertype === "employee") {
                        return (
                            <TouchableOpacity
                                style={styles.itemButton}
                                onPress={() => navigation.navigate('SelectedItem', {
                                    selectedItemName: item.name,
                                    cart: cart,
                                })}
                            >
                                <View style={styles.items}>
                                    <Text style={styles.textSide}>{item.name}</Text>
                                    <Text style={styles.textMiddel}>{item.price} Kr.</Text>
                                    <Text style={styles.textSide}>add to cart</Text>
                                    <TouchableOpacity
                                        style={styles.addToCartButton}
                                        onPress={() => cart.push(item.name)}
                                    >
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        );
                    } else if (currentUsertype === "companyRepresentative") {
                        return (
                            <TouchableOpacity
                                style={styles.itemButton}
                                onPress={() => navigation.navigate('EditItem', {
                                    selectedItemName: item.name,
                                })}
                            >
                                <View style={styles.items}>
                                    <Text style={styles.textSide}>{item.name}</Text>
                                    <Text style={styles.textSide}>{item.price} Kr.</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    } else {
                        return (<View></View>);
                    }
    
                } else {
                    return (<View></View>);
                }
    
            } else {
                return (<View></View>);
            }
        }
    };


    foodFunction = () => {
        this.setState({ food: true });
        food = true;
    };
    drinksFunction = () => {
        this.setState({ food: false });
        food = false;
    };

    profileButton = () => {
        if (currentUsertype === "employee") {
            return (
                <TouchableOpacity style={styles.profilebtn}
                    onPress={() => this.props.navigation.navigate('ESelectedProfile', {
                        currentUser: this.state.currentUser,
                        currentUsertype: this.state.currentUsertype
                    })}>
                    <Text style={styles.textbtn}>
                        Profile
                    </Text>
                </TouchableOpacity>
            );
        } else if (currentUsertype === "companyRepresentative") {
            return (<></>);
        }
    }
    update = async () => {
        let {update} = this.props.route.params  
        console.log(update);
        if(update){
            await this.getItems();
            update = false
        }
    }

    render() {
        this.update();
        return (
            <View>
                <View style={styles.containerBlackLine}>
                    <View style={styles.container}>
                        <View>
                            <Text style={styles.title}>Menu</Text>
                        </View>

                        <View style={styles.btnstyle}>
                            {this.profileButton()}

                        </View>
                        <View style={styles.behaviorTextView}>
                            <Text style={styles.behaviorText}>
                                {this.state.Behavior}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.menu_view}>
                    <View style={styles.rowButtons}>
                        <TouchableOpacity
                            style={styles.foodButton(this.state.food)}
                            onPress={() => this.foodFunction()}
                        >
                            <Text style={styles.titleTextbtn}>
                                Food
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.drinksButton(this.state.food)}
                            onPress={() => this.drinksFunction()}
                        >
                            <Text style={styles.titleTextbtn}>
                                Drinks
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            data={this.state.items}
                            renderItem={this.renderitemp}
                            keyExtractor={(item) => item._id}
                        />
                        <FlatList
                            data={this.state.items}
                            renderItem={renderitem}
                            keyExtractor={(item) => item._id}
                        />
                    </View>
                </View>
                <View style={styles.rowButtons}>
                    <TouchableOpacity
                        style={styles.lightButton}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Text style={styles.titleTextbtn}>
                            Back
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.darkButton}
                        onPress={() => this.props.navigation.navigate('Cart', {
                            cart: this.state.cart,
                            currentUser: this.state.currentUser,
                        })}
                    >
                        <Text style={styles.titleTextbtn}>
                            Go to Cart
                        </Text>
                    </TouchableOpacity>
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
        marginTop: -35,
    },

    behaviorText: {
        fontSize: 15,
        fontFamily: 'ArimaMadurai-Bold',

    },

    behaviorTextView: {
        marginTop: height * 0.02,
        paddingBottom: height * 0.1,
        backgroundColor: "#B3E5FC",
    },

    rowButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    menu_view: {
        height: height * 0.6,
    },

    textbtn: {
        fontSize: 15,
        fontFamily: 'ArimaMadurai-Bold',
    },
    titleTextbtn: {
        fontSize: 15,
        fontFamily: 'ArimaMadurai-Bold',
    },

    foodButton: function (food) {
        if (food) {
            return {
                paddingHorizontal: width * 0.2,
                paddingVertical: height * 0.02,
            }
        } else {
            return {
                paddingHorizontal: width * 0.2,
                paddingVertical: height * 0.02,
                backgroundColor: "#B3E5FC",
            }
        }
    },

    drinksButton: function (food) {
        if (food) {
            return {
                paddingHorizontal: width * 0.2,
                paddingVertical: height * 0.02,
                backgroundColor: "#B3E5FC",
            }
        } else {
            return {
                paddingHorizontal: width * 0.2,
                paddingVertical: height * 0.02,
            }
        }
    },
    items: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemButton: {
        backgroundColor: "#82B3C9",
        marginVertical: height * 0.01,
        marginHorizontal: width * 0.01,
        borderRadius: 10,

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

    addToCartButton: {
        backgroundColor: "#B3E5FC",
        borderRadius: 20,
        width: height * 0.05,
        height: height * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textSide: {
        fontSize: 15,
        fontFamily: 'ArimaMadurai-Bold',
        width: width * 0.3,
        textAlign: 'center',
        textAlignVertical: "center",
    },
    textMiddel: {
        fontSize: 15,
        fontFamily: 'ArimaMadurai-Bold',
        width: width * 0.2,
        textAlign: 'center',
        textAlignVertical: "center",
    },

});


const Itemp = ({ name, price, priority, type }) => {
    const navigation = useNavigation();
    if (food) {
        if (type === "food") {
            if (priority) {
                if (currentUsertype === "employee") {
                    return (
                        <TouchableOpacity
                            style={styles.itemButton}
                            onPress={() => navigation.navigate('SelectedItem', {
                                selectedItemName: name,
                                cart: cart,
                            })}
                        >
                            <View style={styles.items}>
                                <Text style={styles.textSide}>{name}</Text>
                                <Text style={styles.textMiddel}>{price} Kr.</Text>
                                <Text style={styles.textSide}>add to cart</Text>
                                <TouchableOpacity
                                    style={styles.addToCartButton}
                                    onPress={() => cart.push(name)}
                                >
                                    <Text>+</Text>
                                </TouchableOpacity>

                            </View>
                        </TouchableOpacity>
                    );
                } else if (currentUsertype === "companyRepresentative") {
                    return (
                        <TouchableOpacity
                            style={styles.itemButton}
                            onPress={() => navigation.navigate('EditItem', {
                                selectedItemName: name,
                            })}
                        >
                            <View style={styles.items}>
                                <Text style={styles.textSide}>{name}</Text>
                                <Text style={styles.textSide}>{price} Kr.</Text>
                            </View>
                        </TouchableOpacity>
                    );
                } else {
                    return (<View></View>);
                }
            } else {
                return (<View></View>);
            }

        } else {
            return (<View></View>);
        }

    } else {
        if (type === "drinks") {
            if (priority) {
                if (currentUsertype === "employee") {
                    return (
                        <TouchableOpacity
                            style={styles.itemButton}
                            onPress={() => navigation.navigate('SelectedItem', {
                                selectedItemName: name,
                                cart: cart,
                            })}
                        >
                            <View style={styles.items}>
                                <Text style={styles.textSide}>{name}</Text>
                                <Text style={styles.textMiddel}>{price} Kr.</Text>
                                <Text style={styles.textSide}>add to cart</Text>
                                <TouchableOpacity
                                    style={styles.addToCartButton}
                                    onPress={() => cart.push(name)}
                                >
                                    <Text>+</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                } else if (currentUsertype === "companyRepresentative") {
                    return (
                        <TouchableOpacity
                            style={styles.itemButton}
                            onPress={() => navigation.navigate('EditItem', {
                                selectedItemName: name,
                            })}
                        >
                            <View style={styles.items}>
                                <Text style={styles.textSide}>{name}</Text>
                                <Text style={styles.textSide}>{price} Kr.</Text>
                            </View>
                        </TouchableOpacity>
                    );
                } else {
                    return (<View></View>);
                }

            } else {
                return (<View></View>);
            }

        } else {
            return (<View></View>);
        }
    }
};

const Item = ({ name, price, priority, type }) => {
    const navigation = useNavigation();
    if (food) {
        if (type === "food") {
            if (!priority) {
                if (currentUsertype === "employee") {
                    return (
                        <TouchableOpacity
                            style={styles.itemButton}
                            onPress={() => navigation.navigate('SelectedItem', {
                                selectedItemName: name,
                                cart: cart,
                            })}
                        >
                            <View style={styles.items}>
                                <Text style={styles.textSide}>{name}</Text>
                                <Text style={styles.textMiddel}>{price} Kr.</Text>
                                <Text style={styles.textSide}>add to cart</Text>
                                <TouchableOpacity
                                    style={styles.addToCartButton}
                                    onPress={() => cart.push(name)}
                                >
                                    <Text>+</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                } else if (currentUsertype === "companyRepresentative") {
                    return (
                        <TouchableOpacity
                            style={styles.itemButton}
                            onPress={() => navigation.navigate('EditItem', {
                                selectedItemName: name,
                            })}
                        >
                            <View style={styles.items}>
                                <Text style={styles.textSide}>{name}</Text>
                                <Text style={styles.textSide}>{price} Kr.</Text>
                            </View>
                        </TouchableOpacity>
                    );
                } else {
                    return (<View></View>);
                }
            } else {
                return (<View></View>);
            }

        } else {
            return (<View></View>);
        }

    } else {
        if (type === "drinks") {
            if (!priority) {
                if (currentUsertype === "employee") {
                    return (
                        <TouchableOpacity
                            style={styles.itemButton}
                            onPress={() => navigation.navigate('SelectedItem', {
                                selectedItemName: name,
                                cart: cart,
                            })}
                        >
                            <View style={styles.items}>
                                <Text style={styles.textSide}>{name}</Text>
                                <Text style={styles.textMiddel}>{price} Kr.</Text>
                                <Text style={styles.textSide}>add to cart</Text>
                                <TouchableOpacity
                                    style={styles.addToCartButton}
                                    onPress={() => cart.push(name)}
                                >
                                    <Text>+</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                } else if (currentUsertype === "companyRepresentative") {
                    return (
                        <TouchableOpacity
                            style={styles.itemButton}
                            onPress={() => navigation.navigate('EditItem', {
                                selectedItemName: name,
                            })}
                        >
                            <View style={styles.items}>
                                <Text style={styles.textSide}>{name}</Text>
                                <Text style={styles.textSide}>{price} Kr.</Text>
                            </View>
                        </TouchableOpacity>
                    );
                } else {
                    return (<View></View>);
                }
            } else {
                return (<View></View>);
            }

        } else {
            return (<View></View>);
        }
    }
};