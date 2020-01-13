import React from "react";
import { SafeAreaView } from "react-navigation";
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Icon,
  Text
} from "@ui-kitten/components";

const getIcon = name => {
  return style => <Icon {...style} name={name} />;
};

export default TabBarComponent = ({ navigation }) => {
  const routes = navigation.state.routes;

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
        {routes.map(e => (
          <BottomNavigationTab
            key={e.key}
            title={e.routeName}
            icon={getIcon((e.params && e.params.icon) || "person-outline")}
          />
        ))}
      </BottomNavigation>
    </SafeAreaView>
  );
};
