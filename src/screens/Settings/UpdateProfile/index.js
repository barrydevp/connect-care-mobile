import React from "react";
// import moment from "moment";
import { connect } from "react-redux";
// import { ActivityIndicat, StatusBar, View } from "react-native";
import { NavigationActions } from "react-navigation";

import { Input, Layout } from "@ui-kitten/components";

import styles from "./styles";

const UpdateProfile = (props) => {
  const { auth } = props;
  const { currentUser } = auth || {};
  const { fullname, username, address, email, mobile } = currentUser || {};

  const [vlFullname, setVlFullname] = React.useState(fullname);
  const [vlUsername, setVlUsername] = React.useState(username);
  const [vlAddress, setVlAddress] = React.useState(address);
  const [vlEmail, setVlEmail] = React.useState(email);
  const [vlMobile, setVlMobile] = React.useState(mobile);

  return (
    <Layout>
      <Input
        label="Fullname"
        value={vlFullname}
        onChangeText={setVlFullname}
      />
      <Input
        label="Username"
        value={vlUsername}
        onChangeText={setVlUsername}
      />
      <Input
        label="Address"
        value={vlAddress}
        onChangeText={setVlAddress}
      />
      <Input
        label="Email"
        value={vlEmail}
        onChangeText={setVlEmail}
      />
      <Input
        label="Mobile"
        value={vlMobile}
        onChangeText={setVlMobile}
      />
    </Layout>
  );
};

export default connect(({ auth }) => ({ auth }))(UpdateProfile);

// module.exports = Loading
