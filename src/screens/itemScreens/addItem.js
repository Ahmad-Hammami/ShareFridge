import React, { Component, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Modal,
  ScrollView,
} from "react-native";
import { RadioButton, Button, Checkbox } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const { height, width } = Dimensions.get("window");

export default class AddItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: "",
      amount: "",
      description: "",
      type: "food",
      priority: false,

      suger: false,
      caffeine: false,
      fat: false,
      salt: false,
      popUpPhoto: false,
      selectedImage:
        "https://res.cloudinary.com/sharefridge/image/upload/v1651785014/coffee_imxakb.png",
      submit: false,
      submitMSG: "",
    };
  }

  submitData = () => {
    fetch("https://sharefridgebackend.herokuapp.com/send-item", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        price: this.state.price,
        amount: this.state.amount,
        type: this.state.type,
        description: this.state.description,
        picture: this.state.selectedImage,
        suger: this.state.suger,
        caffeine: this.state.caffeine,
        fat: this.state.fat,
        salt: this.state.salt,
        priority: this.state.priority,
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
  };

  onSelectedItemsChange = (selectedContents) => {
    if (selectedContents === []) {
      this.clearSelectedCategories;
    } else {
      this.setState({ selectedContents });
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
    const { suger, caffeine, fat, salt } = this.state;

    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.photo_view}>
              <Text style={styles.title}>Add a new item:</Text>
              <Image
                style={styles.Profile_Photo}
                source={{ uri: this.state.selectedImage }}
              />
            </View>
            <Text style={styles.text}>Insert photo of profile:</Text>
            <Button
              dark={false}
              mode="contained"
              style={styles.darkPhotoButton}
              icon={
                this.state.selectedImage ===
                "https://res.cloudinary.com/sharefridge/image/upload/v1651785014/coffee_imxakb.png"
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
                    style={styles.darkPhotoButton}
                    icon="camera"
                    onPress={this.openCameraAsync}
                  >
                    Camera
                  </Button>
                  <Button
                    dark={false}
                    mode="contained"
                    style={styles.darkPhotoButton}
                    icon="image-area"
                    onPress={this.openImagePickerAsync}
                  >
                    Gallery
                  </Button>
                </View>
                <Button
                  dark={false}
                  mode="contained"
                  style={styles.darkPhotoButton}
                  onPress={() => this.setState({ popUpPhoto: false })}
                >
                  Cancel
                </Button>
              </View>
            </Modal>
            <View>
              <Text style={styles.text}>Name of the item:</Text>
              <TextInput
                style={styles.input}
                placeholder="Type the name here"
                onChangeText={(name) => this.setState({ name })}
                value={this.state.text}
              />
              <Text style={styles.text}>Price:</Text>
              <TextInput
                style={styles.input}
                placeholder="in DKK"
                onChangeText={(price) => this.setState({ price })}
                value={this.state.text}
              />
              <Text style={styles.text}>Amount:</Text>
              <TextInput
                style={styles.input}
                placeholder="amount"
                onChangeText={(amount) => this.setState({ amount })}
                value={this.state.text}
              />
            </View>
            <View style={styles.rowButton}>
              <View>
                <Text style={styles.text}>Item type:</Text>
              </View>
              <View>
                <RadioButton.Group
                  onValueChange={(value) => {
                    this.setState({ type: value });
                  }}
                  value={this.state.type}
                >
                  <RadioButton.Item
                    value="food"
                    label="food"
                    labelStyle={styles.text}
                  />
                  <RadioButton.Item
                    value="drinks"
                    label="drinks"
                    labelStyle={styles.text}
                  />
                </RadioButton.Group>
              </View>
            </View>
            <Text style={styles.title}>Contents</Text>
            <View style={styles.rowButton}>
              <Text style={styles.text}>suger</Text>
              <Checkbox
                status={suger ? "checked" : "unchecked"}
                onPress={() => {
                  this.setState({ suger: !suger });
                }}
              />
              <Text style={styles.text}>caffeine</Text>
              <Checkbox
                status={caffeine ? "checked" : "unchecked"}
                onPress={() => {
                  this.setState({ caffeine: !caffeine });
                }}
              />
            </View>
            <View style={styles.rowButton}>
              <Text style={styles.text}>fat</Text>
              <Checkbox
                status={fat ? "checked" : "unchecked"}
                onPress={() => {
                  this.setState({ fat: !fat });
                }}
              />
              <Text style={styles.text}>salt</Text>
              <Checkbox
                status={salt ? "checked" : "unchecked"}
                onPress={() => {
                  this.setState({ salt: !salt });
                }}
              />
            </View>
            <Text style={styles.text}>Description:</Text>
            <TextInput
              style={styles.inputD}
              placeholder="Short text about the item."
              onChangeText={(description) => this.setState({ description })}
              value={this.state.text}
            />

            <View style={styles.lowBar}>
              <TouchableOpacity
                style={styles.lightButton}
                onPress={() => this.props.navigation.navigate("Administration")}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.darkButton}
                onPress={this.submitData}
              >
                <Text>Confirm</Text>
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
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: "center",
    marginTop:12,
    marginBottom:12,
    borderRadius:200
  },

  input: {
    height: height * 0.06,
    width: width * 0.8,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontFamily: "ArimaMadurai-Regular",
    borderRadius: 10,
    backgroundColor: "#82B3C9",
  },
  
  inputD: {
    height: height * 0.07,
    width: width * 0.8,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontFamily: "ArimaMadurai-Regular",
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
  lowBar:{
    height:height*0.07,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom:1,
  },

  darkButton: {
    backgroundColor: "#82B3C9",
    borderRadius: 25,
    width: width * 0.3,
    height: height * 0.04,
    alignItems: "center",
    justifyContent: "center",
  },
  darkPhotoButton: {
    backgroundColor: "#82B3C9",
    borderRadius: 10,
    padding: 5,
    margin: 5,
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
