import React from "react";
// import { connect } from "react-redux";

import { createNavigation } from "~/utils";
import navigators from "./navigator.config";
import screens from "~/screens";

// console.disableYellowBox = true;
// @connect(({ auth }) => ({ auth }))
export default class AppNavigation extends React.Component {
  render() {
    const AppContainer = createNavigation(navigators, screens);

    return <AppContainer />;
  }
}

// export default AppContainer = createAppContainer(
//   createSwitchNavigator(
//     {
//       // LoggedSwitch: createSwitchNavigator({

//       //   // When user is authenticated
//       //   LoggedIn: createStackNavigator({

//       //     // The logged in root is generally a tab or drawer navigator
//       //     LoggedInRoot: createTabsOrDrawer({
//       //       Home,
//       //       Feed,
//       //       Notifications,
//       //       Settings,
//       //     }),

//       //     // Main order process
//       //     Order: createOrderNavigator(),

//       //     // Some authenticated stack screens...
//       //     Orders,
//       //     Profile,
//       //     EditProfile,
//       //   }),

//       //   // When user is not authenticated
//       //   LoggedOut: createStack({
//       //     LoggedOutRoot,
//       //     Signup,
//       //     ForgotPassword,
//       //   }),
//       // }),

//       // Stack screens that can be shared between LoggedIn and LoggedOut part
//       // those screens should not expect an authenticated user in context
//       // TermsOfService,
//       // GameRules,
//       // AppInfos,
//       // RGPD,
//       // Contacts,
//       AuthLoading: AuthLoadingScreen,
//       Auth: AuthScreen,
//       App: createDrawerNavigator(
//         {
//           MainDrawer: createStackNavigator(
//             {
//               TestAuth: AuthScreen
//               // Categories: CategoriesScreen,
//               // Recipe: RecipeScreen,
//               // RecipesList: RecipesListScreen,
//               // Ingredient: IngredientScreen,
//               // Search: SearchScreen,
//               // IngredientsDetails: IngredientsDetailsScreen
//             },
//             {
//               initialRouteName: "TestAuth",
//               // headerMode: 'float',
//               defaulfNavigationOptions: ({ navigation }) => ({
//                 headerTitleStyle: {
//                   fontWeight: "bold",
//                   textAlign: "center",
//                   alignSelf: "center",
//                   flex: 1
//                 }
//               })
//             }
//           )
//         },
//         {
//           drawerPosition: "left",
//           initialRouteName: "MainDrawer",
//           drawerWidth: 250,
//           contentComponent: DrawerContainer
//         }
//       )
//     },
//     {
//       initialRouteName: "AuthLoading",
//       headerMode: "none"
//     }
//   )
// );

// // The order workflow is stateful, and it's a generally a bunch of multiple stack screens
// // you don't necessarily need a global state like Redux to handle this,
// // just creating a custom navigator with context and you are fine
// // see https://reactnavigation.org/docs/en/custom-navigators.html
// // note you may want to preserve the basket if user exit the workflow,
// // in which case order state should probably be higher or global
// const createOrderNavigator = () => {
//   const OrderStackNavigator = createStack({
//     OrderProductList,
//     OrderBasket,
//     OrderPaymentDetails,
//     OrderStrongPaymentAuthentication,
//     OrderSummary,
//   });

//   // This is how you create a custom navigator
//   // Here it gives us the ability to wrap a navigator in a custom state provider
//   // It's your responsability to choose how to implement ProvideOrderState
//   const OrderNavigator = ({ navigation }) => (
//     <ProvideOrderState>
//       <OrderStackNavigator navigation={navigation} />
//     </ProvideOrderState>
//   );
//   OrderNavigator.router = OrderStackNavigator.router;

//   return OrderNavigator;
// };
