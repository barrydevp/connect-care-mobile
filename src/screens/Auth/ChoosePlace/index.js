import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Image, Text as RNText, Alert } from "react-native";
import { Layout, List, Spinner } from "@ui-kitten/components";
import PlaceInfoCard from "~/components/PlaceInfoCard";

import { is } from "~/utils";
import styles from "./styles";
import {
  navigateAuthActions,
  navigateDashboardActions
} from "~/navigations/navigationActions";

// @connect(({ auth }) => ({ auth }))
// class ChoosePlace extends React.Component {
//   static navigationOptions = ({ navigation }) => {
//     return {
//       title: `ChoosePlace`,
//     }
//   };

//   componentDidMount() {
//     const { dispatch, auth, navigation } = this.props;

//     if(!is.undef(auth.placesId)) {
//       navigation.navigate({
//         routeName: "Dashboard",
//         params: {}
//       })

//       return;
//     }

//     dispatch({
//       type: "auth/fetchCurrentUserWithToken",
//       payload: { token: auth["x-auth-key"] }
//     });
//   }

//   componentDidUpdate() {
//     const { auth, navigation } = this.props;

//     if(!is.undef(auth.placesId)) {
//       navigation.navigate({
//         routeName: "Dashboard",
//         params: {}
//       })

//       return;
//     }
//   }

//   render() {
//     const { navigation, auth, dispatch } = this.props;
//     const { currentUser } = auth || {};
//     const { places } = currentUser || {};

//     const data = places || [];

//     const renderItem = ({ item, index }) => (
//       <PlaceInfoCard
//         place={item}
//         dispatch={dispatch}
//         navigation={navigation}
//         index={index}
//       />
//     );

//     return data.length === 0 ? (
//       <Layout style={styles.container}>
//         <Spinner />
//       </Layout>
//     ) : (
//       <List data={data} renderItem={renderItem} />
//     );
//   }
// }

function ChoosePlace(props) {
  const [loading, setLoading] = useState(true);

  const { navigation, auth, dispatch } = props;
  const { currentUser, placesId } = auth || {};
  const { places } = currentUser || {};
  const data = places || [];

  // console.log(auth);

  const onSucces = payload => {
    setLoading(false);
    // dispatch({ type: "auth/put_token", payload: { token: "test" } });
  };

  const onError = error => {
    console.log(error);
    navigation.dispatch(navigateAuthActions());
  };

  useEffect(() => {
    if (!is.undef(placesId)) {
      // navigation.navigate({
      //   routeName: "Dashboard",
      //   params: {}
      // });
      navigation.dispatch(navigateDashboardActions());

      return;
    }

    dispatch({
      type: "auth/fetchCurrentUserWithToken",
      payload: { token: auth["x-auth-key"], onSucces, onError }
    });
  }, [loading, placesId]);

  const renderItem = ({ item, index }) => (
    <PlaceInfoCard
      place={item}
      dispatch={dispatch}
      navigation={navigation}
      index={index}
    />
  );

  return loading ? (
    <Layout style={styles.container}>
      <Spinner />
    </Layout>
  ) : (
    <List data={data} renderItem={renderItem} />
  );
}

export default connect(({ auth }) => ({ auth }))(ChoosePlace);
// export default ChoosePlace;

// module.exports = Login;
