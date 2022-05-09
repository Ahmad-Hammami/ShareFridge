import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { SearchBar } from "react-native-elements";
/* import Data from "../.././db/users.json"; */
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const renderItem = ({ item }) => (
  <User name={item.name} email={item.email} type={item.type} />
);
export default class EmployeeViewListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: null,
      error: null,
      searchValue: "",
    };
    this.arrayholder = this.state.data;
  }

  getUsers = () => {
    fetch("https://sharefridgebackend.herokuapp.com/users")
      .then((res) => res.json())
      .then((result) => {
        this.setState({ data: result });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.getUsers();
  }

  searchFunction = (text) => {
    const updatedData = this.arrayholder.filter((user) => {
      const user_data = `${user.name.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return user_data.indexOf(text_data) > -1;
    });
    this.setState({ data: updatedData, searchValue: text });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Employee List:</Text>
        <SearchBar
          placeholder="Search Here..."
          lightTheme
          round
          value={this.state.searchValue}
          onChangeText={(text) => this.searchFunction(text)}
          autoCorrect={false}
        />
        <View>
          <View style={styles.employee_view}>
            <View style={styles.rowText}>
              <Text style={styles.title}>Name</Text>
              <Text style={styles.title}>E-mail</Text>
            </View>
            <FlatList
              data={this.state.data}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
            />
          </View>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.lightButton}
            onPress={() => this.props.navigation.navigate("Administration")}
          >
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const User = ({ name, email, type }) => {
  const navigation = useNavigation();
  if (type === "employee") {
    return (
      <TouchableOpacity
        style={styles.userButton}
        onPress={() =>
          navigation.navigate("CSelectedProfile", {
            selectedUserEmail: email,
          })
        }
      >
        <View style={styles.user}>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.text}>{email}</Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return <View></View>;
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: height * 0.05,
    padding: 2,
  },

  user: {
    backgroundColor: "#82B3C9",
    padding: 20,
    //marginVertical: 8,
    //marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userButton: {
    backgroundColor: "#82B3C9",
    marginVertical: height * 0.01,
    marginHorizontal: width * 0.005,
  },

  title: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 20,
  },

  text: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 15,
  },

  employee_view: {
    backgroundColor: "#B3E5FC",
    height: height * 0.75,
  },

  rowText: {
    paddingTop: 10,
    paddingLeft: 60,
    paddingRight: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  lightButton: {
    backgroundColor: "#B3E5FC",
    borderRadius: 10,
    padding: 5,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },

  darkButton: {
    backgroundColor: "#82B3C9",
    borderRadius: 10,
    padding: 5,
  },
});
