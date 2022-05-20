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
      update: props.route.params,
    };
  }

  getUsers = () => {
    fetch("https://sharefridgebackend.herokuapp.com/users")
      .then((res) => res.json())
      .then((result) => {
        this.setState({ data: result });
        this.arrayholder = result;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.getUsers();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.route.params !== prevProps.route.params) {
      this.getUsers();
    }
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
              <Text style={styles.titleNE}>Name</Text>
              <Text style={styles.titleNE}>E-mail</Text>
            </View>
            <FlatList
              data={this.state.data}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
            />
          </View>
        </View>
        <View style={styles.LowBar}>
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
          <Text style={styles.textName}>{name}</Text>
          <Text style={styles.textEmail}>{email}</Text>
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
    padding: 3,
    height: height * 0.85
  },

  LowBar: {
    position: "absolute",
    bottom: -50,
    padding: 2,
    marginLeft: 17,
  },

  user: {
    backgroundColor: "#82B3C9",
    padding: 15,
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
    fontSize: 25,
  },
  titleNE: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 20,
  },

  text: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 15,
  },

  textName: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 14,
    width: width * 0.4,
  },

  textEmail: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 14,
    width: width * 0.5,
  },

  employee_view: {
    //height: height * 0.65,
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
    borderRadius: 25,
    width: width * 0.3,
    height: height * 0.04,
    alignItems: "center",
    justifyContent: "center",
  },
});
