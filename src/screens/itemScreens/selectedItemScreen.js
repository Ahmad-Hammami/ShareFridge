import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Item from "../../db/items.json";

const { height, width } = Dimensions.get("window");

let count = 0;

export default class SelectedItemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: Item,
      selectedItem: props.route.params.selectedItemName,
      cart: props.route.params.cart,
    };
    this.arrayholder = Item;
  }

  getItem = async () => {
    await fetch("https://sharefridgebackend.herokuapp.com/get-selected-item", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.selectedItem,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({ item: result });
      })
      .catch((error) => {
        console.log("hej");
        console.error(error);
      });
  };

  countItemsInCart = (original) => {
    for (var i = 0; i < original.length; i++) {
      if (original[i] === this.state.selectedItem) {
        count++;
      }
    }
  };
  addToCart = (name) => {
    this.state.cart.push(name);
    count = count + 1;
    this.setState({ cart: this.state.cart });
  };
  removeFromCart = (name) => {
    if (count > 0) {
      var index = this.state.cart.indexOf(name);
      if (index > -1) {
        //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
        this.state.cart.splice(index, 1);
        count = count - 1;
      }
    }
    this.setState({ cart: this.state.cart });
  };

  componentDidMount = async () => {
    count = 0;
    this.countItemsInCart(this.state.cart);
    await this.getItem();
    console.log(this.state.item);
  };
  render() {
    const { item } = this.state;
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <View style={styles.container}>
              <Text style={styles.title}>{item.name}</Text>
              <View style={styles.photo_view}>
                <Image style={styles.photo} source={{ uri: item.picture }} />
              </View>
              <View style={styles.textContainer}>
                <View style={styles.rowTextView}>
                  <Text style={styles.text}>Price:</Text>
                  <Text style={styles.text}>{item.price} Kr.-</Text>
                </View>
                <View style={styles.rowTextView}>
                  <Text style={styles.text}>Added to cart</Text>
                  <Text style={styles.countText}>{count}</Text>
                </View>
                <View style={styles.rowButtonView}>
                  <TouchableOpacity
                    style={styles.plusMinusButton}
                    onPress={() => this.removeFromCart(item.name)}
                  >
                    <Text> - </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.plusMinusButton}
                    onPress={() => this.addToCart(item.name)}
                  >
                    <Text> + </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.textD}>Description:</Text>
                <View style={styles.descriptionView}>
                  <Text style={styles.textDd}>{item.description}</Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <View style={styles.rowTextView}>
                  <TouchableOpacity
                    style={styles.lightButton}
                    onPress={() =>
                      this.props.navigation.navigate("Menu", {
                        cart: this.state.cart,
                        update: false,
                      })
                    }
                  >
                    <Text>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.darkButton}
                    onPress={() =>
                      this.props.navigation.navigate("Menu", {
                        cart: this.state.cart,
                        update: false,
                      })
                    }
                  >
                    <Text>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
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

  textContainer: {
    marginTop: height * 0.02,
    marginLeft: width * 0.1,
    marginRight: width * 0.1,
  },
  buttonContainer: {
    marginTop: height * 0.005,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
  },

  title: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 30,
  },
  text: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 20,
    marginLeft: 10,
  },
  textDd: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
  },
  textD: {
    marginTop: 10,
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 23,
  },

  countText: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 20,
    borderRadius: 20,
    paddingHorizontal: width * 0.023,
    paddingVertical: width * 0.02,
    backgroundColor: "#82B3C9",
    marginRight: 25,
  },

  photo_view: {
    alignItems: "center",
  },

  photo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: "center",
    borderRadius: 200,
  },

  rowTextView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.04,
  },

  rowButtonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: height * 0.02,
    marginLeft: width * 0.5,
  },

  descriptionView: {
    width: width * 0.7,
    height: height * 0.15,
    backgroundColor: "#B3E5FC",
    borderRadius: 25,
  },
  lightButton: {
    backgroundColor: "#B3E5FC",
    borderRadius: 25,
    width: width * 0.3,
    height: height * 0.04,
    alignItems: "center",
    justifyContent: "center",
  },

  darkButton: {
    backgroundColor: "#82B3C9",
    borderRadius: 25,
    width: width * 0.3,
    height: height * 0.04,
    alignItems: "center",
    justifyContent: "center",
  },

  plusMinusButton: {
    backgroundColor: "#82B3C9",
    borderRadius: 25,
    width: height * 0.05,
    height: height * 0.05,
    alignItems: "center",
    justifyContent: "center",
  },
});
