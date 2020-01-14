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

export {
  navigateAuthActions,
  navigateChoosePlaceActions,
  navigateDashboardActions
};
