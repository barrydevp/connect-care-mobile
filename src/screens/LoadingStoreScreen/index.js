import React from "react";
import { Image as ImageRN } from "react-native";

import styles from "./styles";

export default class extends React.Component {
  // Render any loading content that you like here
  render() {
    return (
      <ImageRN
        style={styles.logo}
        source={require("~/assets/logoNBM.png")}
        // resizeMode="stretch"
      />
    );
  }
}
