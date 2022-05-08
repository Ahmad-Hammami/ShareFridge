import React, { Component } from 'react';
import {Text, View, Image, StyleSheet, TextInput, TouchableOpacity, Modal, Dimensions, SafeAreaView, ScrollView, Alert, } from "react-native";
import { Button,  } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import ThemedDialog from 'react-native-elements/dist/dialog/Dialog';

const {height, width} = Dimensions.get('window');

export default class AddAnEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {id: 10, fullName: '', email: '', password1: '', password2: '', balance: '', 
            popUpPhoto: false, selectedImage: "https://res.cloudinary.com/sharefridge/image/upload/v1651785014/Emma_Profile_ij8c9r.jpg",
        };
      }


    submitData = ()=>{
        fetch("http://10.0.2.2:3000/send-user",{
            method: "post",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name: this.state.fullName,
                email: this.state.email,
                password: this.state.password1,
                picture: this.state.selectedImage,
                balance: this.state.balance
            })
        })
    .then(res=>res.json()).then(data=>{
        console.log(data)
        Alert.alert(`${data.name} is saved successfuly`)
        this.props.navigation.navigate("Administration")
    })}





    navigateFunction = () => {

        this.props.navigation.navigate('Administration')
      };

    saveFunction = (body) => {
        this.navigateFunction()
        //this.setState(prevState => ({ id: prevState.id + 1 }));
        //console.log(this.state.id)
    };


    openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let imageResult = await ImagePicker.launchImageLibraryAsync(
            {
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            }
        );

        if (imageResult.cancelled === true) {
            return;
          }
        
        let newfile = {
            uri: imageResult.uri, 
            type: `test/${imageResult.uri.split(".")[1]}`, 
            name: `test.${imageResult.uri.split(".")[1]}`
        }
        this.handleUpload(newfile)
        };

    openCameraAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera is required!");
          return;
        }
    
        let cameraResult = await ImagePicker.launchCameraAsync(
            {
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            }
        );

        if (cameraResult.cancelled === true) {
            return;
          }
        let newfile = {
            uri: cameraResult.uri, 
            type: `test/${cameraResult.uri.split(".")[1]}`, 
            name: `test.${cameraResult.uri.split(".")[1]}`
        }
        this.handleUpload(newfile)
        };


    handleUpload = (image)=>{
        const data = new FormData
        data.append('file', image)
        data.append('upload_preset', 'ShareFridge')
        data.append('cloud_name','sharefridge')

        fetch("https://api.cloudinary.com/v1_1/sharefridge/image/upload", {
            method:"post",
            body: data
        }).then(res=>res.json()).then(data=>{
            this.setState({selectedImage: data.url})
            this.setState({popUpPhoto: false})
        })
    }

    render() {
        return(
            <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                
                <View style={styles.photo_view}>
                    <Text style={styles.title}>
                        Create a new Profile:
                    </Text>
                    <Image style={styles.Profile_Photo} source = {{uri: this.state.selectedImage}}/>
                </View>
                <Text style={styles.text}>
                    Insert photo of profile:
                </Text>
                <Button 
                dark={false}
                mode="contained"
                style={styles.darkButton}
                icon={ this.state.selectedImage==="https://res.cloudinary.com/sharefridge/image/upload/v1651785014/Emma_Profile_ij8c9r.jpg"?"upload":"check" }
                onPress={() => this.setState({popUpPhoto: true})}>
                    Upload Image
                </Button>
                <Modal
                animationType='slide'
                transparent={true}
                visible={this.state.popUpPhoto}
                onRequestClose={()=>{this.setState({popUpPhoto: false})}}
                >
                    <View style={styles.modelView}>
                        <View style={styles.modelButtonView}>
                            <Button 
                            dark={false}
                            mode="contained"
                            style={styles.darkButton}
                            icon="camera"  
                            onPress={this.openCameraAsync}>
                                Camera
                            </Button>
                            <Button 
                            dark={false}
                            mode="contained"
                            style={styles.darkButton}
                            icon="image-area" 
                            onPress={this.openImagePickerAsync}>
                                Gallery
                            </Button>
                        </View>
                        <Button 
                        dark={false}
                        mode="contained"
                        style={styles.darkButton}
                        onPress={() => this.setState({popUpPhoto: false})}>
                            Cancel
                        </Button>
                    </View>
                </Modal>
                <View>
                    <Text style={styles.text}>
                        ID: 2342
                    </Text>
                    <Text style={styles.text}>
                        Full Name:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Type full name here"
                        onChangeText={(fullName) => this.setState({fullName})}
                        value={this.state.fullName}
                    />
                    <Text style={styles.text}>
                        E-mail:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Type E-mail here"
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                    />
                    <Text style={styles.text}>
                        Password:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        onChangeText={(password1) => this.setState({password1})}
                        value={this.state.password1}
                    />
                    <Text style={styles.text}>
                        Confirm your Password:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password again"
                        onChangeText={(password2) => this.setState({password2})}
                        value={this.state.password2}
                    />
                    <View style={styles.rowButton}>
                        <TouchableOpacity
                            style={styles.lightButton}
                            onPress={() => this.props.navigation.navigate('Administration')}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.darkButton}
                            onPress = {this.submitData}
                        >
                            <Text>Confirm/Save</Text>
                        </TouchableOpacity>
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
        marginTop: height * 0.05,
        padding: 2, 
    },

    title: {
        fontFamily: 'ArimaMadurai-Bold',
        fontSize: 20,
      },

    text: {
      fontFamily: 'ArimaMadurai-Bold',
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

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontFamily: 'ArimaMadurai-Regular',
        borderRadius: 10,
        backgroundColor: "#82B3C9",
      },

    rowButton: {
        paddingTop: 10,
        paddingLeft: 60,
        paddingRight: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },

    lightButton: {
        backgroundColor: "#B3E5FC",
        borderRadius: 10,
        padding: 5,
    },

    darkButton: {
        backgroundColor: "#82B3C9",
        borderRadius: 10,
        padding: 5,
        margin: 5,
    },

    modelView: {
        position:"absolute",
        bottom: 3,
        paddingVertical: height * 0.01,
        width: width,
        backgroundColor: "#B3E5FC"
    },

    modelButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: height * 0.05, 
    }

    
    
    
  });

async function addEmployee() {
    if(items.length < 1 || items == undefined){
       return undefined;
    }
    const {fullName, email, password1, password2} = this.state;
    const matches = password === c_password;
    matches ? alert("MATCHED") : alert("NO MATCH");  
  
    const rawResponse = await fetch(baseUrl + "/addEmployee", {
       method: "POST",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
       },
       body:   {
        "id": 5,
        "fullName": fullName,
        "email": email,
        "password": password,
        "photo": false
      },
     })
       .then(function (res) {
         return res.text();
       })
       .catch((err) => {
         console.log(err);
       });
     return rawResponse;
    }