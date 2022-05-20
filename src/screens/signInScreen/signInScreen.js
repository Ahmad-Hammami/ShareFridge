import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

const { height, width } = Dimensions.get("window");

export default function SignInScreen() {
  const [authenticated, setAuthenticated] = useState(false);
  const [id, setId] = useState(-1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [errorPass, setErrorPass] = useState(false);
  const [submitMSG, setSubmitMSG] = useState("Wrong email or password");

  const navigation = useNavigation();

  useEffect(() => {
    fetch("https://sharefridgebackend.herokuapp.com/users")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        console.log("Loaded users for signIn");
      })
      .catch((error) => {
        console.log("error");
        console.error(error);
      });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Willcome to ShareFridge</Text>

          <Image
            style={styles.image}
            source={require("../../.././assets/logo.png")}
          />

          <Text style={styles.text1}>E-mail:</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Type your here"
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmail(email)}
              value={email}
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
              value={password}
            />

          </View>
          <TouchableOpacity>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.btnstyle}>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => {
                let auth = false;
                for (let i = 0; i < data.length; i++) {
                  console.log(data[i].email);
                  console.log(data[i].type);
                  console.log(email.trim().toLowerCase());

                  if (
                    data[i].email === email &&
                    password === data[i].password
                  ) {
                    setAuthenticated(true);
                    setId(data[i].id);
                    auth = true
                    if (data[i].type === "employee") {
                      setEmail("")
                      setPassword("")
                      navigation.navigate("Menu", {
                        auth: data[i].auth,
                        currentUsertype: data[i].type,
                        currentUser: data[i].email,
                        cart: new Array(),
                        update: false,
                      });
                    } else {
                      setAuthenticated(true);
                      setEmail("")
                      setPassword("")
                      navigation.navigate("Administration", {
                        auth: data[i].auth,
                        currentUsertype: data[i].type,
                        currentUser: data[i].email,

                      });

                    }
                  }
                }
                if (!auth) {
                  { setErrorPass(true) }
                }



              }

              }
            >
              <Text style={styles.textbtn}>Sign In</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={errorPass}
            onRequestClose={() => { setErrorPass(false) }}
          >
            <View style={styles.modalCenterView}>
              <View style={styles.modelViewAlert}>
                <Text style={styles.text}>{submitMSG}</Text>
                <TouchableOpacity
                  style={styles.modalDarkButton}
                  onPress={() => {
                    { setErrorPass(false) }
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

const styles = StyleSheet.create({
  container: {
    marginTop: height * 0.1,
    alignItems: "center",
  },
  title: {
    marginTop: 20,
    fontSize: 25,
    fontFamily: "ArimaMadurai-Bold",
  },
  text1: {
    paddingRight: 190,
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 15,
  },
  text2: {
    paddingRight: 170,
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 15,
  },
  text: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 15,
    alignContent: "center",

  },

  logo: {
    width: 50,
    height: 50,
  },
  textbtn: {
    fontSize: 16,
    fontFamily: "ArimaMadurai-Bold",
  },
  inputView: {
    backgroundColor: "#82B3C9",
    borderRadius: 25,
    width: width * 0.7,
    height: height * 0.06,
    marginVertical: height * 0.02,
    alignItems: "center",
    justifyContent: "center"
  },
  TextInput: {
    width: width * 0.6,
    height: 40,

    marginLeft: 20,
    justifyContent: "center",
    fontFamily: "ArimaMadurai-Bold",

  },

  forgot_button: {
    marginTop: height * 0.02,
    fontSize: 12,
    fontFamily: "ArimaMadurai-Bold",
  },

  loginBtn: {
    marginTop: height * 0.1,
    width: width * 0.5,
    height: height * 0.06,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B3E5FC",
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
  },
  btnstyle: {
    marginTop: -42,
    alignItems: "center",
    width: width * 0.65,
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
