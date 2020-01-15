import React/* , { useEffect } */ from "react";
// import moment from "moment";
import { connect } from "react-redux";
// import { ActivityIndicat, StatusBar, View } from "react-native";
// import { NavigationActions } from "react-navigation";

import { Spinner, Layout } from "@ui-kitten/components";
import {
  navigateAuthActions,
  navigateChoosePlaceActions,
  navigateDashboardActions
} from "~/navigations/navigationActions";

import styles from "./styles";

// function Loading(props) {
//   const { auth, dispatch, navigation } = props;
//   // console.log("auth");
//   // const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // console.log(auth);
//     const { "x-auth-key": token, status, placesId } = auth || {};

//     if (token && status) {
//       if (placesId) {
//         navigation.dispatch(navigateDashboardActions());
//         // setLoading(false);
//         return;
//       }

//       navigation.dispatch(navigateChoosePlaceActions());
//       return;
//     }

//     // setLoading(false);
//     dispatch({ type: "auth/logout" });
//     navigation.dispatch(navigateAuthActions());
//   }, [auth]);

//   return (
//     <Layout style={styles.container}>
//       <Spinner />
//     </Layout>
//   );
// }

// export default connect(({ auth }) => ({ auth }))(Loading);

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
      navigation,
      dispatch
    } = this.props;

    // console.log(this.props.auth)

    // navigation.dispatch(navigateChoosePlaceActions());
    //   return;

    // if (!status) {
    //   dispatch({ type: "auth/logout", payload: { navigation } })
    //   // token && dispatch({ type: "auth/logout" });
    //   // navigation.dispatch(navigateAuthActions());

    //   return;
    // }

    if (token && status) {
      if (placesId) {
        navigation.dispatch(navigateDashboardActions());
        return;
      }

      navigation.dispatch(navigateChoosePlaceActions());
      return;
    }

    dispatch({ type: "auth/logout", payload: { navigation } })

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
    // navigation.navigate(
    //   (token && status && ((placesId && "Dashboard") || "Auth/ChoosePlace")) ||
    //     "Auth/Login"
    // );
  };

  // Render any loading content that you like here
  render() {
    // console.log("logingv1: ", this.props.auth);
    return (
      <Layout style={styles.container}>
        <Spinner />
      </Layout>
    );
  }
}

export default Loading;

// module.exports = Loading
