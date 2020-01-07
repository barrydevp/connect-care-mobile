import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';

import { Spinner, Layout } from '@ui-kitten/components';

import styles from "./styles";

export default class extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }
  
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem('x-auth-key');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(token ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <Layout style={styles.container}>
        <Spinner />
      </Layout>
    );
  }
}