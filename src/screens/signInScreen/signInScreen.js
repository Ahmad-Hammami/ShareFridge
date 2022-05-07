
import React, { useState} from "react";
import { Button, Text, View, TextInput, StyleSheet, Image, TouchableOpacity, } from "react-native";
import data from "../.././db/users.json";
import { useNavigation } from "@react-navigation/core";


export default function  SignInScreen () {
    const [authenticated, setAuthenticated] = useState(false);
  const [id, setId] = useState(-1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
    
        return (
            <View style={styles.container}> 
                <Text style={styles.title}>Willcome to ShareFridge</Text>
                
                <Image style={styles.image} source = {require('../../.././assets/logo.png')}/>
                
                
                <Text style={styles.text1}>E-mail:</Text>
                <View style={styles.inputView}>
                    
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Type your here"
                        placeholderTextColor="#003f5c"
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>
                <Text style={styles.text2}>Password:</Text>
                <View style={styles.inputView}>

                    <TextInput
                        style={styles.TextInput}
                        placeholder="Type password here"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        
                        onChangeText={(password) => setPassword(password)}
                    />
                  <TouchableOpacity>
                        <Text style={styles.forgot_button}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                


                <View style={styles.btnstyle}>

                    <TouchableOpacity style={styles.loginBtn}   
                   onPress={() => {
                    for (let i = 0; i < data.length; i++) {
                      console.log(data[i].email);
                      console.log(data[i].type);
                      console.log(email.trim().toLowerCase());
            
                      if (
                        data[i].email === email.trim().toLowerCase() &&
                        password === data[i].password
                      ) {                         
                        setAuthenticated(true);
                        setId(data[i].id);
                        if(data[i].type === "employee"){
                        navigation.navigate("Menu", {
                          auth: data[i].auth,
                          currentUsertype: data[i].type,
                          currentUser: data[i].name,
                          cart: new Array(),
                        });
                      } else {
                        setAuthenticated(true);
                        navigation.navigate("Administration", {
                            auth: data[i].auth,
                            currentUsertype: data[i].type,
                            
                      });}
                    }
                  }}}
                >
                        <Text style={styles.textbtn} >Sign In</Text>
                      
                    </TouchableOpacity>

                  
                </View>
            </View>
        );

    }



const styles = StyleSheet.create({
    container: {
        flex: 1, 
      alignItems: 'center', 
      justifyContent: 'space-evenly',
    },
    title:{
        marginTop: 20,
        fontSize: 25,
        fontFamily: 'ArimaMadurai-Bold',
        marginBottom: -20,
    },
    text1:{
        paddingRight: 190,
        fontFamily: 'ArimaMadurai-Bold',
        fontSize: 15,
        marginBottom:45,
    },
    text2:{
        paddingRight: 170,
        fontFamily: 'ArimaMadurai-Bold',
        fontSize: 15,
        marginTop:-40,
        marginBottom:45,
    },

    logo: {
        width: 50,
        height: 50,
    },
    textbtn:{
        fontSize: 16,
        fontFamily: 'ArimaMadurai-Bold',
    },
    inputView: {
        backgroundColor: "#82B3C9",
        borderRadius: 25,
        width: "70%",
        height: 45,
        marginTop:-105,
        marginBottom: 0,
        alignItems: "center",
    },
    TextInput: {
        width: 240, 
        height: 40,
        margin: 5,
        padding: 10,
        marginLeft: 20,
        fontFamily: 'ArimaMadurai-Bold',
    },

    forgot_button: {
        marginTop:10,
        fontSize: 12,
        fontFamily: 'ArimaMadurai-Bold',
      },
  
      loginBtn: {
        width: "70%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#B3E5FC",
      },
      image: {
        marginBottom: -30,
        width: 230,
        height: 230,
      },
      btnstyle: {
        alignItems: 'center', 
        width: "65%",
      },
});