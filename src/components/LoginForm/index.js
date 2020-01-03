import React from "react";
import {
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
  Layout,
  Input,
  Text
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { mapping, light, dark } from "@eva-design/eva";

import styles from "./styles";

export default class extends React.Component {
  state = {
    value: "",
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

  render() {
    const { navigation } = this.props;
    // const value = {
    //   ...this.state,
    //   onChangeTextOf: this.onChangeTextOf.bind(this),
    //   signInAsync: this._signInAsync
    // };
    const { value, secureTextEntry } = this.state;

    return (
      <Layout style={styles.container}>
        <Input
          label="Email"
          placeholder="john.doe@example.com"
          value={value}
          onChangeText={text => this.setState({ value: text })}
          textContentType={"username"}
          clearButtonMode={"while-editing"}
          status={"danger"}
          caption={""}
        />
        <Input
          value={value}
          placeholder="********"
          icon={this.renderIcon}
          secureTextEntry={secureTextEntry}
          onIconPress={this.onIconPress}
          onChangeText={text => this.setState({ value: text })}
          textContentType={'password'}
          clearButtonMode={"while-editing"}
        />
      </Layout>
    );
  }
}
