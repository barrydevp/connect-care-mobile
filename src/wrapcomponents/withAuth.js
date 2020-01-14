import React, { useEffect, useState } from "react";
// import moment from "moment";
import { StyleSheet } from "react-native";
// import { ActivityIndicat, StatusBar, View } from "react-native";

import { Spinner, Layout } from "@ui-kitten/components";

import {
  navigateAuthActions,
  navigateChoosePlaceActions,
  navigateDashboardActions
} from "~/navigations/navigationActions";
import { is } from "~/utils";

export default Component => {
  return function(props) {
    const { auth, dispatch, navigation } = props;
    // console.log("auth");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // console.log(auth);
      const { "x-auth-key": token, status, placesId } = auth || {};

      if (token && status) {
        if (placesId) {
          // navigation.dispatch(navigateDashboardActions());
          setLoading(false);
          return;
        }

        navigation.dispatch(navigateChoosePlaceActions());
        return;
      }

      setLoading(false);
      dispatch({ type: "auth/logout" });
      navigation.dispatch(navigateAuthActions());
    }, [auth]);

    // return (
    //   <Layout style={styles.container}>
    //     <Spinner />
    //   </Layout>
    // );
    return loading ? (
      <Layout style={styles.container}>
        <Spinner />
      </Layout>
    ) : (
      <Component {...props} />
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
