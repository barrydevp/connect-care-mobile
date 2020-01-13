import React from "react";
import { connect } from "react-redux";
import { Image, Text as RNText, Alert } from "react-native";
import {
  Button,
  Layout,
  Popover,
  Text,
  Icon,
  List,
  Spinner,
  ListItem
} from "@ui-kitten/components";
import PlaceInfoCard from "~/components/PlaceInfoCard";

import { is } from "~/utils";
import styles from "./styles";

@connect(({ auth }) => ({ auth }))
class ChoosePlace extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `ChoosePlace`,
    }
  };

  componentDidMount() {
    const { dispatch, auth, navigation } = this.props;

    if(!is.undef(auth.placesId)) {
      navigation.navigate({
        routeName: "Dashboard",
        params: {}
      })

      return;
    }
    
    dispatch({
      type: "auth/fetchCurrentUserWithToken",
      payload: { token: auth["x-auth-key"] }
    });
  }

  componentDidUpdate() {
    const { auth, navigation } = this.props;

    if(!is.undef(auth.placesId)) {
      navigation.navigate({
        routeName: "Dashboard",
        params: {}
      })

      return;
    }
  }

  render() {
    const { navigation, auth, dispatch } = this.props;
    const { currentUser } = auth || {};
    const { places } = currentUser || {};

    const data = places || [];

    const renderItem = ({ item, index }) => (
      <PlaceInfoCard
        place={item}
        dispatch={dispatch}
        navigation={navigation}
        index={index}
      />
    );

    return data.length === 0 ? (
      <Layout style={styles.container}>
        <Spinner />
      </Layout>
    ) : (
      <List data={data} renderItem={renderItem} />
    );
  }
}

export default ChoosePlace;

// module.exports = Login;
