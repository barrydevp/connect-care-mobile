import React from "react";
// import moment from "moment";
import { connect } from "react-redux";
import { ActivityIndicat, StatusBar, View, ScrollView } from "react-native";
import { NavigationActions } from "react-navigation";

import { Input, Layout, Icon, Button } from "@ui-kitten/components";

import { helper } from "~/utils";
import styles from "./styles";

const refreshIcon = style => <Icon {...style} name="refresh-outline" />;
const saveIcon = style => <Icon {...style} name="save-outline" />;

const UpdateProfile = props => {
  const { auth, dispatch } = props;
  const { currentUser } = auth || {};
  const { fullname, /* username, */ address, email, mobile } =
    currentUser || {};

  const [vlFullname, setVlFullname] = React.useState(fullname);
  // const [vlUsername, setVlUsername] = React.useState(username);
  const [vlAddress, setVlAddress] = React.useState(address);
  const [vlEmail, setVlEmail] = React.useState(email);
  const [vlMobile, setVlMobile] = React.useState(mobile);

  // const {
  //   caption: captionFullname,
  //   status: statusFullname,
  //   isValidate: isValidateFullname
  // } = helper.getCaptionAndStatusOfInput("isUsername", username)(
  //   {
  //     success: "",
  //     error: "Vui lòng nhập từ 6 đến 50 ký tự bao gồm chữ, số và _"
  //   },
  //   { success: "", error: "danger" }
  // );
  // const {
  //   caption: captionPassword,
  //   status: statusPassword,
  //   isValidate: isValidatePassword
  // } = helper.getCaptionAndStatusOfInput("isPassword", password)(
  //   { success: "", error: "Vui lòng nhập mật khẩu" },
  //   { success: "", error: "danger" }
  // );

  const onSubmit = () => {
    const body = {};
    vlFullname !== fullname && (body.fullname = vlFullname);
    vlMobile !== mobile && (body.mobile = vlMobile);
    vlEmail !== email && (body.email = vlEmail);
    vlAddress !== address && (body.address = vlAddress);
    // console.log(body);
    dispatch({ type: "auth/updateProfile", payload: { body } });
  };

  const {
    caption: captionEmail,
    status: statusEmail,
    isValidate: isValidateEmail
  } = helper.getCaptionAndStatusOfInput("isEmail", vlEmail)(
    { success: "", error: "Email có dạng: foo@bar.com" },
    { success: "", error: "danger" }
  );
  const {
    caption: captionMobile,
    status: statusMobile,
    isValidate: isValidateMobile
  } = helper.getCaptionAndStatusOfInput("isMobilePhone", vlMobile)(
    { success: "", error: "Số điện thoại có dạng: 0944703687" },
    { success: "", error: "danger" }
  );

  return (
    <Layout style={styles.container}>
      <Input
        label="Fullname"
        value={vlFullname}
        icon={refreshIcon}
        onIconPress={() => {
          setVlFullname(fullname);
        }}
        onChangeText={setVlFullname}
      />
      <Input
        label="Address"
        value={vlAddress}
        icon={refreshIcon}
        onIconPress={() => setVlAddress(address)}
        onChangeText={setVlAddress}
      />
      <Input
        label="Email"
        value={vlEmail}
        icon={refreshIcon}
        onIconPress={() => setVlEmail(email)}
        onChangeText={setVlEmail}
        caption={captionEmail}
        status={statusEmail}
      />
      <Input
        label="Mobile"
        value={vlMobile}
        icon={refreshIcon}
        onIconPress={() => setVlMobile(mobile)}
        onChangeText={setVlMobile}
        caption={captionMobile}
        status={statusMobile}
      />
      <Button
        style={styles.button}
        size={"large"}
        appearance="ghost"
        icon={saveIcon}
        disabled={
          !(
            isValidateMobile &&
            isValidateEmail &&
            (vlFullname !== fullname ||
              vlMobile !== mobile ||
              vlAddress !== address ||
              vlEmail !== email)
          )
        }
        onPress={onSubmit}
      >
        Save
      </Button>
    </Layout>
  );
};

export default connect(({ auth }) => ({ auth }))(UpdateProfile);

// module.exports = Loading
