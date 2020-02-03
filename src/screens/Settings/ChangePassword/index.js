import React from "react";
// import moment from "moment";
import { connect } from "react-redux";
import { ActivityIndicat, StatusBar, View, ScrollView } from "react-native";
import { NavigationActions } from "react-navigation";

import { Input, Layout, Icon, Button } from "@ui-kitten/components";

import { helper } from "~/utils";
import styles from "./styles";
import { undef } from "~/utils/is";

const saveIcon = style => <Icon {...style} name="save-outline" />;

const ChangePassword = props => {
  const { auth, dispatch } = props;
  const { currentUser } = auth || {};

  const [vlOldPassword, setVlOldPassword] = React.useState(undefined);
  const [
    secureTextEntryOldPassword,
    setSecureTextEntryOldPassword
  ] = React.useState(true);
  const [vlNewPassword, setVlNewPassword] = React.useState(undefined);
  const [
    secureTextEntryNewPassword,
    setSecureTextEntryNewPassword
  ] = React.useState(true);
  const [vlConfirmPassword, setVlConfirmPassword] = React.useState(undefined);
  const [
    secureTextEntryConfirmPassword,
    setSecureTextEntryConfirmPassword
  ] = React.useState(true);

  const {
    caption: captionOldPassword,
    status: statusOldPassword,
    isValidate: isValidateOldPassword
  } = helper.getCaptionAndStatusOfInput("isPassword", vlOldPassword)(
    { success: "", error: "Mật khẩu có độ dài từ 6-100 kí tự." },
    { success: "", error: "danger" }
  );
  const {
    caption: captionNewPassword,
    status: statusNewPassword,
    isValidate: isValidateNewPassword
  } = helper.getCaptionAndStatusOfInput("isPassword", vlNewPassword)(
    { success: "", error: "Mật khẩu có độ dài từ 6-100 kí tự." },
    { success: "", error: "danger" }
  );
  const {
    caption: captionConfirmPassword,
    status: statusConfirmPassword,
    isValidate: isValidateConfirmPassword
  } = helper.getCaptionAndStatusOfInput(
    vlConfirmPassword === vlNewPassword,
    vlConfirmPassword
  )(
    { success: "", error: "Mật khẩu xác nhận bạn nhập không khớp!" },
    { success: "", error: "danger" }
  );

  const onSubmit = () => {
    const body = {
      OldPassWord: vlOldPassword,
      NewPassWord: vlConfirmPassword
    };
    dispatch({
      type: "auth/changePassword",
      payload: {
        body,
        callback: () => {
          setVlOldPassword(undefined);
          setVlNewPassword(undefined);
          setVlConfirmPassword(undefined);
        }
      }
    });
  };

  const renderIcon = secureTextEntry => style => {
    return <Icon {...style} name={secureTextEntry ? "eye-off" : "eye"} />;
  };

  // console.log(
  //   isValidateOldPassword,
  //   isValidateNewPassword,
  //   isValidateConfirmPassword
  // );

  return (
    <Layout style={styles.container}>
      <Input
        label="Mật khẩu cũ:"
        value={vlOldPassword || ""}
        placeholder="Mật khẩu cũ"
        icon={renderIcon(secureTextEntryOldPassword)}
        secureTextEntry={secureTextEntryOldPassword}
        onIconPress={() => setSecureTextEntryOldPassword(vl => !vl)}
        onChangeText={setVlOldPassword}
        textContentType={"password"}
        clearButtonMode={"while-editing"}
        status={statusOldPassword}
        caption={captionOldPassword}
      />
      <Input
        label="Mật khẩu mới:"
        value={vlNewPassword || ""}
        placeholder="Mật khẩu mới"
        icon={renderIcon(secureTextEntryNewPassword)}
        secureTextEntry={secureTextEntryNewPassword}
        onIconPress={() => setSecureTextEntryNewPassword(vl => !vl)}
        onChangeText={setVlNewPassword}
        textContentType={"password"}
        clearButtonMode={"while-editing"}
        status={statusNewPassword}
        caption={captionNewPassword}
      />
      <Input
        label="Nhập lại mật khẩu:"
        value={vlConfirmPassword || ""}
        placeholder="Nhập lại mật khẩu"
        icon={renderIcon(secureTextEntryConfirmPassword)}
        secureTextEntry={secureTextEntryConfirmPassword}
        onIconPress={() => setSecureTextEntryConfirmPassword(vl => !vl)}
        onChangeText={setVlConfirmPassword}
        textContentType={"password"}
        clearButtonMode={"while-editing"}
        status={statusConfirmPassword}
        caption={captionConfirmPassword}
      />
      <Button
        style={styles.button}
        size={"large"}
        appearance="ghost"
        icon={saveIcon}
        disabled={
          !(
            isValidateConfirmPassword &&
            isValidateNewPassword &&
            isValidateOldPassword &&
            vlNewPassword !== "" &&
            vlOldPassword !== "" &&
            vlConfirmPassword !== ""
          )
        }
        onPress={onSubmit}
      >
        Save
      </Button>
    </Layout>
  );
};

export default connect(({ auth }) => ({ auth }))(ChangePassword);

// module.exports = Loading
