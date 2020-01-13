import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import * as is from "./is";
import _ from "lodash";

export default (navigators, screens, options) => {
  return createAppContainer(createParentNavigation(navigators));

  function createParentNavigation(parent) {
    const {
      navigationType: type,
      routes,
      navigatorConfig: NavigatorConfig
    } = parent;

    const RouteConfigs = routes.reduce((previous, child) => {
      return Object.assign(previous, {
        [child.routeName]: createChildNavigation(child)
      });
    }, {});

    if (is.object(RouteConfigs) && !_.isEmpty(RouteConfigs)) {
      if (type === "switch") {
        return createSwitchNavigator(RouteConfigs, NavigatorConfig || {});
      } else {
        if (type === "stack") {
          return createStackNavigator(RouteConfigs, NavigatorConfig || {});
        } else {
          if (type === "bottomtab") {
            return createBottomTabNavigator(
              RouteConfigs,
              NavigatorConfig || {}
            );
          } else {
            if (type === "drawer") {
              return createDrawerNavigator(RouteConfigs, NavigatorConfig || {});
            }
          }
        }
      }
    }

    return {};
  }

  function createChildNavigation(child) {
    const { screen, navigationType: type, routes, navigationOptions } = child;

    if (is.string(type) && is.array(routes))
      return createParentNavigation(child);

    return {
      screen: getScreen(screen),

      // The action and route params are extracted from the path.
      // action: {},
      // params: {},

      // Optional: Override the `navigationOptions` for the screen
      navigationOptions
    };
  }

  function getScreen(path) {
    const paths = path.split("/").filter(e => e !== "");

    return paths.reduce((previous, name) => previous[name], screens);
  }
};
