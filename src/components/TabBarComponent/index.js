import React from "react";
import { SafeAreaView } from "react-navigation";
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Icon,
  Text
} from "@ui-kitten/components";

import { is } from "~/utils";

import styles from "./styles";

const getIcon = name => {
  return style => <Icon {...style} name={name} />;
};

export default TabBarComponent = ({ navigation }) => {
  const routes = navigation.state.routes;
  // console.log(navigation.state);
  const onSelect = index => {
    const selectedTabRoute = navigation.state.routes[index];
    navigation.navigate(selectedTabRoute.routeName);
  };

  return (
    <SafeAreaView>
      <BottomNavigation
        selectedIndex={navigation.state.index}
        onSelect={onSelect}
      >
        {routes.map(e => {
          const { index, params, routes } = e;
          const { icon, title } =
            params || (routes && routes[0] && routes[0].params) || {};
          return (
            <BottomNavigationTab
              style={styles.bottomNavigationTab}
              key={e.key}
              title={title || e.routeName}
              icon={getIcon(icon || "person-outline")}
            />
          );
        })}
      </BottomNavigation>
    </SafeAreaView>
  );
};
