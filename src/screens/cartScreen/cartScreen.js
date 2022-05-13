import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Modal,
  Image,
  Alert,
} from "react-native";

const { height, width } = Dimensions.get("window");

let currentCart = [];
let cart = [];


var caffeine;
var fat;
var salt;
var suger;

export default class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: props.route.params.cart,
      currentUser: props.route.params.currentUser,
      items: null,
      user: null,
      behavior: null,
      submit: false,
      total: 0,
    };
    this.arrayholder = this.state.items;
  }

  componentDidMount() {
    this.setState({ submit: false });
    this.setState({ total: 0 });
    this.getUser();
    cart = [];
    cart = this.state.cart;
    this.getItems();
    console.log(cart);
  }

  getUser = () => {
    fetch("https://sharefridgebackend.herokuapp.com/get-selected-user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.currentUser,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({ user: result });
      })
      .catch((error) => {
        console.log("hej");
        console.error(error);
      });
  };

  getItems = async () => {
    await fetch("https://sharefridgebackend.herokuapp.com/items")
      .then((res) => res.json())
      .then((result) => {
        this.setState({ items: result });
      })
      .catch((error) => {
        console.log("hey");
        console.error(error);
      });
    await this.compressArray(this.state.cart);
  };

  findItem = (selectedItem) => {
    const updatedData = this.state.items.filter((item) => {
      const item_data = `${item.name})`;
      const text_data = selectedItem;
      return item_data.indexOf(text_data) > -1;
    });
    return updatedData;
  };

  compressArray = (original) => {
    var compressed = [];
    let total = 0;
    // make a copy of the input array
    var copy = original.slice(0);

    // first loop goes over every element
    for (var i = 0; i < original.length; i++) {
      var item = this.findItem(original[i]);
      var myCount = 0;
      // loop over every element in the copy and see if it's the same
      for (var w = 0; w < copy.length; w++) {
        if (original[i] == copy[w]) {
          // increase amount of times duplicate is found
          myCount++;
          // sets item to undefined
          delete copy[w];
        }
      }

      if (myCount > 0) {
        var a = new Object();
        a.id = i;
        a.name = original[i];
        a.count = myCount;
        item.map((item) => {
          a.price = item.price;
          a.caffeine = item.caffeine;
          a.salt = item.salt;
          a.fat = item.fat;
          a.suger = item.suger;

          compressed.push(a);
          total = total + myCount * item.price;
          this.setState({total: total})

        });
      }
    }
    currentCart = compressed;
    this.setState({ currentCart: compressed });
  };

  submit = async () => {
    this.setState({submit: true})
    console.log(cart);
    let email = this.state.user.email;
    let balance = this.state.user.balance + this.state.total;
    await this.Behavior(email);
    await this.postReceipts(email);
    await this.updateBalance(email, balance);
    this.state.cart.length = 0;
    cart.length = 0;
  };

  Behavior = async (email) => {
    await fetch("https://sharefridgebackend.herokuapp.com/get-behavior", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        caffeine = data.caffeine;
        fat = data.fat;
        salt = data.salt;
        suger = data.suger;
      });
    await this.compressArray(cart);

    console.log(caffeine + " " + fat + " " + salt + " " + suger);

    await this.forLoop();

    console.log(caffeine + " " + fat + " " + salt + " " + suger);

    await fetch("https://sharefridgebackend.herokuapp.com/update-behavior", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        suger: suger,
        salt: salt,
        caffeine: caffeine,
        fat: fat,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  forLoop = async () => {
    console.log("Start");

    await currentCart.map((item) => {
      if (item.caffeine) {
        caffeine = caffeine + item.count;
      }
      if (item.fat) {
        fat = fat + item.count;
      }
      if (item.salt) {
        salt = salt + item.count;
      }
      if (item.suger) {
        suger = suger + item.count;
      }
    });

    console.log("End");
  };

  postReceipts = async (email) => {
    await fetch("https://sharefridgebackend.herokuapp.com/add-receipts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        date: new Date(),
        cartItems: cart,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  updateBalance = async (email, balance) => {
    await fetch(
      "https://sharefridgebackend.herokuapp.com/update-user-balance",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          balance: balance,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  rendercart = ({ item }) => {
      return (
        <View style={styles.rowButtons}>
          <View style={styles.cartViewItems}>
            <Text style={styles.textItems}>{item.count}x</Text>
            <Text style={styles.textItems}>{item.name}</Text>
            <Text style={styles.textItems}>{item.price}.-</Text>
          </View>
    
          <TouchableOpacity
            style={styles.minusButton}
            onPress={() => this.removeFromCart(item.name)}
          >
            <Text style={styles.textItems}>-</Text>
          </TouchableOpacity>
        </View>
      );
  }

  removeFromCart = (name) => {
    
    var index = cart.indexOf(name);
    if (index > -1) {
      //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
      cart.splice(index, 1);
    }
    console.log(cart);
    this.setState({cart: cart})
    this.compressArray(cart);
  };

  render() {
    const { submit, total } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cart</Text>

        <View style={styles.containerCenter}>
          <Image
            style={styles.photo}
            source={{
              uri: "https://res.cloudinary.com/sharefridge/image/upload/v1651849155/shopping-cart-png-icon-free-download-301447_cygj4b.png",
            }}
          />
        </View>
        <View style={styles.cartView}>
          <FlatList
            data={currentCart}
            renderItem={this.rendercart}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View>
          <Text style={styles.title}>Total:   {total}</Text>
        </View>
        <View style={styles.rowButtons}>
          <TouchableOpacity
            style={styles.lightButton}
            onPress={() =>
              this.props.navigation.goBack({
                cart: this.state.cart,
              })
            }
          >
            <Text style={styles.titleTextbtn}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.darkButton}
            onPress={() => this.submit()}
          >
            <Text style={styles.titleTextbtn}>Submit / Pay</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={submit}
          onRequestClose={() => {
            this.setState({ submit: false });
          }}
        >
          <View style={styles.modalCenterView}>
            <View style={styles.modelView}>
              <Text style={styles.text}>Purchased items</Text>
              {currentCart.length > 0 &&
                currentCart.map((item) => {
                  return (
                    <Fragment key={item.id}>
                      <View style={styles.rowView}>
                        <Text style={styles.textModel}>
                          {item.count.toString()} x
                        </Text>
                        <Text style={styles.textModel}>{item.name}</Text>
                      </View>
                    </Fragment>
                  );
                })}
              <TouchableOpacity
                style={styles.modalDarkButton}
                onPress={() =>
                  this.props.navigation.navigate("Menu", {
                    cart: this.state.cart,
                  })
                }
              >
                <Text>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: height * 0.1,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
  },

  containerCenter: {
    alignItems: "center",
  },

  photo: {
    width: width * 0.3,
    height: width * 0.3,
    resizeMode: "center",
  },

  title: {
    fontSize: 30,
    fontFamily: "ArimaMadurai-Bold",
  },

  text: {
    fontSize: 20,
    fontFamily: "ArimaMadurai-Bold",
  },
  textModel: {
    fontSize: 15,
    fontFamily: "ArimaMadurai-Bold",
  },

  textItems: {
    fontSize: 15,
    fontFamily: "ArimaMadurai-Bold",
    paddingHorizontal: width * 0.02,
    textAlign: "center",
    textAlignVertical: "center",
  },

  cartView: {
    height: height * 0.5,
    width: width * 0.9,
    backgroundColor: "#B3E5FC",
  },

  rowButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: height * 0.01,
  },

  cartViewItems: {
    flexDirection: "row",
    backgroundColor: "#82B3C9",
    borderRadius: 20,
  },

  minusButton: {
    backgroundColor: "#82B3C9",
    borderRadius: 20,
    width: height * 0.05,
    height: height * 0.05,
    alignItems: "center",
    justifyContent: "center",
  },

  lightButton: {
    backgroundColor: "#B3E5FC",
    borderRadius: 20,
    width: width * 0.3,
    height: height * 0.05,
    alignItems: "center",
    justifyContent: "center",
  },

  darkButton: {
    backgroundColor: "#82B3C9",
    borderRadius: 20,
    width: width * 0.3,
    height: height * 0.05,
    alignItems: "center",
    justifyContent: "center",
  },
  modalCenterView: {
    flex: 1,
    backgroundColor: "#00000099",
  },
  modelView: {
    position: "absolute",
    top: height * 0.3,
    left: width * 0.2,
    height: height * 0.4,
    width: width * 0.6,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.1,
    width: width * 0.6,
    backgroundColor: "#B3E5FC",
    borderRadius: 25,
  },

  modalDarkButton: {
    position: "absolute",
    backgroundColor: "#82B3C9",
    borderRadius: 20,
    width: width * 0.4,
    height: height * 0.05,
    bottom: height * 0.01,
    left: width * 0.1,

    alignItems: "center",
    justifyContent: "center",
  },

  rowView: {
    marginTop: height * 0.02,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
