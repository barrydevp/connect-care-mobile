import React from "react";
import { connect } from "react-redux";
import { Image, Text as RNText, Alert } from "react-native";
import { Button, Icon, Layout, Input, Text } from "@ui-kitten/components";

import { Validator } from "~/utils";
import styles from "./styles";

@connect(({ login }) => ({ login }))
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
        type: "login/authenticate",
        payload: {
          username,
          password,
          callback: () => {
            navigation.navigate("Dashboard");
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
    const { navigation, login } = this.props;
    // console.log(login);
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
          <Button
            style={styles.button}
            status="info"
            icon={this.arrowIcon}
            disabled={
              !propsInputPassword[0] ||
              !propsInputUserName[0] ||
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
