import React from "react";
import {
  AsyncStorage,
  AccessibilityRole,
  ImageProps,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  Text as RNText
} from "react-native";
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text
} from "@ui-kitten/components";

import LoginForm from "../../components/LoginForm"

export default class App extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title", "Login"),
      // headerRight: () => (
      //   <Button
      //     onPress={() => alert("This is a button!")}
      //     title="Info"
      //     color="#fff"
      //   />
      // ),
      // headerStyle: {
      //   backgroundColor: "#EC5252"
      // },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };

  state = {
    username: "",
    password: "",
    isDisabled: false
  };

  _signInAsync = async () => {
    const { username, password } = this.state;
    // console.log(this);
    try {
      if (username && password) {
        this.setState(state => {
          isDisabled: true;
        });
        // console.log();
        const response = (
          await axios({
            method: "post",
            url: "http://api.dev.nhathuocgpp.com.vn/authenticate",
            data: {
              userName: username,
              password: password
            },
            headers: {
              "Content-Type": "application/json"
            }
          })
        ).data;

        console.log(response);

        if (response) {
          if (response.success) {
            await AsyncStorage.setItem("x-auth-key", response.token);
            this.props.navigation.navigate("App");
            return;
          } else {
            Alert.alert(response.error.message);
          }
        } else {
          Alert.alert("no data response");
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert("error axios");
    }

    this.setState(state => {
      isDisabled: false;
    });
  };

  onChangeTextOf(field) {
    return text => {
      this.setState(state => {
        return {
          [field]: text
        };
      });
    };
  }

  render() {
    // const { navigation } = this.props;
    // const value = {
    //   ...this.state,
    //   onChangeTextOf: this.onChangeTextOf.bind(this),
    //   signInAsync: this._signInAsync
    // };

    return (
      <>
        <LoginForm />
      </>
    );
  }
}
