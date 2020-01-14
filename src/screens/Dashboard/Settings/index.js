import React from "react";
import { connect } from "react-redux";
import { Icon, Button, Layout, Avatar, Text } from "@ui-kitten/components";

import withAuth from "~/wrapcomponents/withAuth";
import styles from "./styles";

const getIcon = name => style => <Icon {...style} name={name} />;

@connect(({ auth }) => ({ auth }))
// @withAuth
export default class Settings extends React.Component {
  onPressLogout = () => {
    const { dispatch, navigation } = this.props;
    // console.log(dispatch);
    dispatch({ type: "auth/logout", payload: { navigation } });
  };

  render() {
    const { auth } = this.props;
    // console.log(auth);
    const { currentUser } = auth || {};
    const { fullname, username, address, email, mobile } = currentUser || {};

    return (
      <Layout style={styles.container}>
        <Layout style={styles.headerContainer}>
          <Layout style={styles.avatar}>
            <Avatar
              size="giant"
              source={{
                uri:
                  "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/brand-logo.a78e4b51.png"
              }}
            />
            <Text style={styles.headerTextFullName}>{fullname}</Text>
          </Layout>
          <Layout style={styles.headerDesContainer}>
            <Text style={styles.text}>
              <Text style={styles.headerText}>Username: </Text>
              {username}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.headerText}>Mobile: </Text>
              {mobile}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.headerText}>Email: </Text>
              {email}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.headerText}>Address: </Text>
              {address}
            </Text>
          </Layout>
          <Button
            style={styles.button}
            icon={getIcon("log-out")}
            appearance="ghost"
            onPress={this.onPressLogout}
          >
            Logout
          </Button>
        </Layout>
        <Layout style={styles.bodyContainer}>
          <Layout style={styles.groupButton}>
            <Button icon={getIcon("edit-2-outline")} appearance="ghost">
              Update Profile
            </Button>
            <Button icon={getIcon("unlock-outline")} appearance="ghost">
              Change Password
            </Button>
            <Button icon={getIcon("alert-circle-outline")} appearance="ghost">
              Report Issue
            </Button>
          </Layout>
          {/* <Layout style={styles.footerBodyContainer}>
            <Button style={styles.button} icon={getIcon("log-out")} appearance="ghost">
              Logout
            </Button>
          </Layout> */}
        </Layout>
      </Layout>
    );
  }
}
