import React, { Component } from "react";

export default class BehaviorMsg extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static msg = async (email, userType) => {
    let sugerValue = 0;
    let saltValue = 0;
    let caffeineValue = 0;
    let fatValue = 0;
    let currentUser = email;
    let currentUserType = userType;

    if (currentUserType === "employee") {
      await fetch("https://sharefridgebackend.herokuapp.com/get-behavior", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: currentUser,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          sugerValue = result.suger;
          saltValue = result.salt;
          caffeineValue = result.caffeine;
          fatValue = result.fat;
        })
        .catch((error) => {
          console.log("hej");
          console.error(error);
        });

      var BehaviorMSG;
      const sugerMAX = 2;
      const caffeineMAX = 3;
      const fatMAX = 2;
      const saltMAX = 2;
      console.log(sugerValue)
      if (
        sugerValue <= sugerMAX &&
        caffeineValue <= caffeineMAX &&
        fatValue <= fatMAX &&
        saltValue <= saltMAX
      ) {
        BehaviorMSG = "Have a nice day :)";
      } else if (
        sugerValue > sugerMAX &&
        caffeineValue <= caffeineMAX &&
        fatValue <= fatMAX &&
        saltValue <= saltMAX
      ) {
        BehaviorMSG = "You have had to much suger";
      } else if (
        sugerValue <= sugerMAX &&
        caffeineValue <= caffeineMAX &&
        fatValue <= fatMAX &&
        saltValue > saltMAX
      ) {
        BehaviorMSG = "You have had to much salt";
      } else if (
        sugerValue <= sugerMAX &&
        caffeineValue <= caffeineMAX &&
        fatValue > fatMAX &&
        saltValue <= saltMAX
      ) {
        BehaviorMSG = "You have had to much fat";
      } else if (
        sugerValue <= sugerMAX &&
        caffeineValue > caffeineMAX &&
        fatValue <= fatMAX &&
        saltValue <= saltMAX
      ) {
        BehaviorMSG = "You have had to much caffeine";
      } else if (
        sugerValue > sugerMAX &&
        caffeineValue > caffeineMAX &&
        fatValue <= fatMAX &&
        saltValue <= saltMAX
      ) {
        BehaviorMSG = "You have had to much suger and caffeine";
      } else if (
        sugerValue > sugerMAX &&
        caffeineValue <= caffeineMAX &&
        fatValue > fatMAX &&
        saltValue <= saltMAX
      ) {
        BehaviorMSG = "You have had to much suger and fat";
      } else if (
        sugerValue > sugerMAX &&
        caffeineValue <= caffeineMAX &&
        fatValue <= fatMAX &&
        saltValue > saltMAX
      ) {
        BehaviorMSG = "You have had to much suger and salt";
      } else if (
        sugerValue <= sugerMAX &&
        caffeineValue <= caffeineMAX &&
        fatValue > fatMAX &&
        saltValue > saltMAX
      ) {
        BehaviorMSG = "You have had to much salt and fat";
      } else if (
        sugerValue <= sugerMAX &&
        caffeineValue > caffeineMAX &&
        fatValue <= fatMAX &&
        saltValue > saltMAX
      ) {
        BehaviorMSG = "You have had to much salt and caffeine";
      } else if (
        sugerValue <= sugerMAX &&
        caffeineValue > caffeineMAX &&
        fatValue > fatMAX &&
        saltValue <= saltMAX
      ) {
        BehaviorMSG = "You have had to much caffeine and fat";
      } else if (
        sugerValue > sugerMAX &&
        caffeineValue > caffeineMAX &&
        fatValue > fatMAX &&
        saltValue <= saltMAX
      ) {
        BehaviorMSG = "You have had to much suger, caffeine and fat";
      } else if (
        sugerValue > sugerMAX &&
        caffeineValue > caffeineMAX &&
        fatValue <= fatMAX &&
        saltValue > saltMAX
      ) {
        BehaviorMSG = "You have had to much suger, caffeine and salt";
      } else if (
        sugerValue > sugerMAX &&
        caffeineValue <= caffeineMAX &&
        fatValue > fatMAX &&
        saltValue > saltMAX
      ) {
        BehaviorMSG = "You have had to much suger, fat and salt";
      } else if (
        sugerValue <= sugerMAX &&
        caffeineValue > caffeineMAX &&
        fatValue > fatMAX &&
        saltValue > saltMAX
      ) {
        BehaviorMSG = "You have had to much caffeine, fat and salt";
      } else if(
        sugerValue > sugerMAX &&
        caffeineValue > caffeineMAX &&
        fatValue > fatMAX &&
        saltValue > saltMAX
      ) {
        BehaviorMSG = "You have had to much suger, caffeine, fat and salt";
      }
    } else {
      BehaviorMSG = "Have a nice day at the company";
    }
    return BehaviorMSG;
  };
}
