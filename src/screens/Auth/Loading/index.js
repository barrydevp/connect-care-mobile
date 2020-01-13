import React from "react";
// import moment from "moment";
import { connect } from "react-redux";
// import { ActivityIndicat, StatusBar, View } from "react-native";

import { Spinner, Layout } from "@ui-kitten/components";

import styles from "./styles";

@connect(({ login, loginv1 }) => ({ login, loginv1 }))
class Loading extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
    // this.props.dispatch({
    //   type: "login/logout",
    //   payload: { status: true }
    // });
    // this.props.dispatch({
    //   type: "login/put_token",
    //   payload: { token: "test", expiresAt: moment().subtract(10, "days") }
    // });
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const {
      login: { "x-auth-key": token, status },
      navigation
    } = this.props;

    console.log(this.props.login);

    if (!status) {
      token && dispatch({ type: "login/logout" });
      navigation.navigate("Auth");

      return;
    }

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigation.navigate(token && status ? "Dashboard" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    // console.log("loging: ", this.props.login);
    // console.log("logingv1: ", this.props.loginv1);
    return (
      <Layout style={styles.container}>
        <Spinner />
      </Layout>
    );
  }
}

export default Loading;

// module.exports = Loading
