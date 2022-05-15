import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Users from "../../db/users.json";

const { height, width } = Dimensions.get("window");

export default class CSelectedProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      user: Users,
      selectedUser: props.route.params.selectedUserEmail,
      submit: false,
      submitMSG: "",
    };
  }

  componentDidMount = async () => {
    await this.getUser();
    console.log(this.state.user);
  };

  getUser = async () => {
    await fetch("https://sharefridgebackend.herokuapp.com/get-selected-user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.selectedUser,
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

  submitData = async () => {
    await fetch("https://sharefridgebackend.herokuapp.com/delete-behavior", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.user.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    await fetch("https://sharefridgebackend.herokuapp.com/delete-user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.user.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          submit: true,
          submitMSG: `${data.name} is deleted successfuly`,
        });
      });
  };

  render() {
    const { user } = this.state;
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <View style={styles.container}>
              <Text style={styles.titleName}>{user.name}</Text>
              <View style={styles.photo_view}>
                <Image
                  style={styles.Profile_Photo}
                  source={{ uri: user.picture }}
                />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.title}>ID:</Text>
                <Text style={styles.titleID}>{user._id}</Text>
              </View>
              <View style={styles.rowText}>
                <Text style={styles.title}>Balance:</Text>
                <Text style={styles.title}>{user.balance} DKK</Text>
              </View>
              <View style={styles.rowText}>
                <Text style={styles.title}>E-mail:</Text>
                <Text style={styles.titleID}>{user.email}</Text>
              </View>

              <View style={styles.rowBtn}>
                <TouchableOpacity
                  style={styles.lightButton}
                  onPress={() =>
                    this.props.navigation.navigate("SeeEmployees", {
                      update: false,
                    })
                  }
                >
                  <Text>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.redButton}
                  onPress={this.submitData}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
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
                <View style={styles.modelViewAlert}>
                  <Text style={styles.text}>{this.state.submitMSG}</Text>
                  <TouchableOpacity
                    style={styles.modalDarkButton}
                    onPress={() =>
                      this.props.navigation.navigate("SeeEmployees", {
                        update: true,
                      })
                    }
                  >
                    <Text>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
    alignItems: "center",
  },

  titleName: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 25,
  },

  title: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 20,
  },
  titleID: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 20,
    width: width * 0.4,
  },
  text: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 15,
  },

  photo_view: {
    alignItems: "center",
    marginBottom: 35,
    marginTop: 35,
  },

  Profile_Photo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: "center",
    borderRadius: 200,
  },

  rowText: {
    paddingTop: height * 0.02,
    paddingLeft: width * 0.1,
    paddingRight: width * 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowBtn: {
    marginTop: height * 0.15,
    marginBottom: height * 0.05,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  lightButton: {
    backgroundColor: "#B3E5FC",
    borderRadius: 25,
    width: width * 0.3,
    height: height * 0.04,
    alignItems: "center",
    justifyContent: "center",
  },

  redButton: {
    backgroundColor: "#EB6A6A",
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
  modelViewAlert: {
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
