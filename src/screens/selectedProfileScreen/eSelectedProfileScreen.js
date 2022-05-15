import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Modal,
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
      submit: false,
      submitMSG: "",
      errorPass: false,
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
  };

  isPasswordCorrect = async () => {
    if (this.state.user.password === this.state.password1) {
      if (this.state.password2 === this.state.password3) {
        return true;
      } else {
        this.setState({
          errorPass: true,
          submitMSG: "The new passwords are not identical",
        });
        return false;
      }
    } else {
      this.setState({
        errorPass: true,
        submitMSG: "Current password is incorrect",
      });
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
          this.setState({
            submit: true,
            submitMSG: `${data.name} is updated successfuly`,
          });
        });
    } else {
      console.log("wrong password");
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
                  source={{ uri: user.picture }}
                />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.title}>ID:</Text>
                <Text style={styles.title}>{user._id}</Text>
              </View>
              <View style={styles.rowText}>
                <Text style={styles.title}>Balance:</Text>
                <Text style={styles.title}>{user.balance} DKK</Text>
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
                      currentUsertype: this.state.currentUsertype,
                    })
                  }
                >
                  <Text>Behavior</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.behaviorButton}
                  onPress={() =>
                    this.props.navigation.navigate("Receipts", {
                      currentUser: this.state.currentUser,
                      currentUsertype: this.state.currentUsertype,
                    })
                  }
                >
                  <Text>Receipts</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <Text style={styles.titleC}>Change Password:</Text>
                <Text style={styles.titleP}>Your Password:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  onChangeText={(password1) => this.setState({ password1 })}
                  value={this.state.password1}
                />
                <Text style={styles.titleP}>New Password:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  onChangeText={(password2) => this.setState({ password2 })}
                  value={this.state.password2}
                />
                <Text style={styles.titleP}>Confirm new Password:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  onChangeText={(password3) => this.setState({ password3 })}
                  value={this.state.password3}
                />
                <View style={styles.rowBtn}>
                  <TouchableOpacity
                    style={styles.lightButton}
                    onPress={() =>
                      this.props.navigation.navigate("Menu", {
                        currentUser: this.state.currentUser,
                        cart: [],
                        currentUsertype: this.state.currentUsertype,
                        update: false,
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
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={this.state.submit}
                  onRequestClose={() => {
                    this.setState({ submit: false });
                  }}
                >
                  <View style={styles.modalCenterView}>
                    <View style={styles.modelView}>
                      <Text style={styles.text}>{this.state.submitMSG}</Text>
                      <TouchableOpacity
                        style={styles.modalDarkButton}
                        onPress={() =>
                          this.props.navigation.navigate("Menu", {
                            update: false,
                          })
                        }
                      >
                        <Text>OK</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={this.state.errorPass}
                  onRequestClose={() => {
                    this.setState({ errorPass: false });
                  }}
                >
                  <View style={styles.modalCenterView}>
                    <View style={styles.modelView}>
                      <Text style={styles.text}>{this.state.submitMSG}</Text>
                      <TouchableOpacity
                        style={styles.modalDarkButton}
                        onPress={() => {
                          this.setState({ errorPass: false });
                        }}
                      >
                        <Text>OK</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
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

  titleP: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 15,
  },
  titleC: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 20,
    marginBottom: 5,
  },


  text: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 15,
  },

  photo_view: {
    alignItems: "center",
  },

  Profile_Photo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: "center",
    borderRadius: 200
  },

  rowText: {
    paddingTop: height * 0.02,
    paddingLeft: width * 0.1,
    paddingRight: width * 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  rowBtn: {
    height: height * 0.07,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
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
    width: width * 0.6,
    height: height * 0.05,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
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

  modalCenterView: {
    flex: 1,
    backgroundColor: "#00000099",
  },
  modelView: {
    position: "absolute",
    top: height * 0.35,
    left: width * 0.25,
    height: height * 0.3,
    width: width * 0.5,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.1,
    backgroundColor: "#B3E5FC",
    borderRadius: 25,
  },

  modalDarkButton: {
    position: "absolute",
    backgroundColor: "#82B3C9",
    borderRadius: 20,
    width: width * 0.3,
    height: height * 0.05,
    bottom: height * 0.01,
    left: width * 0.1,

    alignItems: "center",
    justifyContent: "center",
  },
});
