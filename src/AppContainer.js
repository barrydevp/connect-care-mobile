import React from "react";
import { IntlProvider } from "react-intl";

// import '~/utils/env';
// import { StyleSheet, Text, View } from 'react-native';

import AppNavigation from "~/navigations/AppNavigation";

export default function AppContainer() {
  return (
    <IntlProvider locale="vi">
      <AppNavigation />
    </IntlProvider>
  );
}
