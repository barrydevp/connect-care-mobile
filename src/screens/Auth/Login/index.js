import React from "react";
import { connect } from "react-redux";
import { Image, Text as RNText, Alert, View } from "react-native";
import { Button, Icon, Layout, Input, Text } from "@ui-kitten/components";

import { helper } from "~/utils";
import styles from "./styles";

@connect(({ auth }) => ({ auth }))
class Login extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {};
  };

  state = {
    username: undefined,
    password: undefined,
    secureTextEntry: true
  };

  _signInAsync = () => {
    const { username, password } = this.state;
    const { dispatch, navigation } = this.props;
    // console.log(this);

    if (username && password) {
      dispatch({
        type: "auth/authenticate",
        payload: {
          username,
          password,
          callback: token => {
            this.setState(state => ({
              password: undefined
            }));
            navigation.navigate({
              routeName: "Auth/ChoosePlace",
              params: {
                token
              }
            });
          }
        }
      });
    }
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
    // const { navigation, auth } = this.props;
    // console.log(login);
    // console.log("loging: ", this.props.auth);
    const { username, password, secureTextEntry } = this.state;

    const {
      caption: captionUsername,
      status: statusUsername,
      isValidate: isValidateUsername
    } = helper.getCaptionAndStatusOfInput("isUsername", username)(
      {
        success: "",
        error: "Vui lòng nhập từ 6 đến 50 ký tự bao gồm chữ, số và _"
      },
      { success: "", error: "danger" }
    );
    const {
      caption: captionPassword,
      status: statusPassword,
      isValidate: isValidatePassword
    } = helper.getCaptionAndStatusOfInput("isPassword", password)(
      { success: "", error: "Vui lòng nhập mật khẩu" },
      { success: "", error: "danger" }
    );

    // console.log(captionUsername, statusUsername);

    return (
      <Layout style={styles.container}>
        <Layout style={styles.headerContainer}>
          <Layout style={styles.headerImage}>
            <Image
              style={styles.logo}
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
            status={statusUsername}
            caption={captionUsername}
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
            status={statusPassword}
            caption={captionPassword}
          />
        </Layout>
        <Layout style={styles.footerContainer}>
          <Button
            style={styles.button}
            status="info"
            icon={this.arrowIcon}
            disabled={
              !isValidateUsername ||
              !isValidatePassword ||
              !username ||
              !password
            }
            onPress={this._signInAsync}
          />
        </Layout>
      </Layout>
    );
  }
}

export default Login;

// module.exports = Login;
