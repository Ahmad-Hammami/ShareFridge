import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";

const { height, width } = Dimensions.get("window");

const renderReceipts = ({ item }) => (
  <Receipts date={item.date} receipts={item.cartItems} />
);

let receipts = [];

export default class ReceiptScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.route.params.currentUser,
      currentUsertype: props.route.params.currentUsertype,
      receipts: [],
    };
  }

  componentDidMount = async () => {
    await this.getReceipts();
  };

  getReceipts = async () => {
    await fetch(
      "https://sharefridgebackend.herokuapp.com/get-personal-receipts",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.currentUser,
        }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        receipts = result;
        this.setState({ receipts: result });
      })
      .catch((error) => {
        console.log("ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.error(error);
      });
  };

  render() {
    const email = this.state.currentUser;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Receipts for user:</Text>
        <Text style={styles.title}>{email}</Text>
        <FlatList
          data={receipts}
          renderItem={renderReceipts}
          keyExtractor={(item) => item._id}
        />
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.lightButton}
            onPress={() =>
              this.props.navigation.navigate("ESelectedProfile", {
                currentUser: this.state.currentUser,
                currentUsertype: this.state.currentUsertype,
              })
            }
          >
            <Text>Back</Text>
          </TouchableOpacity>

          <Text></Text>
        </View>
      </View>
    );
  }
}

const Receipts = ({ date, receipts }) => {
  let currentReceipts = compressArray(receipts);

  return (
    <View style={styles.receiptsView}>
      <View>
        <Text style={styles.text}>Date: {date}</Text>
      </View>
      <View style={styles.receiptsView}>
        {currentReceipts.length > 0 &&
          currentReceipts.map((item) => {
            return (
              <Fragment key={item.id}>
                <View style={styles.rowView}>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.text}>{item.count.toString()}</Text>
                </View>
              </Fragment>
            );
          })}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: height * 0.1,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    height: height * 0.85
  },

  receiptsView: {
    marginTop: height * 0.01,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    backgroundColor: "#82B3C9",
    borderRadius: 12
  },

  rowView: {
    marginTop: height * 0.02,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  row: {
    marginTop: height * 0.02,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  lightButton: {
    backgroundColor: "#B3E5FC",
    borderRadius: 25,
    width: width * 0.3,
    height: height * 0.04,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 20,
  },

  text: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 15,
    marginLeft: 12
  },
});

const compressArray = (original) => {
  var compressed = [];
  var copy = original.slice(0);
  for (var i = 0; i < original.length; i++) {
    var myCount = 0;
    for (var w = 0; w < copy.length; w++) {
      if (original[i] == copy[w]) {
        myCount++;
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
  return compressed;
};
