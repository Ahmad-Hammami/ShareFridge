import React, { Component, Fragment } from "react";
import {
  Button,
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import Users from "../../db/users.json";

const { height, width } = Dimensions.get("window");

export default class ESelectedProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: Users,
      currentUser: props.route.params.currentUser,
      currentUsertype: props.route.params.currentUsertype,
      password1: "",
      password2: "",
      password3: "",
    };
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

  componentDidMount = async () => {
    await this.getUser();
    console.log(this.state.user);
  };

  isPasswordCorrect = async () => {
    if (this.state.user.password === this.state.password1) {
      if (this.state.password2 === this.state.password3) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  submitData = async () => {
    var correctPassword = await this.isPasswordCorrect();
    if (correctPassword) {
      await fetch(
        "https://sharefridgebackend.herokuapp.com/update-user-password",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.state.user.email,
            password: this.state.password2,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          Alert.alert(`${data.name} is updated successfuly`);
          this.props.navigation.navigate("Menu");
        });
    } else {
        console.log("wrong password")
    }
  };

  render() {
    const { user } = this.state;
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <View style={styles.container}>
              <Text style={styles.title}>{user.name}</Text>
              <View style={styles.photo_view}>
                <Image
                  style={styles.Profile_Photo}
                  source={require("../../.././assets/Emma_Profile.jpg")}
                />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.title}>ID:</Text>
                <Text style={styles.title}>{user.id}</Text>
              </View>
              <View style={styles.rowText}>
                <Text style={styles.title}>Balance:</Text>
                <Text style={styles.title}>{user.balance}</Text>
              </View>
              <View style={styles.rowText}>
                <Text style={styles.title}>E-mail:</Text>
                <Text style={styles.title}>{user.email}</Text>
              </View>
              <View style={styles.containerCenter}>
                <TouchableOpacity
                  style={styles.behaviorButton}
                  onPress={() =>
                    this.props.navigation.navigate("EViewBehavior", {
                      currentUser: this.state.currentUser,
                      currentUsertype: this.state.currentUsertype
                    })
                  }
                >
                  <Text>Behavior</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <Text style={styles.title}>Change Password:</Text>
                <Text style={styles.title}>Your Password:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  onChangeText={(password1) => this.setState({ password1 })}
                  value={this.state.password1}
                />
                <Text style={styles.title}>New Password:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  onChangeText={(password2) => this.setState({ password2 })}
                  value={this.state.password2}
                />
                <Text style={styles.title}>Confirm new Password:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  onChangeText={(password3) => this.setState({ password3 })}
                  value={this.state.password3}
                />
                <View style={styles.rowText}>
                  <TouchableOpacity
                    style={styles.lightButton}
                    onPress={() =>
                      this.props.navigation.navigate("Menu", {
                        currentUser: this.state.currentUser,
                        cart: [],
                        currentUsertype: this.state.currentUsertype
                      })
                    }
                  >
                    <Text>Back</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.darkButton}
                    onPress={this.submitData}
                  >
                    <Text>Save</Text>
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

  containerCenter: {
    marginTop: 15,
    padding: 2,
    alignItems: "center",
  },

  title: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 20,
  },

  text: {
    fontFamily: "ArimaMadurai-Bold",
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
    flexDirection: "row",
    justifyContent: "space-between",
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontFamily: "ArimaMadurai-Regular",
    borderRadius: 10,
    backgroundColor: "#82B3C9",
  },

  behaviorButton: {
    backgroundColor: "#B3E5FC",
    borderRadius: 10,
    padding: 5,
    width: width * 0.5,
    alignItems: "center",
    justifyContent: "center",
  },

  lightButton: {
    backgroundColor: "#B3E5FC",
    borderRadius: 10,
    width: width * 0.2,
    height: height * 0.03,
    alignItems: "center",
    justifyContent: "center",
  },

  darkButton: {
    backgroundColor: "#82B3C9",
    borderRadius: 10,
    width: width * 0.2,
    height: height * 0.03,
    alignItems: "center",
    justifyContent: "center",
  },
});
