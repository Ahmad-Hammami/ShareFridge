import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const { height, width } = Dimensions.get("window");

export default class AddAnEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 10,
      fullName: "",
      email: "",
      password1: "",
      password2: "",
      balance: "",
      type: "employee",
      popUpPhoto: false,
      selectedImage:
        "https://res.cloudinary.com/sharefridge/image/upload/v1651785014/Emma_Profile_ij8c9r.jpg",
      submit: false,
      submitMSG: "",
      errorPass: false,
    };
  }

  isPasswordCorrect = async () => {
    if (this.state.password2 === this.state.password1) {
      return true;
    } else {
      this.setState({
        errorPass: true,
        submitMSG: "Passwords are not identical",
      });
      return false;
    }
  };
  submitData = async () => {
    var correctPassword = await this.isPasswordCorrect();
    if (correctPassword) {
      await fetch("https://sharefridgebackend.herokuapp.com/add-behavior", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {});

      await fetch("https://sharefridgebackend.herokuapp.com/send-user", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.fullName,
          email: this.state.email,
          password: this.state.password1,
          picture: this.state.selectedImage,
          balance: this.state.balance,
          type: this.state.type,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.setState({
            submit: true,
            submitMSG: `${data.name} is saved successfuly`,
          });
        });
    } else {
      console.log("wrong password");
    }
  };

  openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (imageResult.cancelled === true) {
      return;
    }

    let newfile = {
      uri: imageResult.uri,
      type: `test/${imageResult.uri.split(".")[1]}`,
      name: `test.${imageResult.uri.split(".")[1]}`,
    };
    this.handleUpload(newfile);
  };

  openCameraAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }

    let cameraResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (cameraResult.cancelled === true) {
      return;
    }
    let newfile = {
      uri: cameraResult.uri,
      type: `test/${cameraResult.uri.split(".")[1]}`,
      name: `test.${cameraResult.uri.split(".")[1]}`,
    };
    this.handleUpload(newfile);
  };

  handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ShareFridge");
    data.append("cloud_name", "sharefridge");

    fetch("https://api.cloudinary.com/v1_1/sharefridge/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ selectedImage: data.url });
        this.setState({ popUpPhoto: false });
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <View style={styles.photo_view}>
              <Text style={styles.title}>Create a new Profile:</Text>
              <Image
                style={styles.Profile_Photo}
                source={{ uri: this.state.selectedImage }}
              />
            </View>
            <Text style={styles.text}>Insert photo of profile:</Text>
            <Button
              dark={false}
              mode="contained"
              style={styles.darkImageButton}
              icon={
                this.state.selectedImage ===
                "https://res.cloudinary.com/sharefridge/image/upload/v1651785014/Emma_Profile_ij8c9r.jpg"
                  ? "upload"
                  : "check"
              }
              onPress={() => this.setState({ popUpPhoto: true })}
            >
              Upload Image
            </Button>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.popUpPhoto}
              onRequestClose={() => {
                this.setState({ popUpPhoto: false });
              }}
            >
              <View style={styles.modelView}>
                <View style={styles.modelButtonView}>
                  <Button
                    dark={false}
                    mode="contained"
                    style={styles.darkImageButton}
                    icon="camera"
                    onPress={this.openCameraAsync}
                  >
                    Camera
                  </Button>
                  <Button
                    dark={false}
                    mode="contained"
                    style={styles.darkImageButton}
                    icon="image-area"
                    onPress={this.openImagePickerAsync}
                  >
                    Gallery
                  </Button>
                </View>
                <Button
                  dark={false}
                  mode="contained"
                  style={styles.darkImageButton}
                  onPress={() => this.setState({ popUpPhoto: false })}
                >
                  Cancel
                </Button>
              </View>
            </Modal>
            <View>
         
              <Text style={styles.text}>Full Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="Type full name here"
                onChangeText={(fullName) => this.setState({ fullName })}
                value={this.state.fullName}
              />
              <Text style={styles.text}>E-mail:</Text>
              <TextInput
                style={styles.input}
                placeholder="Type E-mail here"
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
              />
              <Text style={styles.text}>Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                onChangeText={(password1) => this.setState({ password1 })}
                value={this.state.password1}
              />
              <Text style={styles.text}>Confirm your Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password again"
                onChangeText={(password2) => this.setState({ password2 })}
                value={this.state.password2}
              />
              <View style={styles.lowBtn}>
                <TouchableOpacity
                  style={styles.lightButton}
                  onPress={() =>
                    this.props.navigation.navigate("Administration")
                  }
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.darkButton}
                  onPress={this.submitData}
                >
                  <Text>Confirm/Save</Text>
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
                      this.props.navigation.navigate("Administration")
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
                <View style={styles.modelViewAlert}>
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
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   

    marginTop: height * 0.033,
    marginLeft: width * 0.033,
    marginRight: width * 0.033,
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
  lowBtn:{
    height:height*0.07,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom:1,
  },

  Profile_Photo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: "center",
    borderRadius:200,
    marginTop:10,
    marginBottom:10
  },

  input: {
    height: height * 0.06,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontFamily: "ArimaMadurai-Regular",
    fontSize:13,
    borderRadius: 10,
    backgroundColor: "#82B3C9",
  },

  rowButton: {
    paddingTop: 10,
    paddingLeft: 60,
    paddingRight: 60,
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

  darkImageButton: {
    backgroundColor: "#82B3C9",
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  darkButton: {
    backgroundColor: "#82B3C9",
    width: width * 0.3,
    height: height * 0.04,
    borderRadius:25,
    alignItems: "center",
    justifyContent: "center",
  },

  modelView: {
    position: "absolute",
    bottom: 3,
    paddingVertical: height * 0.01,
    width: width,
    backgroundColor: "#B3E5FC",
  },

  modelButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: height * 0.05,
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
