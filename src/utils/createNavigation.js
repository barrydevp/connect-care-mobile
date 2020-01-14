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
      routeConfigs,
      navigatorConfig: NavigatorConfig
    } = parent;

    const RouteConfigs = routeConfigs.reduce((previous, child) => {
      const childRoute = createChildNavigation(child);
      if (!childRoute) return previous;
      return Object.assign(previous, {
        [child.routeName]: childRoute
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
    const { routeConfigs, navigationType: type, screen } = child;

    if (is.string(type) && is.array(routeConfigs))
      return createParentNavigation(child);

    const screenComponent = getScreen(screen);

    if (!screen) return;

    return {
      ..._.omit(child, ["navigationType", "routeConfigs", "navigatorConfig"]),
      screen: screenComponent

      // The action and route params are extracted from the path.
      // action: {},
      // params: {},

      // Optional: Override the `navigationOptions` for the screen
      // navigationOptions
    };
  }

  function getScreen(path) {
    const paths = path.split("/").filter(e => e !== "");

    return paths.reduce((previous, name) => previous[name], screens);
  }
};
