import React, { Component } from 'react';

export default class BehaviorMsg extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    static msg = async (email, userType) => {
        let sugerValue = 0
        let saltValue = 0
        let caffeineValue = 0
        let fatValue = 0
        let currentUser = email
        let currentUserType = userType
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
        let suger = ""
        let salt = ""
        let caffeine = ""
        let fat = ""
        if (currentUserType === "employee") {
            if (sugerValue > 5) {
                suger = "To much suger"
            }
            if (saltValue > 5) {
                salt = "To much salt"
            }
            if (caffeineValue > 5) {
                caffeine = "To much caffine"
            }
            if (fatValue > 5) {
                fat = "To much fat"
            }

            var BehaviorMSG;
            if (suger === "" && salt === "" && caffeine === "" && fat === "") {
                BehaviorMSG = "Have a nice day :)"
            } else if (salt === "" && caffeine === "" && fat === "") {
                BehaviorMSG = suger
            } else if (caffeine === "" && fat === "") {
                BehaviorMSG = suger + " and " + salt
            } else if (fat === "") {
                BehaviorMSG = suger + " and " + salt + " and " + caffeine
            } else {
                BehaviorMSG = suger + " and " + salt + " and " + caffeine + " and " + fat
            }
        } else {
            BehaviorMSG = "Have a nice day at the company"
        }
        return BehaviorMSG

    }

}

