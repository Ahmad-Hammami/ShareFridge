import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";

const { height, width } = Dimensions.get("window");

let currentReceipts = [];
let receipts = [];

let behavior = [{ name: "suger", count: 0 }];

let chartDataItems = {
  labels: ["January"],
  datasets: [
    {
      data: [1],
    },
  ],
};

export default class CViewBehaviorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsertype: props.route.params.currentUsertype,
      behavior: null,
      receipts: null,
      currentReceipts: null,
      chartDataItems: null,
    };
  }

  componentDidMount = async () => {
    receipts = [];

    await this.getReceipts();
    await this.compressArray(receipts);
    await this.getChartDataItems();
    await this.getBehavior();
  };

  getReceipts = async () => {
    await fetch("https://sharefridgebackend.herokuapp.com/get-all-receipts")
      .then((res) => res.json())
      .then((result) => {
        result.map((item) => {
          let cart1 = [];
          cart1 = receipts.concat(item.cartItems);
          receipts = cart1;
        });
      })
      .catch((error) => {
        console.log("hej");
        console.error(error);
      });
  };

  getBehavior = async () => {
    await fetch("https://sharefridgebackend.herokuapp.com/get-all-behavior")
      .then((res) => res.json())
      .then((result) => {
        let suger = 0;
        let salt = 0;
        let caffeine = 0;
        let fat = 0;
        result.map((item) => {
          suger = suger + item.suger;
          salt = salt + item.salt;
          caffeine = caffeine + item.caffeine;
          fat = fat + item.fat;
        });
        let currentBehavior = [
          {
            name: "suger",
            count: suger,
            color: "red",
          },
          {
            name: "salt",
            count: salt,
            color: "yellow",
          },
          {
            name: "caffeine",
            count: caffeine,
            color: "green",
          },
          {
            name: "fat",
            count: fat,
            color: "purple",
          },
        ];
        behavior = currentBehavior;
        this.setState({ behavior: currentBehavior });
      })
      .catch((error) => {
        console.log("hej");
        console.error(error);
      });
  };

  compressArray = async (original) => {
    var compressed = [];
    var copy = original.slice(0);
    for (var i = 0; i < original.length; i++) {
      var myCount = 0;
      for (var w = 0; w < copy.length; w++) {
        if (original[i] == copy[w]) {
          myCount++;
          delete copy[w];
        }
      }

      if (myCount > 0) {
        var a = new Object();
        a.id = i;
        a.name = original[i];
        a.count = myCount;
        compressed.push(a);
      }
    }
    currentReceipts = compressed;
    this.setState({ currentReceipts: compressed });
  };

  getChartDataItems = async () => {
    let labels = [];
    let values = [];
    currentReceipts.map((item) => {
      labels.push(item.name);
    });
    currentReceipts.map((item) => {
      values.push(item.count);
    });

    let chartData = {
      labels,
      datasets: [
        {
          data: values,
        },
      ],
    };
    chartDataItems = chartData;
    this.setState({ chartDataItems: chartData });
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Company reprisantative</Text>
            </View>
            <View style={styles.containerGraph}>
              <Text style={styles.title}>Amount of items purchased:</Text>
              <BarChart
                data={chartDataItems}
                width={width * 0.9}
                height={height * 0.3}
                chartConfig={chartConfig}
                showBarTops={true}
                fromZero={true}
                showValuesOnTopOfBars={true}
                withInnerLines={false}
              />
            </View>
            <View style={styles.containerGraph}>
              <Text style={styles.title}>Found behavior of employees:</Text>
              <View style={styles.rowChart}>
                <View>
                  <PieChart
                    data={behavior}
                    width={width * 0.6}
                    height={height * 0.3}
                    chartConfig={pieChartConfig}
                    accessor={"count"}
                    center={[0, 0]}
                    hasLegend={false}
                    paddingLeft={"40"}
                  />
                </View>
                <View style={styles.legendContainer}>
                  {behavior.map(({ name, count, color }) => {
                    return (
                      <Fragment key={name}>
                        <View style={styles.rowText}>
                          <Text style={[styles.pieChartText, { color: color }]}>
                            {name}:{" "}
                          </Text>
                          <Text style={styles.pieChartText}>{count}</Text>
                        </View>
                      </Fragment>
                    );
                  })}
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.lightButton}
                onPress={() =>
                  this.props.navigation.navigate("Administration", {
                    currentUser: this.state.currentUser,
                    cart: [],
                    currentUsertype: this.state.currentUsertype,
                  })
                }
              >
                <Text>Back</Text>
              </TouchableOpacity>

              <Text></Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: height * 0.1,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
  },

  containerGraph: {
    marginTop: height * 0.05,
  },

  title: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 20,
  },

  pieChartText: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 15,
  },

  row: {
    marginTop: height * 0.02,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowChart: {
    marginTop: height * 0.02,
    flexDirection: "row",
    backgroundColor: "#B3E5FC",
  },
  rowText: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.25,
  },

  lightButton: {
    backgroundColor: "#B3E5FC",
    borderRadius: 10,
    width: width * 0.2,
    height: height * 0.03,
    alignItems: "center",
    justifyContent: "center",
  },

  legendContainer: {
    marginTop: 20,
  },
  
});

const chartConfig = {
  backgroundGradientFrom: "#B3E5FC",
  backgroundGradientTo: "#B3E5FC",
  color: () => "#000000",
  labelColor: () => "#000000",
  barPercentage: 0.5,
  decimalPlaces: 0,
  propsForLabels: {
    fontFamily: "ArimaMadurai-Bold",
    fontSize: 10,
  },
};
const pieChartConfig = {
  color: () => "#000000",
};
