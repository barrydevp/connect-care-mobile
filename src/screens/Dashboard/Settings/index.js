import React from "react";
import { connect } from "react-redux";
import { Icon, Button, Layout, Avatar, Text } from "@ui-kitten/components";

import styles from "./styles";

const StarIcon = style => <Icon {...style} name="star" />;

const settings = [
  { title: "Item 1", icon: StarIcon },
  { title: "Item 2", icon: StarIcon },
  { title: "Item 3", icon: StarIcon }
];

@connect(({ auth }) => ({ auth }))
export default class Settings extends React.Component {
  render() {
    const { auth } = this.props;
    const { currentUser } = auth || {};
    const { fullname, address, email } = currentUser;

    return (
      <Layout style={styles.container}>
        <Layout style={styles.headerContainer}>
          <Avatar
            style={styles.avatar}
            size="giant"
            source={{
              uri:
                "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/brand-logo.a78e4b51.png"
            }}
          />
          <Text style={styles.headerTextFullName}>{fullname}</Text>
          <Text>{email}</Text>
          <Text>{address}</Text>
        </Layout>
        <Layout style={styles.bodyContainer}>
          <Layout style={styles.groupButton}>
            <Button
              style={styles.buttonInGroup}
              icon={StarIcon}
              appearance="ghost"
            >
              Update Profile
            </Button>
            <Button
              style={styles.buttonInGroup}
              icon={StarIcon}
              appearance="ghost"
            >
              Reset Password
            </Button>
          </Layout>
          <Button style={styles.button} icon={StarIcon} appearance="ghost">
            Logout
          </Button>
        </Layout>
      </Layout>
    );
  }
}
