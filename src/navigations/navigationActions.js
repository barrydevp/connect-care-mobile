import { NavigationActions } from "react-navigation";

const navigateAuthActions = params =>
  NavigationActions.navigate({
    routeName: "Auth",
    params: params,
    action: NavigationActions.navigate({ routeName: "Auth/Login" })
  });

const navigateChoosePlaceActions = params =>
  NavigationActions.navigate({
    routeName: "Auth",
    params: params,
    action: NavigationActions.navigate({ routeName: "Auth/ChoosePlace" })
  });

const navigateDashboardActions = params =>
  NavigationActions.navigate({
    routeName: "Dashboard",
    params: params
    // action: NavigationActions.navigate({ routeName: "Auth/ChoosePlace" })
  });

const navigateSettingsUpdateProfileActions = params =>
  NavigationActions.navigate({
    routeName: "Dashboard/Settings",
    params: params,
    action: NavigationActions.navigate({
      routeName: "Dashboard/Settings/UpdateProfile"
    })
  });

export {
  navigateAuthActions,
  navigateChoosePlaceActions,
  navigateDashboardActions,
  navigateSettingsUpdateProfileActions
};
