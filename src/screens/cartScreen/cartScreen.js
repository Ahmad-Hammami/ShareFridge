import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import Items from "../../db/items.json";
import SwipeButton from 'rn-swipe-button';


const { height, width } = Dimensions.get("window");

let currentCart = [];
let cart = [];
let total = 0;

var caffeine;
var fat;
var salt;
var suger;

const rendercart = ({ item }) => (
  <Cart name={item.name} count={item.count} price={item.price} />
);
export default class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: props.route.params.cart,
      currentUser: props.route.params.currentUser,
      items: null,
      user: null,
      behavior: null,
    };
    this.arrayholder = this.state.items;
  }

  componentDidMount() {
    this.getUser();
    total = 0;
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
          total = total + myCount * item.price ;
        });
      }
    }
    currentCart = compressed;
    this.setState({ currentCart: compressed });
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
  submit = async () => {
    console.log(cart);
    var email;
    var balance;
    email = this.state.user.email;
    balance = this.state.user.balance + total;
    await this.Behavior(email);
    await this.postReceipts(email);
    await this.updateBalance(email, balance);

    this.state.cart.length = 0;
    cart.length = 0;
    Alert.alert(`is saved successfuly`);
    this.props.navigation.navigate("Menu", {
      cart: this.state.cart,
    });
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
    await fetch("https://sharefridgebackend.herokuapp.com/update-user-balance", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        balance: balance,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  render() {
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
            renderItem={rendercart}
            keyExtractor={(item) => item.id}
            extraData={currentCart}
          />
        </View>
        <View>
          <Text style={styles.totalText}>Total {total}</Text>
        </View>
        <SafeAreaView>
          <View style={styles.rowButtons}>
        <SwipeButton
            disabled ={false}
            swipeSuccessThreshold={70}
            height={45}
            width={width * 0.88}
            title="Approve"
            onSwipeSuccess={()=> this.submit()}
            railFillBackgroundColor="#82B3C9"
            railFillBorderColor="#82B3C9" 
            thumbIconBackgroundColor=""
            > 
          </SwipeButton>
          </View>
        </SafeAreaView>
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

        {/*   <TouchableOpacity
            style={styles.darkButton}
            onPress={() => this.submit()}
          >
            <Text style={styles.titleTextbtn}>Approve</Text>
          </TouchableOpacity>
        */}
        </View>
      
      </View>
    );
  }
}

const Cart = ({ name, count, price }) => {
  return (
    <View style={styles.rowButtons}>
      <View style={styles.cartViewItems}>
        <Text style={styles.textItems}>{count}x</Text>
        <Text style={styles.textItems}>{name}</Text>
        <Text style={styles.textItems}>{price}.-</Text>
      </View>

      <TouchableOpacity
        style={styles.minusButton}
        onPress={() => removeFromCart(name)}
      >
        <Text style={styles.textItemsM}>-</Text>
      </TouchableOpacity>
    </View>
  );
};

const removeFromCart = (name) => {
  var index = cart.indexOf(name);
  
  if (index > -1) {
    //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
    cart.splice(index, 1);
    
  }
  console.log(cart);
  
  //CartScreen.compressArray(cart);
  
};



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
    marginTop: 20

  },

  title: {
    fontSize: 30,
    fontFamily: "ArimaMadurai-Bold",
  },
  swipeBtn:{
    alignItems: "center",
  },
  totalText: {
    fontSize: 30,
    marginTop: 15,
    fontFamily: "ArimaMadurai-Bold",
  },
  text: {
    fontSize: 55,
    fontFamily: "ArimaMadurai-Bold",
  },

  textItems: {
    fontSize: 15,
    fontFamily: "ArimaMadurai-Bold",
    paddingHorizontal: width * 0.02,
    textAlign: "center",
    textAlignVertical: "center",
  },
  textItemsM: {
    fontSize: 24,
  },


  cartView: {
    marginTop: 10,
    borderRadius: 25,
    height: height * 0.44,
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
    borderRadius: 25,
    height: height*0.05,
    marginLeft: 15,
  },

  minusButton: {
    backgroundColor: "#82B3C9",
    borderRadius: 20,
    width: height * 0.05,
    height: height * 0.05,
    alignItems: "center",
    justifyContent: "center",
    marginRight:15,
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
});
