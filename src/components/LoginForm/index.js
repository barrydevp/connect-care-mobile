import React from "react";
import {
  AccessibilityRole,
  ImageProps,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text as RNText
} from "react-native";
import { Button, Icon, Layout, Input, Text } from "@ui-kitten/components";

import { Validator } from "../../utils";

import styles from "./styles";

export default class extends React.Component {
  state = {
    username: undefined,
    password: undefined,
    secureTextEntry: true
  };

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
          <Image
            style={styles.headerImage}
            source={{
              uri:
                "http://pharmacy.connectcare.vn/static/images/logoNBM1-7e7768bd8dc4a3c645cff508fcb24e87.png"
            }}
          />
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
