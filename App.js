import React from "react";
// import { StyleSheet, Text, View } from 'react-native';
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { mapping, light as theme } from "@eva-design/eva";
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import AppContainer from "./src/navigations/AppNavigation";

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <AppContainer />
      </ApplicationProvider>
    </>
  );
}
