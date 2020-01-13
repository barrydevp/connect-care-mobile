import React from "react";
import { SafeAreaView } from "react-navigation";
import { Drawer } from "@ui-kitten/components";

export default DrawerComponent = ({ navigation }) => {
  const routes = navigation.state.routes;

  const onSelect = index => {
    const selectedTabRoute = navigation.state.routes[index];
    navigation.navigate(selectedTabRoute.routeName);
  };

  return (
    <SafeAreaView>
      <Drawer
        data={routes.map(e => ({
          title: e.routeName
        }))}
        onSelect={onSelect}
      />
    </SafeAreaView>
  );
};
