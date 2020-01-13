import React from "react";
import {
  Icon,
  TopNavigation,
  TopNavigationAction
} from "@ui-kitten/components";

import styles from "./styles";

const BackIcon = style => <Icon {...style} name="arrow-back" />;

export default TopBarComponent = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.routeName;

  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => {
        navigation.goBack();
      }}
    />
  );

  return (
    <TopNavigation
      alignment="center"
      style={styles.container}
      titleStyle={styles.titleStyle}
      leftControl={previous && BackAction()}
      title={title}
    />
  );
};
