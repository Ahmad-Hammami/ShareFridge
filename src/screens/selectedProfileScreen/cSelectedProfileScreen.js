import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { RadioButton } from "react-native-paper";
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
            <Text style={styles.title}>{user.balance}</Text>
          </View>
          <View style={styles.rowText}>
            <Text style={styles.title}>E-mail:</Text>
            <Text style={styles.title}>{user.email}</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.rowText}>
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

  lightButton: {
    backgroundColor: "#B3E5FC",
    borderRadius: 10,
    width: width * 0.2,
    height: height * 0.03,
    alignItems: "center",
    justifyContent: "center",
  },

  redButton: {
    backgroundColor: "#EB6A6A",
    borderRadius: 10,
    width: width * 0.2,
    height: height * 0.03,
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
