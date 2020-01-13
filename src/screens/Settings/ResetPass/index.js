import React from "react";
// import moment from "moment";
import { connect } from "react-redux";
// import { ActivityIndicat, StatusBar, View } from "react-native";
import { NavigationActions } from "react-navigation";

import { Spinner, Layout } from "@ui-kitten/components";

import styles from "./styles";

@connect(({ auth }) => ({ auth }))
class Loading extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
    // this.props.dispatch({ type: "login/logout" });
    // this.props.dispatch({ type: "auth/logout" });
    // this.props.dispatch({
    //   type: "login/put_token",
    //   payload: { token: "test", expiresAt: moment().subtract(10, "days") }
    // });
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const {
      auth: { "x-auth-key": token, status, placesId },
      navigation
    } = this.props;

    if (!status) {
      token && dispatch({ type: "auth/logout" });
      navigation.navigate("Auth");

      return;
    }

    // const navigateAction = NavigationActions.navigate({
    //   routeName: "Auth",
    //   // navigate can have a nested navigate action that will be run inside the child router
    //   action: NavigationActions.navigate({
    //     routeName: "Auth/ChoosePlace",
    //     action: NavigationActions.navigate({
    //       routeName: "Dashboard",
    //       action: NavigationActions.navigate({
    //         routeName: "Dashboard/Settings"
    //       })
    //     })
    //   })
    // });

    // navigation.dispatch(navigateAction);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigation.navigate(
      (token && status && ((placesId && "Dashboard") || "Auth/ChoosePlace")) ||
        "Auth/Login"
    );
  };

  // Render any loading content that you like here
  render() {
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
