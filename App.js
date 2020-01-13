import React from "react";
// import '~/utils/env';
// import { StyleSheet, Text, View } from 'react-native';
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { mapping, light as theme } from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "~/store";

import AppContainer from "~/AppContainer";
import LoadingStoreScreen from "~/screens/LoadingStoreScreen";

import { enableScreens } from 'react-native-screens';
enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<LoadingStoreScreen />}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={theme}>
          <AppContainer />
        </ApplicationProvider>
      </PersistGate>
    </Provider>
  );
}
