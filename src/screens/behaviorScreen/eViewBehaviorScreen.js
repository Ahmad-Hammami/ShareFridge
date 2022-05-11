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
  Image,
  Alert,
} from "react-native";

const { height, width } = Dimensions.get("window");

let currentReceipts = [];
let receipts = [];

var caffeine;
var fat;
var salt;
var suger;

export default class EViewBehaviorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentUser: props.route.params.currentUser,
          currentUsertype: props.route.params.currentUsertype,
          user: null,
          behavior: null,
          receipts: null,
          currentReceipts: null,
        };
      }

      componentDidMount = async () => {
        await this.getUser();
        receipts = [];
        
        await this.getreceipts();
        await this.compressArray(receipts)
        console.log(currentReceipts);
      }

      getUser = async () => {
        await fetch("https://sharefridgebackend.herokuapp.com/get-selected-user", {
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

      getreceipts = async () => {
        await fetch("https://sharefridgebackend.herokuapp.com/get-personal-receipts", {
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
            result.map((item) => {
                let cart1 = []
                cart1 = receipts.concat(item.cartItems)
                receipts = cart1
            })
          })
          .catch((error) => {
            console.log("hej");
            console.error(error);
          });
      };


      compressArray = async (original) => {
        var compressed = [];
        // make a copy of the input array
        var copy = original.slice(0);
    
        // first loop goes over every element
        for (var i = 0; i < original.length; i++) {
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
            compressed.push(a);
          }
        }
        currentReceipts = compressed;
        this.setState({ currentReceipts: compressed });
      };





    render() {
        return (
            <View>

            </View>
        );
    }


}