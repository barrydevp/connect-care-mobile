import React from "react";
import { AsyncStorage, Image, Text as RNText } from "react-native";
import { Button, Icon, Layout, Input, Text } from "@ui-kitten/components";

import { Validator } from "../../utils";

import styles from "./styles";

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      
    };
  };

  state = {
    username: undefined,
    password: undefined,
    secureTextEntry: true
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

  onIconPress = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    });
  };

  renderIcon = style => {
    return (
      <Icon {...style} name={this.state.secureTextEntry ? "eye-off" : "eye"} />
    );
  };

  arrowIcon = style => <Icon {...style} name="arrow-forward-outline" />;

  render() {
    const { navigation } = this.props;

    const { username, password, secureTextEntry } = this.state;

    const propsInputUserName = (username => {
      const isUsername =
        username === undefined || Validator.isUsername(username);

      return [
        isUsername,
        isUsername ? "" : "Vui lòng nhập từ 6 đến 50 ký tự bao gồm chữ, số và _"
      ];
    })(username);
    const propsInputPassword = (password => {
      const isPassword =
        password === undefined || Validator.isUsername(password);

      return [isPassword, isPassword ? "" : "Vui lòng nhập mật khẩu"];
    })(password);

    return (
      <Layout style={styles.container}>
        <Layout style={styles.headerContainer}>
          <Layout style={styles.headerImage}>
            <Image style={styles.logo}
              source={require("~/assets/logoNBM.png")}
              resizeMode="stretch"
            />
          </Layout>
          <Text style={styles.headerText} category="h6">
            Đăng nhập vào trang quản trị
          </Text>
        </Layout>
        <Layout style={styles.bodyContainer}>
          <Input
            style={styles.input}
            placeholder="Tên đăng nhập"
            value={username || ""}
            onChangeText={text => this.setState({ username: text })}
            textContentType={"username"}
            clearButtonMode={"while-editing"}
            status={propsInputUserName[0] ? "" : "danger"}
            caption={propsInputUserName[1]}
          />
          <Input
            style={styles.input}
            value={password || ""}
            placeholder="Mật khẩu"
            icon={this.renderIcon}
            secureTextEntry={secureTextEntry}
            onIconPress={this.onIconPress}
            onChangeText={text => this.setState({ password: text })}
            textContentType={"password"}
            clearButtonMode={"while-editing"}
            status={propsInputPassword[0] ? "" : "danger"}
            caption={propsInputPassword[1]}
          />
        </Layout>
        <Layout style={styles.footerContainer}>
          <Button style={styles.button} status="info" icon={this.arrowIcon} />
        </Layout>
      </Layout>
    );
  }
}

// export default class extends React.Component {
//   static navigationOptions = ({ navigation }) => {
//     return {
//       title: navigation.getParam("title", "Login"),
//       // headerRight: () => (
//       //   <Button
//       //     onPress={() => alert("This is a button!")}
//       //     title="Info"
//       //     color="#fff"
//       //   />
//       // ),
//       // headerStyle: {
//       //   backgroundColor: "#EC5252"
//       // },
//       headerTintColor: "#fff",
//       headerTitleStyle: {
//         fontWeight: "bold"
//       }
//     };
//   };

//   state = {
//     username: "",
//     password: "",
//     isDisabled: false
//   };

//   _signInAsync = async () => {
//     const { username, password } = this.state;
//     // console.log(this);
//     try {
//       if (username && password) {
//         this.setState(state => {
//           isDisabled: true;
//         });
//         // console.log();
//         const response = (
//           await axios({
//             method: "post",
//             url: "http://api.dev.nhathuocgpp.com.vn/authenticate",
//             data: {
//               userName: username,
//               password: password
//             },
//             headers: {
//               "Content-Type": "application/json"
//             }
//           })
//         ).data;

//         console.log(response);

//         if (response) {
//           if (response.success) {
//             await AsyncStorage.setItem("x-auth-key", response.token);
//             this.props.navigation.navigate("App");
//             return;
//           } else {
//             Alert.alert(response.error.message);
//           }
//         } else {
//           Alert.alert("no data response");
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       Alert.alert("error axios");
//     }

//     this.setState(state => {
//       isDisabled: false;
//     });
//   };

//   onChangeTextOf(field) {
//     return text => {
//       this.setState(state => {
//         return {
//           [field]: text
//         };
//       });
//     };
//   }

//   render() {
//     // const { navigation } = this.props;
//     // const value = {
//     //   ...this.state,
//     //   onChangeTextOf: this.onChangeTextOf.bind(this),
//     //   signInAsync: this._signInAsync
//     // };

//     return (
//       <>
//         <LoginForm />
//       </>
//     );
//   }
// }
